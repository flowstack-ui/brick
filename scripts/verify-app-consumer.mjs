import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const packageRoot = resolve(".");
const sourceConsumer = join(packageRoot, "apps", "consumer");
const temp = await mkdtemp(join(tmpdir(), "brick-app-consumer-"));
const consumer = join(temp, "consumer");
const cache = join(temp, "npm-cache");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: cache },
  });
  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(
      `${command} ${args.join(" ")} failed with exit code ${result.status ?? 1}`,
    );
  }
  return result.stdout;
}

try {
  const packOutput = run(
    "npm",
    ["pack", "--json", "--pack-destination", temp],
    packageRoot,
  );
  const [{ filename }] = JSON.parse(packOutput);
  const tarball = join(temp, basename(filename));

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
  await writeFile(
    consumerPackagePath,
    `${JSON.stringify(consumerPackage, null, 2)}\n`,
  );

  run("npm", ["install", "--ignore-scripts"], consumer);
  run("npm", ["test"], consumer);
  process.stdout.write("Verified the app Consumer against the packed Brick artifact.\n");
} finally {
  await rm(temp, { recursive: true, force: true });
}
