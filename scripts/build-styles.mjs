import { mkdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import browserslistModule from "browserslist";
import { browserslistToTargets, bundleAsync } from "lightningcss";
import { compileTokens } from "./token-compiler.mjs";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modeIndex = process.argv.indexOf("--mode");
const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : "production";
if (!new Set(["production", "development"]).has(mode)) {
  throw new Error(`Unknown CSS build mode: ${mode}`);
}

const production = mode === "production";
const cacheRoot = resolve(packageRoot, ".brick-cache", mode);
const outputRoot = production ? resolve(packageRoot, "dist") : cacheRoot;
const tokenSource = resolve(packageRoot, "src/styles/tokens.tokens.json");
const browserslist = typeof browserslistModule === "function"
  ? browserslistModule
  : browserslistModule.default;
const targets = browserslistToTargets(browserslist(undefined, { path: packageRoot }));

await rm(cacheRoot, { recursive: true, force: true });
await mkdir(cacheRoot, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const generatedTokens = resolve(cacheRoot, "tokens.source.css");
await writeFile(generatedTokens, await compileTokens(tokenSource));

const generatedStyles = resolve(cacheRoot, "styles.source.css");
await writeFile(
  generatedStyles,
  [
    '@import "../../src/styles/layers.css";',
    '@import "./tokens.source.css";',
    '@import "../../src/styles/foundations.css";',
    '@import "../../src/components/button/button.css";',
    '@import "../../src/components/icon-button/icon-button.css";',
    '@import "../../src/components/icon/icon.css";',
    '@import "../../src/components/image/image.css";',
    '@import "../../src/components/app-bar/app-bar.css";',
    '@import "../../src/components/card/card.css";',
    '@import "../../src/components/dialog/dialog.css";',
    '@import "../../src/components/alert-dialog/alert-dialog.css";',
    '@import "../../src/components/drawer/drawer.css";',
    '@import "../../src/components/badge/badge.css";',
    '@import "../../src/components/avatar/avatar.css";',
    '@import "../../src/components/toggle/toggle.css";',
    '@import "../../src/components/toggle-group/toggle-group.css";',
    '@import "../../src/styles/floating-arrow.css";',
    '@import "../../src/components/tooltip/tooltip.css";',
    '@import "../../src/components/hover-card/hover-card.css";',
    '@import "../../src/components/popover/popover.css";',
    '@import "../../src/components/form/form.css";',
    '@import "../../src/components/field/field.css";',
    '@import "../../src/components/fieldset/fieldset.css";',
    '@import "../../src/components/checkbox/checkbox.css";',
    '@import "../../src/components/checkbox-group/checkbox-group.css";',
    '@import "../../src/components/radio-group/radio-group.css";',
    '@import "../../src/components/switch/switch.css";',
    '@import "../../src/components/breadcrumb/breadcrumb.css";',
    '@import "../../src/components/tabs/tabs.css";',
    '@import "../../src/components/_action-menu/action-menu.css";',
    '@import "../../src/components/dropdown-menu/dropdown-menu.css";',
    '@import "../../src/components/context-menu/context-menu.css";',
    '@import "../../src/components/menubar/menubar.css";',
    '@import "../../src/components/navigation-menu/navigation-menu.css";',
    '@import "../../src/components/bottom-navigation/bottom-navigation.css";',
    '@import "../../src/components/visually-hidden/visually-hidden.css";',
    '@import "../../src/components/skeleton/skeleton.css";',
    '@import "../../src/components/progress/progress.css";',
    '@import "../../src/components/progress-circle/progress-circle.css";',
    '@import "../../src/components/toast/toast.css";',
    '@import "../../src/components/collapsible/collapsible.css";',
    '@import "../../src/components/accordion/accordion.css";',
    '@import "../../src/components/input/input.css";',
    '@import "../../src/components/textarea/textarea.css";',
    '@import "../../src/components/select/select.css";',
    '@import "../../src/components/multi-select/multi-select.css";',
    '@import "../../src/components/text/text.css";',
    '@import "../../src/components/link/link.css";',
    '@import "../../src/components/list/list.css";',
    '@import "../../src/components/table/table.css";',
    '@import "../../src/components/data-grid/data-grid.css";',
    '@import "../../src/components/tree/tree.css";',
    '@import "../../src/components/toolbar/toolbar.css";',
    '@import "../../src/components/pagination/pagination.css";',
    '@import "../../src/components/stack/stack.css";',
    '@import "../../src/components/grid/grid.css";',
    '@import "../../src/components/container/container.css";',
    '@import "../../src/components/surface/surface.css";',
    '@import "../../src/components/divider/divider.css";',
    '@import "../../src/components/scroll-area/scroll-area.css";',
    '@import "../../src/components/code/code.css";',
    '@import "../../src/components/code-block/code-block.css";',
    '@import "../../src/components/nav-list/nav-list.css";',
    '@import "../../src/components/sidebar/sidebar.css";',
  ].join("\n"),
);

async function bundle(input, outputName) {
  const result = await bundleAsync({
    filename: input,
    minify: production,
    sourceMap: true,
    targets,
  });
  const output = resolve(outputRoot, outputName);
  await writeFile(
    output,
    `${result.code.toString().trim()}\n/*# sourceMappingURL=${basename(output)}.map */\n`,
  );
  await writeFile(`${output}.map`, result.map);
}

await bundle(generatedStyles, "styles.css");
await bundle(generatedTokens, "tokens.css");
await bundle(resolve(packageRoot, "src/styles/reset.css"), "reset.css");

console.log(`Built Brick CSS (${mode}) for ${Object.keys(targets).length} browser targets.`);
