import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";

const packageRoot = resolve(".");
const sourceConsumer = join(packageRoot, "apps", "consumer");
const temp = await mkdtemp(join(tmpdir(), "brick-app-consumer-"));
const consumer = join(temp, "consumer");
const cache = join(temp, "npm-cache");
const tarballArgument = process.argv.indexOf("--tarball");
const suppliedTarball = tarballArgument === -1
  ? undefined
  : process.argv[tarballArgument + 1];
const atomArgument = process.argv.indexOf("--atom-tarball");
const atomTarball = atomArgument === -1 ? process.env.FLOWSTACK_ATOM_TARBALL : process.argv[atomArgument + 1];
const commandTimeoutMs = 300_000;
const atomShaArgument = process.argv.indexOf("--atom-sha256");
const expectedAtomSha = atomShaArgument === -1 ? process.env.FLOWSTACK_ATOM_SHA256 : process.argv[atomShaArgument + 1];

if (tarballArgument !== -1 && !suppliedTarball) {
  throw new Error("--tarball requires an archive path");
}
if (atomArgument !== -1 && !atomTarball) throw new Error("--atom-tarball requires an archive path");
if (atomShaArgument !== -1 && !expectedAtomSha) throw new Error("--atom-sha256 requires an expected archive digest");
if (expectedAtomSha && !atomTarball) throw new Error("An Atom archive digest requires an Atom archive");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: cache },
    timeout: commandTimeoutMs,
  });
  if (result.error?.code === "ETIMEDOUT") {
    throw new Error(
      `${command} ${args[0] ?? ""} exceeded the ${commandTimeoutMs / 1_000}-second application-consumer timeout`,
    );
  }
  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status ?? 1}`,
    );
  }
  return result.stdout;
}

let verified = false;
try {
  let tarball;
  if (suppliedTarball) {
    tarball = resolve(suppliedTarball);
  } else {
    const packOutput = run(
      "npm",
      ["pack", "--json", "--pack-destination", temp],
      packageRoot,
    );
    const [{ filename }] = JSON.parse(packOutput);
    tarball = join(temp, basename(filename));
  }
  console.log(`Application Consumer Brick archive SHA-256: ${verifyArchiveDigest(await readFile(tarball))}`);

  await cp(sourceConsumer, consumer, {
    recursive: true,
    filter: (source) =>
      !["dist", "node_modules", "test-results"].includes(basename(source)),
  });

  const consumerPackagePath = join(consumer, "package.json");
  const consumerPackage = JSON.parse(
    await readFile(consumerPackagePath, "utf8"),
  );
  consumerPackage.dependencies["@flowstack-ui/brick"] = `file:${tarball}`;
  if (atomTarball) {
    const archive = resolve(atomTarball);
    console.log(`Application Consumer Atom archive SHA-256: ${verifyArchiveDigest(await readFile(archive), expectedAtomSha)}`);
    const atom = JSON.parse(run("tar", ["-xOf", archive, "package/package.json"], packageRoot));
    const brick = JSON.parse(run("tar", ["-xOf", tarball, "package/package.json"], packageRoot));
    if (atom.name !== "@flowstack-ui/atom" || atom.version !== brick.dependencies["@flowstack-ui/atom"]) {
      throw new Error("Atom candidate must match the packed Brick dependency exactly");
    }
    consumerPackage.dependencies["@flowstack-ui/atom"] = `file:${archive}`;
  }
  await writeFile(
    consumerPackagePath,
    `${JSON.stringify(consumerPackage, null, 2)}\n`,
  );

  run("npm", ["install", "--ignore-scripts"], consumer);
  run("npm", ["test"], consumer);
  verified = true;
  process.stdout.write("Verified the app Consumer against the packed Brick artifact.\n");
} finally {
  if (verified) await rm(temp, { recursive: true, force: true });
  else console.error(`Application Consumer failure evidence retained at ${temp}`);
}
