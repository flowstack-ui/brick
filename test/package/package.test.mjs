import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageRoot = new URL("../../", import.meta.url);

test("package metadata defines the public Brick boundary", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", packageRoot), "utf8"),
  );

  assert.equal(packageJson.name, "@flowstack-ui/brick");
  assert.equal(packageJson.dependencies["@flowstack-ui/atom"], "0.6.10");
  assert.equal(
    packageJson.repository.url,
    "git+https://github.com/flowstack-ui/brick.git",
  );
  assert.deepEqual(packageJson.exports, {
    ".": {
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
    },
    "./button": {
      types: "./dist/button.d.ts",
      default: "./dist/button.js",
    },
    "./icon-button": {
      types: "./dist/icon-button.d.ts",
      default: "./dist/icon-button.js",
    },
    "./app-bar": {
      types: "./dist/app-bar.d.ts",
      default: "./dist/app-bar.js",
    },
    "./card": {
      types: "./dist/card.d.ts",
      default: "./dist/card.js",
    },
    "./dialog": {
      types: "./dist/dialog.d.ts",
      default: "./dist/dialog.js",
    },
    "./alert-dialog": {
      types: "./dist/alert-dialog.d.ts",
      default: "./dist/alert-dialog.js",
    },
    "./drawer": {
      types: "./dist/drawer.d.ts",
      default: "./dist/drawer.js",
    },
    "./badge": {
      types: "./dist/badge.d.ts",
      default: "./dist/badge.js",
    },
    "./avatar": {
      types: "./dist/avatar.d.ts",
      default: "./dist/avatar.js",
    },
    "./toggle": {
      types: "./dist/toggle.d.ts",
      default: "./dist/toggle.js",
    },
    "./toggle-group": {
      types: "./dist/toggle-group.d.ts",
      default: "./dist/toggle-group.js",
    },
    "./tooltip": {
      types: "./dist/tooltip.d.ts",
      default: "./dist/tooltip.js",
    },
    "./hover-card": {
      types: "./dist/hover-card.d.ts",
      default: "./dist/hover-card.js",
    },
    "./popover": {
      types: "./dist/popover.d.ts",
      default: "./dist/popover.js",
    },
    "./form": {
      types: "./dist/form.d.ts",
      default: "./dist/form.js",
    },
    "./field": {
      types: "./dist/field.d.ts",
      default: "./dist/field.js",
    },
    "./fieldset": {
      types: "./dist/fieldset.d.ts",
      default: "./dist/fieldset.js",
    },
    "./checkbox": {
      types: "./dist/checkbox.d.ts",
      default: "./dist/checkbox.js",
    },
    "./checkbox-group": {
      types: "./dist/checkbox-group.d.ts",
      default: "./dist/checkbox-group.js",
    },
    "./styles.css": "./dist/styles.css",
    "./tokens.css": "./dist/tokens.css",
    "./reset.css": "./dist/reset.css",
  });
  assert.deepEqual(packageJson.sideEffects, ["**/*.css"]);
});

test("built package entrypoint can be imported without a CSS loader", async () => {
  const brick = await import(new URL("../../dist/index.js", import.meta.url));
  const button = await import(new URL("../../dist/button.js", import.meta.url));
  const iconButton = await import(new URL("../../dist/icon-button.js", import.meta.url));
  const appBar = await import(new URL("../../dist/app-bar.js", import.meta.url));
  const card = await import(new URL("../../dist/card.js", import.meta.url));
  const dialog = await import(new URL("../../dist/dialog.js", import.meta.url));
  const alertDialog = await import(new URL("../../dist/alert-dialog.js", import.meta.url));
  const drawer = await import(new URL("../../dist/drawer.js", import.meta.url));
  const badge = await import(new URL("../../dist/badge.js", import.meta.url));
  const avatar = await import(new URL("../../dist/avatar.js", import.meta.url));
  const toggle = await import(new URL("../../dist/toggle.js", import.meta.url));
  const toggleGroup = await import(new URL("../../dist/toggle-group.js", import.meta.url));
  const tooltip = await import(new URL("../../dist/tooltip.js", import.meta.url));
  const hoverCard = await import(new URL("../../dist/hover-card.js", import.meta.url));
  const popover = await import(new URL("../../dist/popover.js", import.meta.url));
  const form = await import(new URL("../../dist/form.js", import.meta.url));
  const field = await import(new URL("../../dist/field.js", import.meta.url));
  const fieldset = await import(new URL("../../dist/fieldset.js", import.meta.url));
  const checkbox = await import(new URL("../../dist/checkbox.js", import.meta.url));
  const checkboxGroup = await import(new URL("../../dist/checkbox-group.js", import.meta.url));
  assert.deepEqual(Object.keys(brick), ["AlertDialog", "AppBar", "AppBarCenter", "AppBarEnd", "AppBarRoot", "AppBarStart", "AppBarToolbar", "Avatar", "Badge", "Button", "Card", "Checkbox", "CheckboxGroup", "Dialog", "Drawer", "Field", "Fieldset", "Form", "HoverCard", "IconButton", "NotificationBadge", "Popover", "PopoverAnchor", "PopoverArrow", "PopoverBody", "PopoverClose", "PopoverContent", "PopoverDescription", "PopoverFooter", "PopoverHeader", "PopoverPortal", "PopoverRoot", "PopoverTitle", "PopoverTrigger", "Toggle", "ToggleGroup", "ToggleGroupItem", "ToggleGroupRoot", "Tooltip"]);
  assert.equal(button.Button, brick.Button);
  assert.equal(iconButton.IconButton, brick.IconButton);
  assert.equal(appBar.AppBar, brick.AppBar);
  assert.equal(appBar.AppBarRoot, brick.AppBar.Root);
  assert.equal(appBar.AppBarToolbar, brick.AppBar.Toolbar);
  assert.equal(card.Card, brick.Card);
  assert.equal(dialog.Dialog, brick.Dialog);
  assert.equal(dialog.DialogContent, brick.Dialog.Content);
  assert.equal(alertDialog.AlertDialog, brick.AlertDialog);
  assert.equal(alertDialog.AlertDialogContent, brick.AlertDialog.Content);
  assert.equal(drawer.Drawer, brick.Drawer);
  assert.equal(drawer.DrawerContent, brick.Drawer.Content);
  assert.equal(badge.Badge, brick.Badge);
  assert.equal(badge.NotificationBadge, brick.NotificationBadge);
  assert.equal(avatar.Avatar, brick.Avatar);
  assert.equal(toggle.Toggle, brick.Toggle);
  assert.equal(toggleGroup.ToggleGroup, brick.ToggleGroup);
  assert.equal(toggleGroup.ToggleGroupRoot, brick.ToggleGroup.Root);
  assert.equal(toggleGroup.ToggleGroupItem, brick.ToggleGroup.Item);
  assert.equal(tooltip.Tooltip, brick.Tooltip);
  assert.equal(tooltip.TooltipContent, brick.Tooltip.Content);
  assert.equal(hoverCard.HoverCard, brick.HoverCard);
  assert.equal(hoverCard.HoverCardContent, brick.HoverCard.Content);
  assert.equal(popover.Popover, brick.Popover);
  assert.equal(popover.PopoverContent, brick.Popover.Content);
  assert.equal(form.Form, brick.Form);
  assert.equal(field.Field, brick.Field);
  assert.equal(field.FieldRoot, brick.Field.Root);
  assert.equal(field.FieldDescription, brick.Field.Description);
  assert.equal(fieldset.Fieldset, brick.Fieldset);
  assert.equal(fieldset.FieldsetRoot, brick.Fieldset.Root);
  assert.equal(fieldset.FieldsetLegend, brick.Fieldset.Legend);
  assert.equal(checkbox.Checkbox, brick.Checkbox);
  assert.equal(checkboxGroup.CheckboxGroup, brick.CheckboxGroup);
  assert.equal(checkboxGroup.CheckboxGroupRoot, brick.CheckboxGroup.Root);
  assert.equal(checkboxGroup.CheckboxGroupItem, brick.CheckboxGroup.Item);
  assert.equal(checkboxGroup.CheckboxGroupItemLabel, brick.CheckboxGroup.ItemLabel);
  assert.equal(checkboxGroup.CheckboxGroupItemDescription, brick.CheckboxGroup.ItemDescription);
  assert.equal(checkboxGroup.CheckboxGroupParent, brick.CheckboxGroup.Parent);
});

test("published CSS entrypoints are complete browser CSS", async () => {
  const [styles, tokens, reset] = await Promise.all(
    ["styles.css", "tokens.css", "reset.css"].map((name) =>
      readFile(new URL(`../../dist/${name}`, import.meta.url), "utf8"),
    ),
  );

  assert.match(styles, /--brick-color-accent-solid/);
  assert.match(styles, /brick\.foundations/);
  assert.match(styles, /\.brick-button/);
  assert.match(styles, /\.brick-icon-button/);
  assert.match(styles, /\.brick-app-bar/);
  assert.match(styles, /\.brick-card/);
  assert.match(styles, /\.brick-dialog-content/);
  assert.match(styles, /\.brick-alert-dialog-content/);
  assert.match(styles, /\.brick-drawer-content/);
  assert.match(styles, /\.brick-badge/);
  assert.match(styles, /\.brick-notification-badge/);
  assert.match(styles, /\.brick-avatar/);
  assert.match(styles, /\.brick-toggle/);
  assert.match(styles, /\.brick-toggle-group/);
  assert.match(styles, /\.brick-tooltip/);
  assert.match(styles, /\.brick-hover-card/);
  assert.match(styles, /\.brick-popover/);
  assert.match(styles, /\.brick-form/);
  assert.match(styles, /\.brick-field/);
  assert.match(styles, /\.brick-fieldset/);
  assert.match(styles, /\.brick-checkbox/);
  assert.match(styles, /\.brick-checkbox-group/);
  assert.match(styles, /box-sizing:\s*border-box/);
  assert.match(styles, /--brick-button-background/);
  assert.match(styles, /--brick-icon-button-size/);
  assert.match(styles, /--brick-app-bar-background/);
  assert.match(styles, /prefers-reduced-transparency/);
  assert.match(styles, /--brick-card-space/);
  assert.match(styles, /--brick-dialog-max-inline-size/);
  assert.match(styles, /--brick-alert-dialog-max-inline-size/);
  assert.match(styles, /--brick-drawer-inline-size-md/);
  assert.match(styles, /--brick-badge-min-block-size/);
  assert.match(styles, /--brick-avatar-status-ring-color/);
  assert.match(styles, /--brick-toggle-min-block-size/);
  assert.match(styles, /--brick-tooltip-background/);
  assert.match(styles, /--brick-hover-card-background/);
  assert.match(styles, /--brick-popover-background/);
  assert.match(styles, /--brick-form-gap/);
  assert.match(styles, /--brick-field-label-foreground/);
  assert.match(styles, /--brick-fieldset-legend-foreground/);
  assert.match(styles, /--brick-checkbox-control-size/);
  assert.match(styles, /--brick-checkbox-group-gap/);
  assert.match(styles, /--brick-control-min-block-size-xl/);
  assert.match(tokens, /data-brick-appearance/);
  assert.match(reset, /brick\.reset/);
  assert.doesNotMatch(styles, /@(?:tailwind|source|theme|utility|custom-variant)/);
  assert.doesNotMatch(styles, /\.\.\//);
  assert.doesNotMatch(styles, /body\s*\{[^}]*margin:/);
});
