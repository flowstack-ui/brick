import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { componentStyleNames } from "../../scripts/css-entrypoints.mjs";

const packageRoot = new URL("../../", import.meta.url);

test("package metadata defines the public Brick boundary", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", packageRoot), "utf8"),
  );

  assert.equal(packageJson.name, "@flowstack-ui/brick");
  assert.equal(packageJson.version, "0.1.11");
  assert.equal(packageJson.dependencies["@flowstack-ui/atom"], "0.24.0");
  assert.deepEqual(packageJson.publishConfig, { access: "public" });
  assert.equal(
    packageJson.repository.url,
    "git+https://github.com/flowstack-ui/brick.git",
  );
  assert.deepEqual(packageJson.exports, {
    ".": {
      types: "./dist/index.d.ts",
      default: "./dist/index.js",
    },
    "./agents/manifest.json": "./dist/agents/manifest.json",
    "./agents/coverage.json": "./dist/agents/coverage.json",
    "./agents/*.json": "./dist/agents/*.json",
    "./agents/*.md": "./dist/agents/*.md",
    "./theme-contract.json": "./dist/theme-contract.json",
    "./appearance": {
      types: "./dist/appearance.d.ts",
      default: "./dist/appearance.js",
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
    "./chip": {
      types: "./dist/chip.d.ts",
      default: "./dist/chip.js",
    },
    "./avatar": {
      types: "./dist/avatar.d.ts",
      default: "./dist/avatar.js",
    },
    "./status": {
      types: "./dist/status.d.ts",
      default: "./dist/status.js",
    },
    "./color-swatch": {
      types: "./dist/color-swatch.d.ts",
      default: "./dist/color-swatch.js",
    },
    "./color-picker": {
      types: "./dist/color-picker.d.ts",
      default: "./dist/color-picker.js",
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
    "./segment-group": {
      types: "./dist/segment-group.d.ts",
      default: "./dist/segment-group.js",
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
    "./dropdown-menu": {
      types: "./dist/dropdown-menu.d.ts",
      default: "./dist/dropdown-menu.js",
    },
    "./context-menu": {
      types: "./dist/context-menu.d.ts",
      default: "./dist/context-menu.js",
    },
    "./menubar": {
      types: "./dist/menubar.d.ts",
      default: "./dist/menubar.js",
    },
    "./navigation-menu": {
      types: "./dist/navigation-menu.d.ts",
      default: "./dist/navigation-menu.js",
    },
    "./bottom-navigation": {
      types: "./dist/bottom-navigation.d.ts",
      default: "./dist/bottom-navigation.js",
    },
    "./visually-hidden": {
      types: "./dist/visually-hidden.d.ts",
      default: "./dist/visually-hidden.js",
    },
    "./skip-link": {
      types: "./dist/skip-link.d.ts",
      default: "./dist/skip-link.js",
    },
    "./show": {
      types: "./dist/show.d.ts",
      default: "./dist/show.js",
    },
    "./hide": {
      types: "./dist/hide.d.ts",
      default: "./dist/hide.js",
    },
    "./skeleton": {
      types: "./dist/skeleton.d.ts",
      default: "./dist/skeleton.js",
    },
    "./progress": {
      types: "./dist/progress.d.ts",
      default: "./dist/progress.js",
    },
    "./progress-circle": {
      types: "./dist/progress-circle.d.ts",
      default: "./dist/progress-circle.js",
    },
    "./slider": {
      types: "./dist/slider.d.ts",
      default: "./dist/slider.js",
    },
    "./rating": {
      types: "./dist/rating.d.ts",
      default: "./dist/rating.js",
    },
    "./file-upload": {
      types: "./dist/file-upload.d.ts",
      default: "./dist/file-upload.js",
    },
    "./feed": {
      types: "./dist/feed.d.ts",
      default: "./dist/feed.js",
    },
    "./swipeable-item": {
      types: "./dist/swipeable-item.d.ts",
      default: "./dist/swipeable-item.js",
    },
    "./toast": {
      types: "./dist/toast.d.ts",
      default: "./dist/toast.js",
    },
    "./collapsible": {
      types: "./dist/collapsible.d.ts",
      default: "./dist/collapsible.js",
    },
    "./accordion": {
      types: "./dist/accordion.d.ts",
      default: "./dist/accordion.js",
    },
    "./input": {
      types: "./dist/input.d.ts",
      default: "./dist/input.js",
    },
    "./number-input": {
      types: "./dist/number-input.d.ts",
      default: "./dist/number-input.js",
    },
    "./otp-field": {
      types: "./dist/otp-field.d.ts",
      default: "./dist/otp-field.js",
    },
    "./password-toggle-field": {
      types: "./dist/password-toggle-field.d.ts",
      default: "./dist/password-toggle-field.js",
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
    "./link-box": {
      types: "./dist/link-box.d.ts",
      default: "./dist/link-box.js",
    },
    "./list": {
      types: "./dist/list.d.ts",
      default: "./dist/list.js",
    },
    "./reorderable-list": {
      types: "./dist/reorderable-list.d.ts",
      default: "./dist/reorderable-list.js",
    },
    "./table": {
      types: "./dist/table.d.ts",
      default: "./dist/table.js",
    },
    "./data-grid": {
      types: "./dist/data-grid.d.ts",
      default: "./dist/data-grid.js",
    },
    "./tree-grid": {
      types: "./dist/tree-grid.d.ts",
      default: "./dist/tree-grid.js",
    },
    "./aspect-ratio": {
      types: "./dist/aspect-ratio.d.ts",
      default: "./dist/aspect-ratio.js",
    },
    "./tree": {
      types: "./dist/tree.d.ts",
      default: "./dist/tree.js",
    },
    "./toolbar": {
      types: "./dist/toolbar.d.ts",
      default: "./dist/toolbar.js",
    },
    "./pagination": {
      types: "./dist/pagination.d.ts",
      default: "./dist/pagination.js",
    },
    "./stack": {
      types: "./dist/stack.d.ts",
      default: "./dist/stack.js",
    },
    "./group": {
      types: "./dist/group.d.ts",
      default: "./dist/group.js",
    },
    "./data-list": {
      types: "./dist/data-list.d.ts",
      default: "./dist/data-list.js",
    },
    "./z-stack": {
      types: "./dist/z-stack.d.ts",
      default: "./dist/z-stack.js",
    },
    "./grid": {
      types: "./dist/grid.d.ts",
      default: "./dist/grid.js",
    },
    "./container": {
      types: "./dist/container.d.ts",
      default: "./dist/container.js",
    },
    "./section": {
      types: "./dist/section.d.ts",
      default: "./dist/section.js",
    },
    "./frame": {
      types: "./dist/frame.d.ts",
      default: "./dist/frame.js",
    },
    "./bleed": {
      types: "./dist/bleed.d.ts",
      default: "./dist/bleed.js",
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
    "./combobox": {
      types: "./dist/combobox.d.ts",
      default: "./dist/combobox.js",
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
    "./carousel": {
      types: "./dist/carousel.d.ts",
      default: "./dist/carousel.js",
    },
    "./styles.css": "./dist/styles.css",
    "./styles/*.css": "./dist/styles/*.css",
    "./tokens.css": "./dist/tokens.css",
    "./reset.css": "./dist/reset.css",
  });
  assert.deepEqual(packageJson.sideEffects, ["**/*.css"]);
  const componentSubpaths = Object.entries(packageJson.exports)
    .filter(([path, target]) => path !== "." && typeof target === "object")
    .map(([path]) => path.slice(2))
    .sort();
  assert.deepEqual([...componentStyleNames].sort(), componentSubpaths);
});

test("release identity, changelog, dependency lock, and provenance stay aligned", async () => {
  const [packageJsonSource, lockSource, changelog, workflow] = await Promise.all([
    readFile(new URL("package.json", packageRoot), "utf8"),
    readFile(new URL("package-lock.json", packageRoot), "utf8"),
    readFile(new URL("CHANGELOG.md", packageRoot), "utf8"),
    readFile(new URL(".github/workflows/publish.yml", packageRoot), "utf8"),
  ]);
  const packageJson = JSON.parse(packageJsonSource);
  const packageLock = JSON.parse(lockSource);
  const lockedRoot = packageLock.packages[""];
  const lockedAtom = packageLock.packages["node_modules/@flowstack-ui/atom"];

  assert.equal(packageLock.version, packageJson.version);
  assert.equal(lockedRoot.version, packageJson.version);
  assert.equal(lockedRoot.dependencies["@flowstack-ui/atom"], packageJson.dependencies["@flowstack-ui/atom"]);
  assert.equal(lockedAtom.version, packageJson.dependencies["@flowstack-ui/atom"]);
  assert.match(changelog, new RegExp(`^## ${packageJson.version} - 2026-08-28$`, "m"));
  assert.match(workflow, /npm publish[^\n]+--provenance/u);
});

test("built package entrypoint can be imported without a CSS loader", async () => {
  const brick = await import(new URL("../../dist/index.js", import.meta.url));
  const appearance = await import(new URL("../../dist/appearance.js", import.meta.url));
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
  const chip = await import(new URL("../../dist/chip.js", import.meta.url));
  const avatar = await import(new URL("../../dist/avatar.js", import.meta.url));
  const status = await import(new URL("../../dist/status.js", import.meta.url));
  const colorSwatch = await import(new URL("../../dist/color-swatch.js", import.meta.url));
  const colorPicker = await import(new URL("../../dist/color-picker.js", import.meta.url));
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
  const segmentGroup = await import(new URL("../../dist/segment-group.js", import.meta.url));
  const switchModule = await import(new URL("../../dist/switch.js", import.meta.url));
  const breadcrumb = await import(new URL("../../dist/breadcrumb.js", import.meta.url));
  const tabs = await import(new URL("../../dist/tabs.js", import.meta.url));
  const skeleton = await import(new URL("../../dist/skeleton.js", import.meta.url));
  const progress = await import(new URL("../../dist/progress.js", import.meta.url));
  const progressCircle = await import(new URL("../../dist/progress-circle.js", import.meta.url));
  const slider = await import(new URL("../../dist/slider.js", import.meta.url));
  const rating = await import(new URL("../../dist/rating.js", import.meta.url));
  const reorderableList = await import(new URL("../../dist/reorderable-list.js", import.meta.url));
  const fileUpload = await import(new URL("../../dist/file-upload.js", import.meta.url));
  const feed = await import(new URL("../../dist/feed.js", import.meta.url));
  const swipeableItem = await import(new URL("../../dist/swipeable-item.js", import.meta.url));
  const toastModule = await import(new URL("../../dist/toast.js", import.meta.url));
  const input = await import(new URL("../../dist/input.js", import.meta.url));
  const textarea = await import(new URL("../../dist/textarea.js", import.meta.url));
  const text = await import(new URL("../../dist/text.js", import.meta.url));
  const link = await import(new URL("../../dist/link.js", import.meta.url));
  const linkBox = await import(new URL("../../dist/link-box.js", import.meta.url));
  const list = await import(new URL("../../dist/list.js", import.meta.url));
  const table = await import(new URL("../../dist/table.js", import.meta.url));
  const dataGrid = await import(new URL("../../dist/data-grid.js", import.meta.url));
  const treeGrid = await import(new URL("../../dist/tree-grid.js", import.meta.url));
  const aspectRatio = await import(new URL("../../dist/aspect-ratio.js", import.meta.url));
  const tree = await import(new URL("../../dist/tree.js", import.meta.url));
  const toolbar = await import(new URL("../../dist/toolbar.js", import.meta.url));
  const pagination = await import(new URL("../../dist/pagination.js", import.meta.url));
  const carousel = await import(new URL("../../dist/carousel.js", import.meta.url));
  const numberInput = await import(new URL("../../dist/number-input.js", import.meta.url));
  const otpField = await import(new URL("../../dist/otp-field.js", import.meta.url));
  const passwordToggleField = await import(new URL("../../dist/password-toggle-field.js", import.meta.url));
  const stack = await import(new URL("../../dist/stack.js", import.meta.url));
  const group = await import(new URL("../../dist/group.js", import.meta.url));
  const dataList = await import(new URL("../../dist/data-list.js", import.meta.url));
  const zStack = await import(new URL("../../dist/z-stack.js", import.meta.url));
  const grid = await import(new URL("../../dist/grid.js", import.meta.url));
  const container = await import(new URL("../../dist/container.js", import.meta.url));
  const section = await import(new URL("../../dist/section.js", import.meta.url));
  const frame = await import(new URL("../../dist/frame.js", import.meta.url));
  const bleed = await import(new URL("../../dist/bleed.js", import.meta.url));
  const surface = await import(new URL("../../dist/surface.js", import.meta.url));
  const divider = await import(new URL("../../dist/divider.js", import.meta.url));
  const scrollArea = await import(new URL("../../dist/scroll-area.js", import.meta.url));
  const select = await import(new URL("../../dist/select.js", import.meta.url));
  const combobox = await import(new URL("../../dist/combobox.js", import.meta.url));
  const multiSelect = await import(new URL("../../dist/multi-select.js", import.meta.url));
  const navList = await import(new URL("../../dist/nav-list.js", import.meta.url));
  const sidebar = await import(new URL("../../dist/sidebar.js", import.meta.url));
  const code = await import(new URL("../../dist/code.js", import.meta.url));
  const codeBlock = await import(new URL("../../dist/code-block.js", import.meta.url));
  const dropdownMenu = await import(new URL("../../dist/dropdown-menu.js", import.meta.url));
  const contextMenu = await import(new URL("../../dist/context-menu.js", import.meta.url));
  const menubar = await import(new URL("../../dist/menubar.js", import.meta.url));
  const navigationMenu = await import(new URL("../../dist/navigation-menu.js", import.meta.url));
  const bottomNavigation = await import(new URL("../../dist/bottom-navigation.js", import.meta.url));
  const visuallyHidden = await import(new URL("../../dist/visually-hidden.js", import.meta.url));
  const skipLink = await import(new URL("../../dist/skip-link.js", import.meta.url));
  const show = await import(new URL("../../dist/show.js", import.meta.url));
  const hide = await import(new URL("../../dist/hide.js", import.meta.url));
  const collapsible = await import(new URL("../../dist/collapsible.js", import.meta.url));
  const accordion = await import(new URL("../../dist/accordion.js", import.meta.url));
  assert.deepEqual(
    Object.keys(brick),
    [
      "Accordion",
      "AccordionContent",
      "AccordionContentInner",
      "AccordionHeader",
      "AccordionIndicator",
      "AccordionItem",
      "AccordionRoot",
      "AccordionTrigger",
      "AlertDialog",
      "AppBar",
      "AppBarCenter",
      "AppBarEnd",
      "AppBarRoot",
      "AppBarStart",
      "AppBarToolbar",
      "Appearance",
      "AspectRatio",
      "AspectRatioRoot",
      "Avatar",
      "Badge",
      "Bleed",
      "BottomNavigation",
      "BottomNavigationIcon",
      "BottomNavigationItem",
      "BottomNavigationLabel",
      "BottomNavigationRoot",
      "Breadcrumb",
      "BreadcrumbEllipsis",
      "BreadcrumbItem",
      "BreadcrumbLink",
      "BreadcrumbList",
      "BreadcrumbPage",
      "BreadcrumbRoot",
      "BreadcrumbSeparator",
      "Button",
      "Caption",
      "Card",
      "Carousel",
      "CarouselControls",
      "CarouselNavigation",
      "CarouselNext",
      "CarouselPicker",
      "CarouselPickerItem",
      "CarouselPrevious",
      "CarouselRoot",
      "CarouselRotationControl",
      "CarouselSlide",
      "CarouselTrack",
      "CarouselViewport",
      "Checkbox",
      "CheckboxGroup",
      "Chip",
      "ChipLabel",
      "ChipRemoveTrigger",
      "ChipRoot",
      "Code",
      "CodeBlock",
      "CodeBlockActions",
      "CodeBlockContent",
      "CodeBlockCopyIndicator",
      "CodeBlockCopyStatus",
      "CodeBlockCopyTrigger",
      "CodeBlockHeader",
      "CodeBlockLanguage",
      "CodeBlockRoot",
      "CodeBlockTitle",
      "Collapsible",
      "CollapsibleContent",
      "CollapsibleContentInner",
      "CollapsibleIndicator",
      "CollapsibleRoot",
      "CollapsibleTrigger",
      "ColorPicker",
      "ColorPickerContent",
      "ColorPickerControl",
      "ColorPickerHiddenInput",
      "ColorPickerInput",
      "ColorPickerLabel",
      "ColorPickerNativeInput",
      "ColorPickerRoot",
      "ColorPickerSwatchTrigger",
      "ColorPickerTrigger",
      "ColorSwatch",
      "ColorSwatchMix",
      "ColorSwatchRoot",
      "Combobox",
      "ComboboxClear",
      "ComboboxContent",
      "ComboboxControl",
      "ComboboxEmpty",
      "ComboboxGroup",
      "ComboboxIndicator",
      "ComboboxInput",
      "ComboboxItem",
      "ComboboxLabel",
      "ComboboxListbox",
      "ComboboxLoading",
      "ComboboxPortal",
      "ComboboxRoot",
      "ComboboxTrigger",
      "Container",
      "ContextMenu",
      "ContextMenuArrow",
      "ContextMenuCheckboxItem",
      "ContextMenuContent",
      "ContextMenuDescription",
      "ContextMenuGroup",
      "ContextMenuItem",
      "ContextMenuItemIndicator",
      "ContextMenuItemLabel",
      "ContextMenuLabel",
      "ContextMenuLeading",
      "ContextMenuPortal",
      "ContextMenuRadioGroup",
      "ContextMenuRadioItem",
      "ContextMenuRoot",
      "ContextMenuSeparator",
      "ContextMenuShortcut",
      "ContextMenuSub",
      "ContextMenuSubContent",
      "ContextMenuSubTrigger",
      "ContextMenuTrigger",
      "DataGrid",
      "DataGridBody",
      "DataGridCaption",
      "DataGridCell",
      "DataGridColumnHeader",
      "DataGridContainer",
      "DataGridFooter",
      "DataGridHeader",
      "DataGridRoot",
      "DataGridRow",
      "DataGridSortIndicator",
      "DataList",
      "DataListItem",
      "DataListLabel",
      "DataListRoot",
      "DataListValue",
      "Dialog",
      "Divider",
      "Drawer",
      "DropdownMenu",
      "DropdownMenuArrow",
      "DropdownMenuCheckboxItem",
      "DropdownMenuContent",
      "DropdownMenuDescription",
      "DropdownMenuGroup",
      "DropdownMenuItem",
      "DropdownMenuItemIndicator",
      "DropdownMenuItemLabel",
      "DropdownMenuLabel",
      "DropdownMenuLeading",
      "DropdownMenuPortal",
      "DropdownMenuRadioGroup",
      "DropdownMenuRadioItem",
      "DropdownMenuRoot",
      "DropdownMenuSeparator",
      "DropdownMenuShortcut",
      "DropdownMenuSub",
      "DropdownMenuSubContent",
      "DropdownMenuSubTrigger",
      "DropdownMenuTrigger",
      "Eyebrow",
      "Feed",
      "Field",
      "Fieldset",
      "FileUpload",
      "FileUploadDropzone",
      "FileUploadHiddenInput",
      "FileUploadItem",
      "FileUploadItemDeleteTrigger",
      "FileUploadItemGroup",
      "FileUploadItemName",
      "FileUploadItemSize",
      "FileUploadRoot",
      "FileUploadTrigger",
      "Form",
      "Frame",
      "Grid",
      "Group",
      "HStack",
      "Heading",
      "Hide",
      "HoverCard",
      "Icon",
      "IconButton",
      "Image",
      "ImageContent",
      "ImageFallback",
      "ImageRoot",
      "Input",
      "Link",
      "LinkBox",
      "LinkBoxAction",
      "LinkBoxLink",
      "LinkBoxRoot",
      "List",
      "Menubar",
      "MenubarArrow",
      "MenubarCheckboxItem",
      "MenubarContent",
      "MenubarDescription",
      "MenubarGroup",
      "MenubarItem",
      "MenubarItemIndicator",
      "MenubarItemLabel",
      "MenubarLabel",
      "MenubarLeading",
      "MenubarMenu",
      "MenubarPortal",
      "MenubarRadioGroup",
      "MenubarRadioItem",
      "MenubarRoot",
      "MenubarSeparator",
      "MenubarShortcut",
      "MenubarSub",
      "MenubarSubContent",
      "MenubarSubTrigger",
      "MenubarTrigger",
      "MultiSelect",
      "MultiSelectArrow",
      "MultiSelectContent",
      "MultiSelectGroup",
      "MultiSelectIcon",
      "MultiSelectItem",
      "MultiSelectItemIndicator",
      "MultiSelectItemText",
      "MultiSelectLabel",
      "MultiSelectListbox",
      "MultiSelectPortal",
      "MultiSelectRoot",
      "MultiSelectScrollDownButton",
      "MultiSelectScrollUpButton",
      "MultiSelectSeparator",
      "MultiSelectTrigger",
      "MultiSelectValue",
      "MultiSelectViewport",
      "NavList",
      "NavListItem",
      "NavListLink",
      "NavListList",
      "NavListRoot",
      "NavListSection",
      "NavListSectionContent",
      "NavListSectionLabel",
      "NavListSectionTrigger",
      "NavigationMenu",
      "NavigationMenuContent",
      "NavigationMenuIndicator",
      "NavigationMenuIndicatorArrow",
      "NavigationMenuItem",
      "NavigationMenuLink",
      "NavigationMenuList",
      "NavigationMenuRoot",
      "NavigationMenuSub",
      "NavigationMenuTrigger",
      "NavigationMenuViewport",
      "NotificationBadge",
      "NumberInput",
      "NumberInputDecrement",
      "NumberInputIncrement",
      "NumberInputInput",
      "NumberInputRoot",
      "OTPField",
      "OTPFieldGroup",
      "OTPFieldInput",
      "OTPFieldRoot",
      "OTPFieldSeparator",
      "Pagination",
      "PaginationEllipsis",
      "PaginationItem",
      "PaginationItems",
      "PaginationList",
      "PaginationNext",
      "PaginationPrevious",
      "PaginationRoot",
      "Paragraph",
      "PasswordToggleField",
      "PasswordToggleFieldIcon",
      "PasswordToggleFieldInput",
      "PasswordToggleFieldRoot",
      "PasswordToggleFieldToggle",
      "Popover",
      "PopoverAnchor",
      "PopoverArrow",
      "PopoverBody",
      "PopoverClose",
      "PopoverContent",
      "PopoverDescription",
      "PopoverFooter",
      "PopoverHeader",
      "PopoverPortal",
      "PopoverRoot",
      "PopoverTitle",
      "PopoverTrigger",
      "Progress",
      "ProgressBuffer",
      "ProgressCircle",
      "ProgressCircleCircle",
      "ProgressCircleIndicator",
      "ProgressCircleLabel",
      "ProgressCircleRoot",
      "ProgressCircleTrack",
      "ProgressCircleValue",
      "ProgressIndicator",
      "ProgressLabel",
      "ProgressRoot",
      "ProgressTrack",
      "ProgressValue",
      "RadioGroup",
      "RadioGroupItem",
      "RadioGroupRoot",
      "Rating",
      "RatingDisplay",
      "RatingItem",
      "RatingRoot",
      "RatingSummary",
      "ReorderableList",
      "ReorderableListActions",
      "ReorderableListContent",
      "ReorderableListDropIndicator",
      "ReorderableListHandle",
      "ReorderableListItem",
      "ReorderableListMoveAfter",
      "ReorderableListMoveBefore",
      "ReorderableListMoveToEnd",
      "ReorderableListMoveToStart",
      "ReorderableListRoot",
      "ScrollArea",
      "ScrollAreaRoot",
      "ScrollAreaViewport",
      "Section",
      "SegmentGroup",
      "SegmentGroupIndicator",
      "SegmentGroupItem",
      "SegmentGroupItemText",
      "SegmentGroupRoot",
      "Select",
      "SelectArrow",
      "SelectContent",
      "SelectGroup",
      "SelectIcon",
      "SelectItem",
      "SelectItemIndicator",
      "SelectItemText",
      "SelectLabel",
      "SelectListbox",
      "SelectPortal",
      "SelectRoot",
      "SelectScrollDownButton",
      "SelectScrollUpButton",
      "SelectSeparator",
      "SelectTrigger",
      "SelectValue",
      "SelectViewport",
      "Show",
      "Sidebar",
      "SidebarContent",
      "SidebarFooter",
      "SidebarHeader",
      "SidebarMain",
      "SidebarPanel",
      "SidebarRoot",
      "SidebarTrigger",
      "Skeleton",
      "SkipLink",
      "SkipLinkRoot",
      "SkipLinkTarget",
      "Slider",
      "SliderMarker",
      "SliderRange",
      "SliderRoot",
      "SliderThumb",
      "SliderTrack",
      "SliderValueLabel",
      "Stack",
      "Status",
      "StatusIndicator",
      "StatusLabel",
      "StatusRoot",
      "Surface",
      "SurfaceContent",
      "SurfaceMedia",
      "SurfaceRoot",
      "SurfaceScrim",
      "SwipeableItem",
      "SwipeableItemActions",
      "SwipeableItemContent",
      "SwipeableItemRoot",
      "Switch",
      "SwitchRoot",
      "SwitchThumb",
      "Table",
      "TableBody",
      "TableCaption",
      "TableCell",
      "TableContainer",
      "TableFooter",
      "TableHead",
      "TableHeader",
      "TableRoot",
      "TableRow",
      "TableSortIndicator",
      "Tabs",
      "TabsContent",
      "TabsIndicator",
      "TabsList",
      "TabsRoot",
      "TabsTrigger",
      "Text",
      "Textarea",
      "TextareaCount",
      "TextareaRoot",
      "Toast",
      "ToastAction",
      "ToastActions",
      "ToastClose",
      "ToastContent",
      "ToastDescription",
      "ToastIcon",
      "ToastRoot",
      "ToastTitle",
      "ToastViewport",
      "Toaster",
      "Toggle",
      "ToggleGroup",
      "ToggleGroupItem",
      "ToggleGroupRoot",
      "Toolbar",
      "ToolbarButton",
      "ToolbarLink",
      "ToolbarRoot",
      "ToolbarSeparator",
      "ToolbarToggleGroup",
      "ToolbarToggleItem",
      "Tooltip",
      "Tree",
      "TreeGrid",
      "TreeGridBody",
      "TreeGridCaption",
      "TreeGridCell",
      "TreeGridColumnHeader",
      "TreeGridContainer",
      "TreeGridFooter",
      "TreeGridHeader",
      "TreeGridIndicator",
      "TreeGridRoot",
      "TreeGridRow",
      "TreeGridRowHeader",
      "TreeGridSortIndicator",
      "TreeGroup",
      "TreeIndicator",
      "TreeItem",
      "TreeItemContent",
      "TreeItemText",
      "TreeRoot",
      "VStack",
      "VisuallyHidden",
      "VisuallyHiddenRoot",
      "ZStack",
      "ZStackItem",
      "ZStackRoot",
      "toast"
    ],
  );
  assert.equal(appearance.Appearance, brick.Appearance);
  assert.equal(button.Button, brick.Button);
  assert.equal(iconButton.IconButton, brick.IconButton);
  assert.equal(icon.Icon, brick.Icon);
  assert.equal(image.Image, brick.Image);
  assert.equal(aspectRatio.AspectRatio, brick.AspectRatio);
  assert.equal(aspectRatio.AspectRatioRoot, brick.AspectRatio.Root);
  assert.equal(list.List, brick.List);
  assert.equal(table.Table, brick.Table);
  assert.equal(table.TableRoot, brick.Table.Root);
  assert.equal(table.TableCell, brick.Table.Cell);
  assert.equal(dataGrid.DataGrid, brick.DataGrid);
  assert.equal(dataGrid.DataGridRoot, brick.DataGrid.Root);
  assert.equal(dataGrid.DataGridColumnHeader, brick.DataGrid.ColumnHeader);
  assert.equal(treeGrid.TreeGrid, brick.TreeGrid);
  assert.equal(treeGrid.TreeGridRoot, brick.TreeGrid.Root);
  assert.equal(treeGrid.TreeGridRowHeader, brick.TreeGrid.RowHeader);
  assert.equal(treeGrid.TreeGridIndicator, brick.TreeGrid.Indicator);
  assert.equal(tree.Tree, brick.Tree);
  assert.equal(tree.TreeRoot, brick.Tree.Root);
  assert.equal(tree.TreeIndicator, brick.Tree.Indicator);
  assert.equal(feed.Feed, brick.Feed);
  assert.equal(feed.Feed.Root.displayName, "Feed.Root");
  assert.equal(feed.Feed.Item.displayName, "Feed.Item");
  assert.equal(swipeableItem.SwipeableItem, brick.SwipeableItem);
  assert.equal(swipeableItem.SwipeableItem.Root.displayName, "SwipeableItem.Root");
  assert.equal(swipeableItem.SwipeableItem.Content.displayName, "SwipeableItem.Content");
  assert.equal(swipeableItem.SwipeableItem.Actions.displayName, "SwipeableItem.Actions");
  assert.equal(toolbar.Toolbar, brick.Toolbar);
  assert.equal(toolbar.ToolbarRoot, brick.Toolbar.Root);
  assert.equal(toolbar.ToolbarToggleItem, brick.Toolbar.ToggleItem);
  assert.equal(pagination.Pagination, brick.Pagination);
  assert.equal(pagination.PaginationRoot, brick.Pagination.Root);
  assert.equal(pagination.PaginationItems, brick.Pagination.Items);
  assert.equal(carousel.Carousel, brick.Carousel);
  assert.equal(carousel.CarouselRoot, brick.Carousel.Root);
  assert.equal(carousel.CarouselPickerItem, brick.Carousel.PickerItem);
  assert.equal(carousel.Root, brick.Carousel.Root);
  assert.equal(carousel.PickerItem, brick.Carousel.PickerItem);
  assert.equal(numberInput.NumberInput, brick.NumberInput);
  assert.equal(numberInput.NumberInputInput, brick.NumberInput.Input);
  assert.equal(otpField.OTPField, brick.OTPField);
  assert.equal(otpField.OTPFieldInput, brick.OTPField.Input);
  assert.equal(passwordToggleField.PasswordToggleField, brick.PasswordToggleField);
  assert.equal(passwordToggleField.PasswordToggleFieldToggle, brick.PasswordToggleField.Toggle);
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
  assert.equal(drawer.Root, brick.Drawer.Root);
  assert.equal(drawer.Trigger, brick.Drawer.Trigger);
  assert.equal(drawer.Portal, brick.Drawer.Portal);
  assert.equal(drawer.Content, brick.Drawer.Content);
  assert.equal(badge.Badge, brick.Badge);
  assert.equal(badge.NotificationBadge, brick.NotificationBadge);
  assert.equal(chip.Chip, brick.Chip);
  assert.equal(chip.ChipRoot, brick.Chip.Root);
  assert.equal(chip.ChipLabel, brick.Chip.Label);
  assert.equal(chip.ChipRemoveTrigger, brick.Chip.RemoveTrigger);
  assert.equal(avatar.Avatar, brick.Avatar);
  assert.equal(status.Status, brick.Status);
  assert.equal(status.StatusRoot, brick.Status.Root);
  assert.equal(status.StatusIndicator, brick.Status.Indicator);
  assert.equal(status.StatusLabel, brick.Status.Label);
  assert.equal(colorSwatch.ColorSwatch, brick.ColorSwatch);
  assert.equal(colorSwatch.ColorSwatchRoot, brick.ColorSwatch.Root);
  assert.equal(colorSwatch.ColorSwatchMix, brick.ColorSwatch.Mix);
  assert.equal(colorPicker.ColorPicker, brick.ColorPicker);
  assert.equal(colorPicker.ColorPickerRoot, brick.ColorPicker.Root);
  assert.equal(colorPicker.ColorPickerLabel, brick.ColorPicker.Label);
  assert.equal(colorPicker.ColorPickerControl, brick.ColorPicker.Control);
  assert.equal(colorPicker.ColorPickerInput, brick.ColorPicker.Input);
  assert.equal(colorPicker.ColorPickerNativeInput, brick.ColorPicker.NativeInput);
  assert.equal(colorPicker.ColorPickerHiddenInput, brick.ColorPicker.HiddenInput);
  assert.equal(colorPicker.ColorPickerTrigger, brick.ColorPicker.Trigger);
  assert.equal(colorPicker.ColorPickerContent, brick.ColorPicker.Content);
  assert.equal(colorPicker.ColorPickerSwatchTrigger, brick.ColorPicker.SwatchTrigger);
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
  assert.equal(segmentGroup.SegmentGroup, brick.SegmentGroup);
  assert.equal(segmentGroup.SegmentGroupRoot, brick.SegmentGroup.Root);
  assert.equal(segmentGroup.SegmentGroupItem, brick.SegmentGroup.Item);
  assert.equal(segmentGroup.SegmentGroupItemText, brick.SegmentGroup.ItemText);
  assert.equal(segmentGroup.SegmentGroupIndicator, brick.SegmentGroup.Indicator);
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
  assert.equal(progress.Progress, brick.Progress);
  assert.equal(progress.ProgressRoot, brick.Progress.Root);
  assert.equal(progress.ProgressLabel, brick.Progress.Label);
  assert.equal(progress.ProgressValue, brick.Progress.Value);
  assert.equal(progress.ProgressTrack, brick.Progress.Track);
  assert.equal(progress.ProgressBuffer, brick.Progress.Buffer);
  assert.equal(progress.ProgressIndicator, brick.Progress.Indicator);
  assert.equal(progressCircle.ProgressCircle, brick.ProgressCircle);
  assert.equal(progressCircle.ProgressCircleRoot, brick.ProgressCircle.Root);
  assert.equal(progressCircle.ProgressCircleCircle, brick.ProgressCircle.Circle);
  assert.equal(progressCircle.ProgressCircleTrack, brick.ProgressCircle.Track);
  assert.equal(progressCircle.ProgressCircleIndicator, brick.ProgressCircle.Indicator);
  assert.equal(progressCircle.ProgressCircleLabel, brick.ProgressCircle.Label);
  assert.equal(progressCircle.ProgressCircleValue, brick.ProgressCircle.Value);
  assert.equal(slider.Slider, brick.Slider);
  assert.equal(slider.SliderRoot, brick.Slider.Root);
  assert.equal(slider.SliderTrack, brick.Slider.Track);
  assert.equal(slider.SliderRange, brick.Slider.Range);
  assert.equal(slider.SliderThumb, brick.Slider.Thumb);
  assert.equal(slider.SliderMarker, brick.Slider.Marker);
  assert.equal(slider.SliderValueLabel, brick.Slider.ValueLabel);
  assert.equal(rating.Rating, brick.Rating);
  assert.equal(rating.RatingDisplay, brick.Rating.Display);
  assert.equal(rating.RatingRoot, brick.Rating.Root);
  assert.equal(rating.RatingItem, brick.Rating.Item);
  assert.equal(rating.RatingSummary, brick.Rating.Summary);
  assert.equal(reorderableList.ReorderableList, brick.ReorderableList);
  assert.equal(reorderableList.ReorderableListRoot, brick.ReorderableList.Root);
  assert.equal(reorderableList.ReorderableListItem, brick.ReorderableList.Item);
  assert.equal(reorderableList.ReorderableListContent, brick.ReorderableList.Content);
  assert.equal(reorderableList.ReorderableListHandle, brick.ReorderableList.Handle);
  assert.equal(reorderableList.ReorderableListDropIndicator, brick.ReorderableList.DropIndicator);
  assert.equal(reorderableList.ReorderableListActions, brick.ReorderableList.Actions);
  assert.equal(reorderableList.ReorderableListMoveBefore, brick.ReorderableList.MoveBefore);
  assert.equal(reorderableList.ReorderableListMoveAfter, brick.ReorderableList.MoveAfter);
  assert.equal(reorderableList.ReorderableListMoveToStart, brick.ReorderableList.MoveToStart);
  assert.equal(reorderableList.ReorderableListMoveToEnd, brick.ReorderableList.MoveToEnd);
  assert.equal(fileUpload.FileUpload, brick.FileUpload);
  assert.equal(fileUpload.FileUploadRoot, brick.FileUpload.Root);
  assert.equal(fileUpload.FileUploadHiddenInput, brick.FileUpload.HiddenInput);
  assert.equal(fileUpload.FileUploadTrigger, brick.FileUpload.Trigger);
  assert.equal(fileUpload.FileUploadDropzone, brick.FileUpload.Dropzone);
  assert.equal(fileUpload.FileUploadItemGroup, brick.FileUpload.ItemGroup);
  assert.equal(fileUpload.FileUploadItem, brick.FileUpload.Item);
  assert.equal(fileUpload.FileUploadItemName, brick.FileUpload.ItemName);
  assert.equal(fileUpload.FileUploadItemSize, brick.FileUpload.ItemSize);
  assert.equal(fileUpload.FileUploadItemDeleteTrigger, brick.FileUpload.ItemDeleteTrigger);
  assert.equal(toastModule.Toast, brick.Toast);
  assert.equal(toastModule.Toaster, brick.Toaster);
  assert.equal(toastModule.toast, brick.toast);
  assert.equal(toastModule.ToastRoot, brick.Toast.Root);
  assert.equal(toastModule.ToastViewport, brick.Toast.Viewport);
  assert.equal(dropdownMenu.DropdownMenu, brick.DropdownMenu);
  assert.equal(contextMenu.ContextMenu, brick.ContextMenu);
  assert.equal(menubar.Menubar, brick.Menubar);
  assert.equal(navigationMenu.NavigationMenu, brick.NavigationMenu);
  assert.equal(navigationMenu.Root, brick.NavigationMenu.Root);
  assert.equal(navigationMenu.Sub, brick.NavigationMenu.Sub);
  assert.equal(navigationMenu.List, brick.NavigationMenu.List);
  assert.equal(navigationMenu.Item, brick.NavigationMenu.Item);
  assert.equal(navigationMenu.Trigger, brick.NavigationMenu.Trigger);
  assert.equal(navigationMenu.Content, brick.NavigationMenu.Content);
  assert.equal(navigationMenu.Link, brick.NavigationMenu.Link);
  assert.equal(navigationMenu.Indicator, brick.NavigationMenu.Indicator);
  assert.equal(navigationMenu.IndicatorArrow, brick.NavigationMenu.IndicatorArrow);
  assert.equal(navigationMenu.Viewport, brick.NavigationMenu.Viewport);
  assert.equal(bottomNavigation.BottomNavigation, brick.BottomNavigation);
  assert.equal(bottomNavigation.BottomNavigationRoot, brick.BottomNavigation.Root);
  assert.equal(bottomNavigation.BottomNavigationItem, brick.BottomNavigation.Item);
  assert.equal(bottomNavigation.BottomNavigationIcon, brick.BottomNavigation.Icon);
  assert.equal(bottomNavigation.BottomNavigationLabel, brick.BottomNavigation.Label);
  assert.equal(visuallyHidden.VisuallyHidden, brick.VisuallyHidden);
  assert.equal(visuallyHidden.VisuallyHiddenRoot, brick.VisuallyHidden.Root);
  assert.equal(skipLink.SkipLink, brick.SkipLink);
  assert.equal(skipLink.SkipLinkRoot, brick.SkipLink.Root);
  assert.equal(skipLink.SkipLinkTarget, brick.SkipLink.Target);
  assert.equal(show.Show, brick.Show);
  assert.equal(hide.Hide, brick.Hide);
  assert.equal(collapsible.Collapsible, brick.Collapsible);
  assert.equal(collapsible.CollapsibleRoot, brick.Collapsible.Root);
  assert.equal(collapsible.CollapsibleTrigger, brick.Collapsible.Trigger);
  assert.equal(collapsible.CollapsibleIndicator, brick.Collapsible.Indicator);
  assert.equal(collapsible.CollapsibleContent, brick.Collapsible.Content);
  assert.equal(collapsible.CollapsibleContentInner, brick.Collapsible.ContentInner);
  assert.equal(accordion.Accordion, brick.Accordion);
  assert.equal(accordion.AccordionRoot, brick.Accordion.Root);
  assert.equal(accordion.AccordionItem, brick.Accordion.Item);
  assert.equal(accordion.AccordionHeader, brick.Accordion.Header);
  assert.equal(accordion.AccordionTrigger, brick.Accordion.Trigger);
  assert.equal(accordion.AccordionIndicator, brick.Accordion.Indicator);
  assert.equal(accordion.AccordionContent, brick.Accordion.Content);
  assert.equal(accordion.AccordionContentInner, brick.Accordion.ContentInner);
  assert.equal(input.Input, brick.Input);
  assert.equal(textarea.Textarea, brick.Textarea);
  assert.equal(textarea.TextareaRoot, brick.Textarea.Root);
  assert.equal(textarea.TextareaCount, brick.Textarea.Count);
  assert.equal(text.Text, brick.Text);
  assert.equal(text.Heading, brick.Heading);
  assert.equal(text.Paragraph, brick.Paragraph);
  assert.equal(text.Caption, brick.Caption);
  assert.equal(text.Eyebrow, brick.Eyebrow);
  assert.equal(link.Link, brick.Link);
  assert.equal(linkBox.LinkBox, brick.LinkBox);
  assert.equal(linkBox.LinkBoxRoot, brick.LinkBox.Root);
  assert.equal(linkBox.LinkBoxLink, brick.LinkBox.Link);
  assert.equal(linkBox.LinkBoxAction, brick.LinkBox.Action);
  assert.equal(stack.Stack, brick.Stack);
  assert.equal(stack.HStack, brick.HStack);
  assert.equal(stack.VStack, brick.VStack);
  assert.equal(group.Group, brick.Group);
  assert.equal(dataList.DataList, brick.DataList);
  assert.equal(dataList.DataListRoot, brick.DataList.Root);
  assert.equal(dataList.DataListItem, brick.DataList.Item);
  assert.equal(dataList.DataListLabel, brick.DataList.Label);
  assert.equal(dataList.DataListValue, brick.DataList.Value);
  assert.equal(zStack.ZStack, brick.ZStack);
  assert.equal(zStack.ZStackRoot, brick.ZStack.Root);
  assert.equal(zStack.ZStackItem, brick.ZStack.Item);
  assert.equal(grid.Grid, brick.Grid);
  assert.equal(grid.Grid.Root, brick.Grid.Root);
  assert.equal(grid.Grid.Item, brick.Grid.Item);
  assert.equal(container.Container, brick.Container);
  assert.equal(section.Section, brick.Section);
  assert.equal(frame.Frame, brick.Frame);
  assert.equal(bleed.Bleed, brick.Bleed);
  assert.equal(surface.Surface, brick.Surface);
  assert.equal(surface.SurfaceRoot, brick.Surface.Root);
  assert.equal(surface.SurfaceMedia, brick.Surface.Media);
  assert.equal(surface.SurfaceScrim, brick.Surface.Scrim);
  assert.equal(surface.SurfaceContent, brick.Surface.Content);
  assert.equal(image.ImageRoot, brick.Image.Root);
  assert.equal(image.ImageContent, brick.Image.Content);
  assert.equal(image.ImageFallback, brick.Image.Fallback);
  assert.equal(divider.Divider, brick.Divider);
  assert.equal(scrollArea.ScrollArea, brick.ScrollArea);
  assert.equal(scrollArea.ScrollAreaRoot, brick.ScrollArea.Root);
  assert.equal(scrollArea.ScrollAreaViewport, brick.ScrollArea.Viewport);
  assert.equal(select.Select, brick.Select);
  assert.equal(select.SelectRoot, brick.Select.Root);
  assert.equal(select.SelectContent, brick.Select.Content);
  assert.equal(select.SelectItem, brick.Select.Item);
  assert.equal(combobox.Combobox, brick.Combobox);
  assert.equal(combobox.ComboboxRoot, brick.Combobox.Root);
  assert.equal(combobox.ComboboxContent, brick.Combobox.Content);
  assert.equal(combobox.ComboboxItem, brick.Combobox.Item);
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
  assert.match(
    styles,
    /:where\(body\)\{[^}]*background-color:var\(--brick-color-surface-canvas\)[^}]*color:var\(--brick-color-text-primary\)[^}]*font-family:var\(--brick-font-family-body\)[^}]*font-size:var\(--brick-typography-body-md-font-size\)[^}]*line-height:var\(--brick-typography-body-md-line-height\)/,
  );
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
  assert.match(styles, /\.brick-collapsible/);
  assert.match(styles, /\.brick-accordion/);
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
  assert.match(styles, /\.brick-link-box/);
  assert.match(styles, /\.brick-breadcrumb/);
  assert.match(styles, /\.brick-pagination/);
  assert.match(styles, /\.brick-bottom-navigation/);
  assert.match(styles, /\.brick-list/);
  assert.match(styles, /\.brick-tree/);
  assert.match(styles, /\.brick-feed/);
  assert.match(styles, /\.brick-swipeable-item/);
  assert.match(styles, /\.brick-stack/);
  assert.match(styles, /\.brick-grid/);
  assert.match(styles, /\.brick-container/);
  assert.match(styles, /\.brick-section/);
  assert.match(styles, /\.brick-frame/);
  assert.match(styles, /\.brick-show/);
  assert.match(styles, /\.brick-hide/);
  assert.match(styles, /\.brick-surface/);
  assert.match(styles, /\.brick-divider/);
  assert.match(styles, /\.brick-scroll-area/);
  assert.match(styles, /\.brick-nav-list/);
  assert.match(
    styles,
    /\.brick-nav-list__link\[data-has-description\].*margin-block-start:calc\(\(1em\s*\*\s*var\(--brick-nav-list-label-line-height\)\s*-\s*var\(--brick-nav-list-icon-size\)\)\s*\*\s*\.5\)/,
  );
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
  assert.match(styles, /--brick-drawer-inline-size-xl/);
  assert.match(styles, /--brick-drawer-block-size-xl/);
  assert.match(
    styles,
    /max-block-size:var\(--brick-drawer-block-size-md\)/,
  );
  assert.match(
    styles,
    /var\(--brick-drawer-background,var\(--brick-color-surface-overlay\)\)/,
  );
  assert.match(
    styles,
    /var\(--brick-drawer-radius,var\(--brick-radius-overlay\)\)/,
  );
  assert.doesNotMatch(
    styles,
    /--brick-drawer-radius:var\(--brick-radius-overlay\)/,
  );
  assert.match(styles, /--brick-badge-min-block-size/);
  assert.match(styles, /--brick-badge-gap/);
  assert.match(styles, /--brick-avatar-status-ring-color/);
  assert.match(styles, /--brick-toggle-min-block-size/);
  assert.match(styles, /--brick-tooltip-background/);
  assert.match(styles, /--brick-hover-card-background/);
  assert.match(styles, /--brick-popover-background/);
  assert.match(styles, /--brick-collapsible-background/);
  assert.match(styles, /--brick-accordion-background/);
  assert.match(styles, /--brick-form-gap/);
  assert.match(styles, /--brick-field-label-foreground/);
  assert.match(styles, /--brick-fieldset-legend-foreground/);
  assert.match(styles, /--brick-checkbox-control-size/);
  assert.match(styles, /--brick-checkbox-group-gap/);
  assert.match(styles, /--brick-input-min-block-size/);
  assert.match(styles, /--brick-textarea-padding-inline/);
  assert.match(styles, /--brick-text-font-size/);
  assert.match(styles, /--brick-link-foreground/);
  assert.match(styles, /--brick-link-box-focus-ring/);
  assert.match(styles, /--brick-breadcrumb-foreground/);
  assert.match(styles, /--brick-pagination-current-background/);
  assert.match(styles, /--brick-bottom-navigation-selection-background/);
  assert.match(styles, /--brick-list-marker-style/);
  assert.match(styles, /--brick-tree-row-min-block-size/);
  assert.match(styles, /--brick-feed-item-padding-block/);
  assert.match(styles, /--brick-swipeable-item-action-min-size/);
  assert.match(styles, /--brick-stack-gap/);
  assert.match(styles, /--brick-grid-columns/);
  assert.match(styles, /--brick-container-max-inline-size/);
  assert.match(styles, /--brick-section-spacing/);
  assert.match(styles, /--brick-surface-background/);
  assert.match(styles, /--brick-divider-color/);
  assert.match(styles, /--brick-scroll-area-scrollbar-thumb/);
  assert.match(styles, /--brick-nav-list-row-radius/);
  assert.match(styles, /--brick-nav-list-row-padding-inline-start/);
  assert.match(styles, /--brick-nav-list-row-padding-inline-end/);
  assert.match(styles, /--brick-sidebar-panel-width/);
  assert.match(styles, /--brick-code-font-family/);
  assert.match(styles, /--brick-code-block-background/);
  assert.match(styles, /--brick-control-min-block-size-xl/);
  assert.match(tokens, /data-brick-appearance/);
  assert.match(reset, /brick\.reset/);
  assert.match(reset, /blockquote,figure\{margin:0\}/);
  assert.match(reset, /::selection\{background:var\(--brick-color-accent-solid\);color:var\(--brick-color-accent-on-solid\)\}/);
  assert.match(reset, /@media \(forced-colors:active\)\{::selection\{color:highlighttext;background:highlight\}\}/);
  assert.doesNotMatch(styles, /@(?:tailwind|source|theme|utility|custom-variant)/);
  assert.doesNotMatch(styles, /\.\.\//);
  assert.doesNotMatch(styles, /body\s*\{[^}]*margin:/);
});

test("optional modular CSS entrypoints preserve the complete default", async () => {
  const core = await readFile(new URL("../../dist/styles/core.css", import.meta.url), "utf8");
  assert.match(core, /--brick-color-accent-solid/);
  assert.match(core, /brick\.foundations/);
  assert.match(
    core,
    /:where\(body\)\{[^}]*background-color:var\(--brick-color-surface-canvas\)[^}]*color:var\(--brick-color-text-primary\)[^}]*font-family:var\(--brick-font-family-body\)[^}]*font-size:var\(--brick-typography-body-md-font-size\)[^}]*line-height:var\(--brick-typography-body-md-line-height\)/,
  );
  assert.doesNotMatch(core, /\.brick-button/);

  assert.equal(componentStyleNames.length, 88);
  for (const name of componentStyleNames) {
    const css = await readFile(new URL(`../../dist/styles/${name}.css`, import.meta.url), "utf8");
    assert.match(css, /@layer brick\.tokens,flowstack\.theme,brick\.foundations/);
    if (name === "visually-hidden") {
      assert.match(css, /brick\.components,brick\.utilities,brick\.effects/);
      assert.doesNotMatch(css, /\.brick-/);
    } else {
      if (name === "frame" || name === "bleed") assert.match(css, /@layer brick\.utilities/);
      else assert.match(css, /@layer brick\.components/);
      assert.match(css, /(?:brick\.utilities,brick\.effects|@layer brick\.effects)/);
      assert.match(css, /\.brick-/);
    }
    assert.doesNotMatch(css, /--brick-color-accent-solid:/);
    assert.doesNotMatch(css, /@(?:tailwind|source|theme|utility|custom-variant)/);
    assert.doesNotMatch(css, /\.\.\//);
  }

  const [checkboxGroup, toggleGroup, pagination, codeBlock] = await Promise.all(
    ["checkbox-group", "toggle-group", "pagination", "code-block"].map((name) =>
      readFile(new URL(`../../dist/styles/${name}.css`, import.meta.url), "utf8"),
    ),
  );

  assert.match(checkboxGroup, /\.brick-checkbox-control/);
  assert.match(checkboxGroup, /\.brick-checkbox-group/);
  assert.match(toggleGroup, /\.brick-toggle-group-item/);
  assert.match(toggleGroup, /\.brick-toggle-group/);
  assert.match(pagination, /\.brick-icon/);
  assert.match(pagination, /\.brick-pagination/);
  assert.match(codeBlock, /\.brick-button/);
  assert.match(codeBlock, /\.brick-code(?:\W|$)/);
  assert.match(codeBlock, /\.brick-scroll-area/);
  assert.match(codeBlock, /\.brick-code-block/);
  assert.match(codeBlock, /\.brick-code-block-pre\{[^}]*text-size-adjust:\s*none/);
});
