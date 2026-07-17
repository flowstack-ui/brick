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
    const reactMajor = reactVersion.split(".")[0];
    const consumer = join(temp, `react-${reactMajor}`);
    await import("node:fs/promises").then(({ mkdir }) => mkdir(consumer));
    await writeFile(
      join(consumer, "package.json"),
      JSON.stringify({ name: `brick-react-${reactVersion}`, private: true, type: "module" }, null, 2),
    );
    await writeFile(
      join(consumer, "verify.mjs"),
      `import { Button, Card } from "@flowstack-ui/brick";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import React from "react";
import { renderToString } from "react-dom/server";
import { readFile } from "node:fs/promises";

if (Button !== SubpathButton) throw new Error("Button subpath export mismatch");
if (Card !== SubpathCard) throw new Error("Card subpath export mismatch");
const markup = renderToString(React.createElement(Button, null, "Brick consumer"));
if (!markup.includes("brick-button") || !markup.includes("Brick consumer")) throw new Error("Button SSR smoke failed");
const cardMarkup = renderToString(React.createElement(Card.Root, { as: "article" }, React.createElement(Card.Title, { as: "h1" }, "Card consumer")));
if (!cardMarkup.includes("brick-card") || !cardMarkup.includes("Card consumer")) throw new Error("Card SSR smoke failed");
const css = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles.css", import.meta.url), "utf8");
if (!css.includes("--brick-color-accent-solid") || !css.includes(".brick-card")) throw new Error("CSS export missing");
`,
    );
    await writeFile(
      join(consumer, "verify.ts"),
      `import { Button, Card, type ButtonProps, type CardRootProps } from "@flowstack-ui/brick";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
const props: ButtonProps = { children: "Consumer" };
const cardProps: CardRootProps = { as: "article", children: "Consumer" };
void Button;
void SubpathButton;
void Card;
void SubpathCard;
void props;
void cardProps;
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
        "@flowstack-ui/atom@0.3.2",
        `react@${reactVersion}`,
        `react-dom@${reactVersion}`,
        `@types/react@${reactMajor}`,
        `@types/react-dom@${reactMajor}`,
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
    console.log(`Verified clean React ${reactMajor} consumer.`);
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}
