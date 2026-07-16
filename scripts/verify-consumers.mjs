import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const packageRoot = resolve(".");
const temp = await mkdtemp(join(tmpdir(), "brick-consumers-"));
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
    process.exit(result.status ?? 1);
  }
}

try {
  run("npm", ["pack", "--pack-destination", temp], packageRoot);
  const tarball = join(temp, "flowstack-ui-brick-0.1.0.tgz");

  for (const reactVersion of ["18.3.1", "19.2.3"]) {
    const consumer = join(temp, `react-${reactVersion.split(".")[0]}`);
    await import("node:fs/promises").then(({ mkdir }) => mkdir(consumer));
    await writeFile(
      join(consumer, "package.json"),
      JSON.stringify({ name: `brick-react-${reactVersion}`, private: true, type: "module" }, null, 2),
    );
    await writeFile(
      join(consumer, "verify.mjs"),
      `import * as Brick from "@flowstack-ui/brick";
import React from "react";
import { renderToString } from "react-dom/server";
import { readFile } from "node:fs/promises";

if (Object.keys(Brick).length !== 0) throw new Error("Unexpected pre-component export");
const markup = renderToString(React.createElement("main", null, "Brick consumer"));
if (!markup.includes("Brick consumer")) throw new Error("SSR smoke failed");
const css = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles.css", import.meta.url), "utf8");
if (!css.includes("--brick-color-accent-solid")) throw new Error("CSS export missing");
`,
    );
    await writeFile(
      join(consumer, "verify.ts"),
      `import * as Brick from "@flowstack-ui/brick";
const publicKeys: string[] = Object.keys(Brick);
void publicKeys;
`,
    );
    await writeFile(
      join(consumer, "tsconfig.json"),
      JSON.stringify(
        {
          compilerOptions: {
            module: "NodeNext",
            moduleResolution: "NodeNext",
            noEmit: true,
            strict: true,
            target: "ES2020",
          },
          include: ["verify.ts"],
        },
        null,
        2,
      ),
    );

    run(
      "npm",
      [
        "install",
        "--ignore-scripts",
        "--save-exact",
        tarball,
        "@flowstack-ui/atom@0.2.0",
        `react@${reactVersion}`,
        `react-dom@${reactVersion}`,
        "typescript@5.9.3",
      ],
      consumer,
    );
    run("node", ["verify.mjs"], consumer);
    run("npx", ["tsc", "-p", "tsconfig.json"], consumer);
    const installed = JSON.parse(await readFile(join(consumer, "package.json"), "utf8"));
    if (installed.dependencies.react !== reactVersion) {
      throw new Error(`React ${reactVersion} consumer resolved incorrectly`);
    }
    console.log(`Verified clean React ${reactVersion.split(".")[0]} consumer.`);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
