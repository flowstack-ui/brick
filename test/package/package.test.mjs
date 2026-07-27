import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageRoot = new URL("../../", import.meta.url);

test("package metadata defines the public Brick boundary", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", packageRoot), "utf8"),
  );

  assert.equal(packageJson.name, "@flowstack-ui/brick");
  assert.equal(packageJson.dependencies["@flowstack-ui/atom"], "0.12.0");
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
    "./icon": {
      types: "./dist/icon.d.ts",
      default: "./dist/icon.js",
    },
    "./image": {
      types: "./dist/image.d.ts",
      default: "./dist/image.js",
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
    "./radio-group": {
      types: "./dist/radio-group.d.ts",
      default: "./dist/radio-group.js",
    },
    "./switch": {
      types: "./dist/switch.d.ts",
      default: "./dist/switch.js",
    },
    "./breadcrumb": {
      types: "./dist/breadcrumb.d.ts",
      default: "./dist/breadcrumb.js",
    },
    "./tabs": {
      types: "./dist/tabs.d.ts",
      default: "./dist/tabs.js",
    },
    "./skeleton": {
      types: "./dist/skeleton.d.ts",
      default: "./dist/skeleton.js",
    },
    "./input": {
      types: "./dist/input.d.ts",
      default: "./dist/input.js",
    },
    "./textarea": {
      types: "./dist/textarea.d.ts",
      default: "./dist/textarea.js",
    },
    "./text": {
      types: "./dist/text.d.ts",
      default: "./dist/text.js",
    },
    "./link": {
      types: "./dist/link.d.ts",
      default: "./dist/link.js",
    },
    "./list": {
      types: "./dist/list.d.ts",
      default: "./dist/list.js",
    },
    "./stack": {
      types: "./dist/stack.d.ts",
      default: "./dist/stack.js",
    },
    "./grid": {
      types: "./dist/grid.d.ts",
      default: "./dist/grid.js",
    },
    "./container": {
      types: "./dist/container.d.ts",
      default: "./dist/container.js",
    },
    "./surface": {
      types: "./dist/surface.d.ts",
      default: "./dist/surface.js",
    },
    "./divider": {
      types: "./dist/divider.d.ts",
      default: "./dist/divider.js",
    },
    "./scroll-area": {
      types: "./dist/scroll-area.d.ts",
      default: "./dist/scroll-area.js",
    },
    "./select": {
      types: "./dist/select.d.ts",
      default: "./dist/select.js",
    },
    "./multi-select": {
      types: "./dist/multi-select.d.ts",
      default: "./dist/multi-select.js",
    },
    "./nav-list": {
      types: "./dist/nav-list.d.ts",
      default: "./dist/nav-list.js",
    },
    "./sidebar": {
      types: "./dist/sidebar.d.ts",
      default: "./dist/sidebar.js",
    },
    "./code": {
      types: "./dist/code.d.ts",
      default: "./dist/code.js",
    },
    "./code-block": {
      types: "./dist/code-block.d.ts",
      default: "./dist/code-block.js",
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
  const icon = await import(new URL("../../dist/icon.js", import.meta.url));
  const image = await import(new URL("../../dist/image.js", import.meta.url));
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
  const radioGroup = await import(new URL("../../dist/radio-group.js", import.meta.url));
  const switchModule = await import(new URL("../../dist/switch.js", import.meta.url));
  const breadcrumb = await import(new URL("../../dist/breadcrumb.js", import.meta.url));
  const tabs = await import(new URL("../../dist/tabs.js", import.meta.url));
  const skeleton = await import(new URL("../../dist/skeleton.js", import.meta.url));
  const input = await import(new URL("../../dist/input.js", import.meta.url));
  const textarea = await import(new URL("../../dist/textarea.js", import.meta.url));
  const text = await import(new URL("../../dist/text.js", import.meta.url));
  const link = await import(new URL("../../dist/link.js", import.meta.url));
  const list = await import(new URL("../../dist/list.js", import.meta.url));
  const stack = await import(new URL("../../dist/stack.js", import.meta.url));
  const grid = await import(new URL("../../dist/grid.js", import.meta.url));
  const container = await import(new URL("../../dist/container.js", import.meta.url));
  const surface = await import(new URL("../../dist/surface.js", import.meta.url));
  const divider = await import(new URL("../../dist/divider.js", import.meta.url));
  const scrollArea = await import(new URL("../../dist/scroll-area.js", import.meta.url));
  const select = await import(new URL("../../dist/select.js", import.meta.url));
  const multiSelect = await import(new URL("../../dist/multi-select.js", import.meta.url));
  const navList = await import(new URL("../../dist/nav-list.js", import.meta.url));
  const sidebar = await import(new URL("../../dist/sidebar.js", import.meta.url));
  const code = await import(new URL("../../dist/code.js", import.meta.url));
  const codeBlock = await import(new URL("../../dist/code-block.js", import.meta.url));
  assert.deepEqual(Object.keys(brick), ["AlertDialog", "AppBar", "AppBarCenter", "AppBarEnd", "AppBarRoot", "AppBarStart", "AppBarToolbar", "Avatar", "Badge", "Breadcrumb", "BreadcrumbEllipsis", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbList", "BreadcrumbPage", "BreadcrumbRoot", "BreadcrumbSeparator", "Button", "Card", "Checkbox", "CheckboxGroup", "Code", "CodeBlock", "CodeBlockActions", "CodeBlockContent", "CodeBlockCopyIndicator", "CodeBlockCopyStatus", "CodeBlockCopyTrigger", "CodeBlockHeader", "CodeBlockLanguage", "CodeBlockRoot", "CodeBlockTitle", "Container", "Dialog", "Divider", "Drawer", "Field", "Fieldset", "Form", "Grid", "HStack", "HoverCard", "Icon", "IconButton", "Image", "Input", "Link", "List", "MultiSelect", "MultiSelectArrow", "MultiSelectContent", "MultiSelectGroup", "MultiSelectIcon", "MultiSelectItem", "MultiSelectItemIndicator", "MultiSelectItemText", "MultiSelectLabel", "MultiSelectListbox", "MultiSelectPortal", "MultiSelectRoot", "MultiSelectScrollDownButton", "MultiSelectScrollUpButton", "MultiSelectSeparator", "MultiSelectTrigger", "MultiSelectValue", "MultiSelectViewport", "NavList", "NavListItem", "NavListLink", "NavListList", "NavListRoot", "NavListSection", "NavListSectionContent", "NavListSectionLabel", "NavListSectionTrigger", "NotificationBadge", "Popover", "PopoverAnchor", "PopoverArrow", "PopoverBody", "PopoverClose", "PopoverContent", "PopoverDescription", "PopoverFooter", "PopoverHeader", "PopoverPortal", "PopoverRoot", "PopoverTitle", "PopoverTrigger", "RadioGroup", "RadioGroupItem", "RadioGroupRoot", "ScrollArea", "ScrollAreaRoot", "ScrollAreaViewport", "Select", "SelectArrow", "SelectContent", "SelectGroup", "SelectIcon", "SelectItem", "SelectItemIndicator", "SelectItemText", "SelectLabel", "SelectListbox", "SelectPortal", "SelectRoot", "SelectScrollDownButton", "SelectScrollUpButton", "SelectSeparator", "SelectTrigger", "SelectValue", "SelectViewport", "Sidebar", "SidebarContent", "SidebarFooter", "SidebarHeader", "SidebarMain", "SidebarPanel", "SidebarRoot", "SidebarTrigger", "Skeleton", "Stack", "Surface", "Switch", "SwitchRoot", "SwitchThumb", "Tabs", "TabsContent", "TabsIndicator", "TabsList", "TabsRoot", "TabsTrigger", "Text", "Textarea", "TextareaCount", "TextareaRoot", "Toggle", "ToggleGroup", "ToggleGroupItem", "ToggleGroupRoot", "Tooltip", "VStack"]);
  assert.equal(button.Button, brick.Button);
  assert.equal(iconButton.IconButton, brick.IconButton);
  assert.equal(icon.Icon, brick.Icon);
  assert.equal(image.Image, brick.Image);
  assert.equal(list.List, brick.List);
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
  assert.equal(radioGroup.RadioGroup, brick.RadioGroup);
  assert.equal(radioGroup.RadioGroupRoot, brick.RadioGroup.Root);
  assert.equal(radioGroup.RadioGroupItem, brick.RadioGroup.Item);
  assert.equal(switchModule.Switch, brick.Switch);
  assert.equal(switchModule.SwitchRoot, brick.Switch.Root);
  assert.equal(switchModule.SwitchThumb, brick.Switch.Thumb);
  assert.equal(breadcrumb.Breadcrumb, brick.Breadcrumb);
  assert.equal(breadcrumb.BreadcrumbRoot, brick.Breadcrumb.Root);
  assert.equal(breadcrumb.BreadcrumbList, brick.Breadcrumb.List);
  assert.equal(breadcrumb.BreadcrumbItem, brick.Breadcrumb.Item);
  assert.equal(breadcrumb.BreadcrumbLink, brick.Breadcrumb.Link);
  assert.equal(breadcrumb.BreadcrumbPage, brick.Breadcrumb.Page);
  assert.equal(breadcrumb.BreadcrumbSeparator, brick.Breadcrumb.Separator);
  assert.equal(breadcrumb.BreadcrumbEllipsis, brick.Breadcrumb.Ellipsis);
  assert.equal(tabs.Tabs, brick.Tabs);
  assert.equal(tabs.TabsRoot, brick.Tabs.Root);
  assert.equal(tabs.TabsList, brick.Tabs.List);
  assert.equal(tabs.TabsTrigger, brick.Tabs.Trigger);
  assert.equal(tabs.TabsContent, brick.Tabs.Content);
  assert.equal(tabs.TabsIndicator, brick.Tabs.Indicator);
  assert.equal(skeleton.Skeleton, brick.Skeleton);
  assert.equal(input.Input, brick.Input);
  assert.equal(textarea.Textarea, brick.Textarea);
  assert.equal(textarea.TextareaRoot, brick.Textarea.Root);
  assert.equal(textarea.TextareaCount, brick.Textarea.Count);
  assert.equal(text.Text, brick.Text);
  assert.equal(link.Link, brick.Link);
  assert.equal(stack.Stack, brick.Stack);
  assert.equal(stack.HStack, brick.HStack);
  assert.equal(stack.VStack, brick.VStack);
  assert.equal(grid.Grid, brick.Grid);
  assert.equal(grid.Grid.Root, brick.Grid.Root);
  assert.equal(grid.Grid.Item, brick.Grid.Item);
  assert.equal(container.Container, brick.Container);
  assert.equal(surface.Surface, brick.Surface);
  assert.equal(divider.Divider, brick.Divider);
  assert.equal(scrollArea.ScrollArea, brick.ScrollArea);
  assert.equal(scrollArea.ScrollAreaRoot, brick.ScrollArea.Root);
  assert.equal(scrollArea.ScrollAreaViewport, brick.ScrollArea.Viewport);
  assert.equal(select.Select, brick.Select);
  assert.equal(select.SelectRoot, brick.Select.Root);
  assert.equal(select.SelectContent, brick.Select.Content);
  assert.equal(select.SelectItem, brick.Select.Item);
  assert.equal(multiSelect.MultiSelect, brick.MultiSelect);
  assert.equal(multiSelect.MultiSelectRoot, brick.MultiSelect.Root);
  assert.equal(multiSelect.MultiSelectContent, brick.MultiSelect.Content);
  assert.equal(multiSelect.MultiSelectItem, brick.MultiSelect.Item);
  assert.equal(navList.NavList, brick.NavList);
  assert.equal(navList.NavListRoot, brick.NavList.Root);
  assert.equal(navList.NavListLink, brick.NavList.Link);
  assert.equal(sidebar.Sidebar, brick.Sidebar);
  assert.equal(sidebar.SidebarPanel, brick.Sidebar.Panel);
  assert.equal(code.Code, brick.Code);
  assert.equal(codeBlock.CodeBlock, brick.CodeBlock);
  assert.equal(codeBlock.CodeBlockRoot, brick.CodeBlock.Root);
  assert.equal(codeBlock.CodeBlockContent, brick.CodeBlock.Content);
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
  assert.match(styles, /\.brick-icon/);
  assert.match(styles, /\.brick-image/);
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
  assert.match(styles, /\.brick-checkbox-group\[data-invalid\]/);
  assert.match(styles, /\.brick-checkbox-group:not\(\[data-invalid\]\)/);
  assert.match(styles, /\.brick-input/);
  assert.match(styles, /\.brick-textarea/);
  assert.match(styles, /\.brick-text/);
  assert.match(styles, /\.brick-link/);
  assert.match(styles, /\.brick-breadcrumb/);
  assert.match(styles, /\.brick-list/);
  assert.match(styles, /\.brick-stack/);
  assert.match(styles, /\.brick-grid/);
  assert.match(styles, /\.brick-container/);
  assert.match(styles, /\.brick-surface/);
  assert.match(styles, /\.brick-divider/);
  assert.match(styles, /\.brick-scroll-area/);
  assert.match(styles, /\.brick-nav-list/);
  assert.match(styles, /\.brick-sidebar/);
  assert.match(styles, /\.brick-code/);
  assert.match(styles, /\.brick-code-block/);
  assert.match(styles, /box-sizing:\s*border-box/);
  assert.match(styles, /--brick-button-background/);
  assert.match(styles, /--brick-icon-button-size/);
  assert.match(styles, /--brick-icon-size/);
  assert.match(styles, /--brick-image-fit/);
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
  assert.match(styles, /--brick-input-min-block-size/);
  assert.match(styles, /--brick-textarea-padding-inline/);
  assert.match(styles, /--brick-text-font-size/);
  assert.match(styles, /--brick-link-foreground/);
  assert.match(styles, /--brick-breadcrumb-foreground/);
  assert.match(styles, /--brick-list-marker-style/);
  assert.match(styles, /--brick-stack-gap/);
  assert.match(styles, /--brick-grid-columns/);
  assert.match(styles, /--brick-container-max-inline-size/);
  assert.match(styles, /--brick-surface-background/);
  assert.match(styles, /--brick-divider-color/);
  assert.match(styles, /--brick-scroll-area-scrollbar-thumb/);
  assert.match(styles, /--brick-nav-list-row-radius/);
  assert.match(styles, /--brick-sidebar-panel-width/);
  assert.match(styles, /--brick-code-font-family/);
  assert.match(styles, /--brick-code-block-background/);
  assert.match(styles, /--brick-control-min-block-size-xl/);
  assert.match(tokens, /data-brick-appearance/);
  assert.match(reset, /brick\.reset/);
  assert.doesNotMatch(styles, /@(?:tailwind|source|theme|utility|custom-variant)/);
  assert.doesNotMatch(styles, /\.\.\//);
  assert.doesNotMatch(styles, /body\s*\{[^}]*margin:/);
});
