import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const packageRoot = resolve(".");
const packageJson = JSON.parse(
  await readFile(join(packageRoot, "package.json"), "utf8"),
);
const atomVersion = packageJson.dependencies["@flowstack-ui/atom"];
const temp = await mkdtemp(join(tmpdir(), "brick-consumers-"));
const cache = join(temp, "npm-cache");
const tarballArgument = process.argv.indexOf("--tarball");
const suppliedTarball = tarballArgument === -1
  ? undefined
  : process.argv[tarballArgument + 1];
const commandTimeoutMs = 180_000;

if (tarballArgument !== -1 && !suppliedTarball) {
  throw new Error("--tarball requires an archive path");
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: cache },
    timeout: commandTimeoutMs,
  });
  if (result.error?.code === "ETIMEDOUT") {
    throw new Error(
      `${command} ${args[0] ?? ""} exceeded the ${commandTimeoutMs / 1_000}-second consumer-verification timeout`,
    );
  }
  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
  return result.stdout;
}

try {
  let tarball;
  if (suppliedTarball) {
    tarball = resolve(suppliedTarball);
    console.log(`Using release archive ${basename(tarball)} for clean React consumer verification...`);
  } else {
    console.log("Packing Brick once for clean React consumer verification...");
    const packOutput = run("npm", ["pack", "--json", "--pack-destination", temp], packageRoot);
    const [{ filename }] = JSON.parse(packOutput);
    tarball = join(temp, basename(filename));
  }

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
      `import { AlertDialog, AppBar, Avatar, Badge, BottomNavigation, Breadcrumb, Button, Card, Checkbox, CheckboxGroup, Chip, Container, ContextMenu, Drawer, DropdownMenu, Grid, Hide, HoverCard, IconButton, Input, Link, Menubar, NavigationMenu, NotificationBadge, NumberInput, OTPField, PasswordToggleField, Popover, RadioGroup, Show, Skeleton, Surface, SwipeableItem, Switch, Tabs, Text, Textarea, Toggle, ToggleGroup, VisuallyHidden } from "@flowstack-ui/brick";
import { AlertDialog as SubpathAlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { IconButton as SubpathIconButton } from "@flowstack-ui/brick/icon-button";
import { AppBar as SubpathAppBar } from "@flowstack-ui/brick/app-bar";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import { Drawer as SubpathDrawer } from "@flowstack-ui/brick/drawer";
import * as DrawerModule from "@flowstack-ui/brick/drawer";
import { Badge as SubpathBadge, NotificationBadge as SubpathNotificationBadge } from "@flowstack-ui/brick/badge";
import { Chip as SubpathChip } from "@flowstack-ui/brick/chip";
import { Avatar as SubpathAvatar } from "@flowstack-ui/brick/avatar";
import { Toggle as SubpathToggle } from "@flowstack-ui/brick/toggle";
import { ToggleGroup as SubpathToggleGroup } from "@flowstack-ui/brick/toggle-group";
import { Tooltip as SubpathTooltip } from "@flowstack-ui/brick/tooltip";
import { HoverCard as SubpathHoverCard } from "@flowstack-ui/brick/hover-card";
import { Popover as SubpathPopover } from "@flowstack-ui/brick/popover";
import { Checkbox as SubpathCheckbox } from "@flowstack-ui/brick/checkbox";
import { CheckboxGroup as SubpathCheckboxGroup } from "@flowstack-ui/brick/checkbox-group";
import { RadioGroup as SubpathRadioGroup } from "@flowstack-ui/brick/radio-group";
import { Switch as SubpathSwitch } from "@flowstack-ui/brick/switch";
import { Input as SubpathInput } from "@flowstack-ui/brick/input";
import { NumberInput as SubpathNumberInput } from "@flowstack-ui/brick/number-input";
import { OTPField as SubpathOTPField } from "@flowstack-ui/brick/otp-field";
import { PasswordToggleField as SubpathPasswordToggleField } from "@flowstack-ui/brick/password-toggle-field";
import { Textarea as SubpathTextarea } from "@flowstack-ui/brick/textarea";
import { Link as SubpathLink } from "@flowstack-ui/brick/link";
import { Text as SubpathText } from "@flowstack-ui/brick/text";
import { Grid as SubpathGrid } from "@flowstack-ui/brick/grid";
import { Container as SubpathContainer } from "@flowstack-ui/brick/container";
import { Surface as SubpathSurface } from "@flowstack-ui/brick/surface";
import { Breadcrumb as SubpathBreadcrumb } from "@flowstack-ui/brick/breadcrumb";
import { Tabs as SubpathTabs } from "@flowstack-ui/brick/tabs";
import { Skeleton as SubpathSkeleton } from "@flowstack-ui/brick/skeleton";
import { DropdownMenu as SubpathDropdownMenu } from "@flowstack-ui/brick/dropdown-menu";
import { ContextMenu as SubpathContextMenu } from "@flowstack-ui/brick/context-menu";
import { Menubar as SubpathMenubar } from "@flowstack-ui/brick/menubar";
import { NavigationMenu as SubpathNavigationMenu } from "@flowstack-ui/brick/navigation-menu";
import * as NavigationMenuModule from "@flowstack-ui/brick/navigation-menu";
import { BottomNavigation as SubpathBottomNavigation } from "@flowstack-ui/brick/bottom-navigation";
import { VisuallyHidden as SubpathVisuallyHidden } from "@flowstack-ui/brick/visually-hidden";
import { Show as SubpathShow } from "@flowstack-ui/brick/show";
import { Hide as SubpathHide } from "@flowstack-ui/brick/hide";
import { SwipeableItem as SubpathSwipeableItem } from "@flowstack-ui/brick/swipeable-item";
import React from "react";
import { renderToString } from "react-dom/server";
import { readFile } from "node:fs/promises";

if (Button !== SubpathButton) throw new Error("Button subpath export mismatch");
if (IconButton !== SubpathIconButton) throw new Error("IconButton subpath export mismatch");
if (AppBar !== SubpathAppBar) throw new Error("AppBar subpath export mismatch");
if (Card !== SubpathCard) throw new Error("Card subpath export mismatch");
if (Drawer !== SubpathDrawer || Object.keys(SubpathDrawer).length !== 12) throw new Error("Drawer subpath smoke failed");
if (DrawerModule.Root !== Drawer.Root || DrawerModule.Trigger !== Drawer.Trigger || DrawerModule.Content !== Drawer.Content) throw new Error("Drawer module namespace smoke failed");
if (AlertDialog !== SubpathAlertDialog) throw new Error("AlertDialog subpath export mismatch");
if (Badge !== SubpathBadge || NotificationBadge !== SubpathNotificationBadge) throw new Error("Badge subpath export mismatch");
if (Chip !== SubpathChip || Object.keys(SubpathChip).length !== 3) throw new Error("Chip subpath smoke failed");
if (Avatar !== SubpathAvatar) throw new Error("Avatar subpath export mismatch");
if (Toggle !== SubpathToggle) throw new Error("Toggle subpath export mismatch");
if (ToggleGroup !== SubpathToggleGroup) throw new Error("ToggleGroup subpath export mismatch");
if (HoverCard !== SubpathHoverCard || Object.keys(SubpathHoverCard).length !== 5) throw new Error("HoverCard subpath smoke failed");
if (Popover !== SubpathPopover || Object.keys(SubpathPopover).length !== 12) throw new Error("Popover subpath smoke failed");
if (Checkbox !== SubpathCheckbox) throw new Error("Checkbox subpath export mismatch");
if (CheckboxGroup !== SubpathCheckboxGroup || Object.keys(SubpathCheckboxGroup).length !== 5) throw new Error("CheckboxGroup subpath smoke failed");
if (RadioGroup !== SubpathRadioGroup || Object.keys(SubpathRadioGroup).length !== 2) throw new Error("RadioGroup subpath smoke failed");
if (Switch !== SubpathSwitch || Object.keys(SubpathSwitch).length !== 2) throw new Error("Switch subpath smoke failed");
if (Input !== SubpathInput) throw new Error("Input subpath export mismatch");
if (NumberInput !== SubpathNumberInput || Object.keys(SubpathNumberInput).length !== 4) throw new Error("Number Input subpath smoke failed");
if (OTPField !== SubpathOTPField || Object.keys(SubpathOTPField).length !== 4) throw new Error("OTP Field subpath smoke failed");
if (PasswordToggleField !== SubpathPasswordToggleField || Object.keys(SubpathPasswordToggleField).length !== 4) throw new Error("Password Toggle Field subpath smoke failed");
if (Textarea !== SubpathTextarea || Object.keys(SubpathTextarea).length !== 2) throw new Error("Textarea subpath export mismatch");
if (Link !== SubpathLink) throw new Error("Link subpath export mismatch");
if (Text !== SubpathText) throw new Error("Text subpath export mismatch");
if (Grid !== SubpathGrid || Object.keys(SubpathGrid).length !== 2) throw new Error("Grid subpath smoke failed");
if (Container !== SubpathContainer) throw new Error("Container subpath export mismatch");
if (Surface !== SubpathSurface) throw new Error("Surface subpath export mismatch");
if (Breadcrumb !== SubpathBreadcrumb || Object.keys(SubpathBreadcrumb).length !== 7) throw new Error("Breadcrumb subpath smoke failed");
if (Tabs !== SubpathTabs || Object.keys(SubpathTabs).length !== 5) throw new Error("Tabs subpath smoke failed");
if (Skeleton !== SubpathSkeleton) throw new Error("Skeleton subpath export mismatch");
if (DropdownMenu !== SubpathDropdownMenu || Object.keys(SubpathDropdownMenu).length !== 20) throw new Error("Dropdown Menu subpath smoke failed");
if (ContextMenu !== SubpathContextMenu || Object.keys(SubpathContextMenu).length !== 20) throw new Error("Context Menu subpath smoke failed");
if (Menubar !== SubpathMenubar || Object.keys(SubpathMenubar).length !== 21) throw new Error("Menubar subpath smoke failed");
if (NavigationMenu !== SubpathNavigationMenu || Object.keys(SubpathNavigationMenu).length !== 10) throw new Error("Navigation Menu subpath smoke failed");
if (NavigationMenuModule.Root !== NavigationMenu.Root || NavigationMenuModule.Link !== NavigationMenu.Link || NavigationMenuModule.Viewport !== NavigationMenu.Viewport) throw new Error("Navigation Menu module namespace smoke failed");
if (BottomNavigation !== SubpathBottomNavigation || Object.keys(SubpathBottomNavigation).length !== 4) throw new Error("Bottom Navigation subpath smoke failed");
if (VisuallyHidden !== SubpathVisuallyHidden || Object.keys(SubpathVisuallyHidden).length !== 1) throw new Error("Visually Hidden subpath smoke failed");
if (Show !== SubpathShow || Hide !== SubpathHide) throw new Error("Responsive visibility subpath export mismatch");
if (SwipeableItem !== SubpathSwipeableItem || Object.keys(SubpathSwipeableItem).length !== 3) throw new Error("Swipeable Item subpath smoke failed");
const markup = renderToString(React.createElement(Button, null, "Brick consumer"));
if (!markup.includes("brick-button") || !markup.includes("Brick consumer")) throw new Error("Button SSR smoke failed");
const iconButtonMarkup = renderToString(React.createElement(IconButton, { "aria-label": "Search" }, React.createElement("svg")));
if (!iconButtonMarkup.includes("brick-icon-button") || !iconButtonMarkup.includes('aria-label="Search"')) throw new Error("IconButton SSR smoke failed");
const appBarMarkup = renderToString(React.createElement(AppBar.Root, { position: "sticky" }, React.createElement(AppBar.Toolbar, null, "Workspace")));
if (!appBarMarkup.includes("brick-app-bar") || !appBarMarkup.includes('data-position="sticky"')) throw new Error("AppBar SSR smoke failed");
const cardMarkup = renderToString(React.createElement(Card.Root, { as: "article" }, React.createElement(Card.Title, { as: "h1" }, "Card consumer")));
if (!cardMarkup.includes("brick-card") || !cardMarkup.includes("Card consumer")) throw new Error("Card SSR smoke failed");
const drawerMarkup = renderToString(React.createElement(DrawerModule.Root, null, React.createElement(DrawerModule.Trigger, null, "Open navigation")));
if (!drawerMarkup.includes("brick-drawer-trigger") || !drawerMarkup.includes("Open navigation")) throw new Error("Drawer module SSR smoke failed");
const badgeMarkup = renderToString(React.createElement(Badge, { tone: "success" }, "Published"));
if (!badgeMarkup.includes("brick-badge") || !badgeMarkup.includes("Published")) throw new Error("Badge SSR smoke failed");
const chipMarkup = renderToString(React.createElement(Chip.Root, null, React.createElement(Chip.Label, null, "Riley Chen"), React.createElement(Chip.RemoveTrigger, { ariaLabel: "Remove Riley Chen" })));
if (!chipMarkup.includes("brick-chip") || !chipMarkup.includes('aria-label="Remove Riley Chen"')) throw new Error("Chip SSR smoke failed");
const notificationMarkup = renderToString(React.createElement(NotificationBadge, { count: 4 }, React.createElement("button", { "aria-label": "Inbox, 4 unread messages" }, "Inbox")));
if (!notificationMarkup.includes("brick-notification-badge") || !notificationMarkup.includes('aria-hidden="true"')) throw new Error("NotificationBadge SSR smoke failed");
const avatarMarkup = renderToString(React.createElement(Avatar, { alt: "Ada Lovelace", fallback: "AL", shape: "rounded", status: "online" }));
if (!avatarMarkup.includes("brick-avatar") || !avatarMarkup.includes('data-status="online"') || !avatarMarkup.includes("Ada Lovelace")) throw new Error("Avatar SSR smoke failed");
const toggleMarkup = renderToString(React.createElement(Toggle, { pressed: true }, "Favorite"));
if (!toggleMarkup.includes("brick-toggle") || !toggleMarkup.includes('aria-pressed="true"')) throw new Error("Toggle SSR smoke failed");
const toggleGroupMarkup = renderToString(React.createElement(ToggleGroup.Root, { value: "cards" }, React.createElement(ToggleGroup.Item, { value: "cards" }, "Cards")));
if (!toggleGroupMarkup.includes("brick-toggle-group") || !toggleGroupMarkup.includes("brick-toggle-group-item")) throw new Error("ToggleGroup SSR smoke failed");
const checkboxMarkup = renderToString(React.createElement(Checkbox, { defaultChecked: "indeterminate" }, "Terms"));
if (!checkboxMarkup.includes("brick-checkbox") || !checkboxMarkup.includes('aria-checked="mixed"')) throw new Error("Checkbox SSR smoke failed");
const checkboxGroupMarkup = renderToString(React.createElement(CheckboxGroup.Root, { "aria-label": "Channels" }, React.createElement(CheckboxGroup.Item, { value: "email" }, "Email")));
if (!checkboxGroupMarkup.includes("brick-checkbox-group") || !checkboxGroupMarkup.includes("brick-checkbox-group-item")) throw new Error("CheckboxGroup SSR smoke failed");
const radioGroupMarkup = renderToString(React.createElement(RadioGroup.Root, { "aria-label": "Channel", defaultValue: "email" }, React.createElement(RadioGroup.Item, { value: "email" }, "Email")));
if (!radioGroupMarkup.includes("brick-radio-group") || !radioGroupMarkup.includes("brick-radio-group-item") || !radioGroupMarkup.includes('aria-checked="true"')) throw new Error("RadioGroup SSR smoke failed");
const switchMarkup = renderToString(React.createElement(Switch.Root, { "aria-label": "Reports", defaultChecked: true }, React.createElement(Switch.Thumb)));
if (!switchMarkup.includes("brick-switch") || !switchMarkup.includes("brick-switch-thumb") || !switchMarkup.includes('aria-checked="true"')) throw new Error("Switch SSR smoke failed");
const inputMarkup = renderToString(React.createElement(Input, { "aria-label": "Search", defaultValue: "Brick", clearable: true }));
if (!inputMarkup.includes("brick-input") || !inputMarkup.includes('aria-label="Clear input"')) throw new Error("Input SSR smoke failed");
const numberInputMarkup = renderToString(React.createElement(NumberInput.Root, { "aria-label": "Quantity", defaultValue: 3 }, React.createElement(NumberInput.Input), React.createElement(NumberInput.Increment, { "aria-label": "Increase" }), React.createElement(NumberInput.Decrement, { "aria-label": "Decrease" })));
if (!numberInputMarkup.includes("brick-number-input") || !numberInputMarkup.includes('role="spinbutton"')) throw new Error("Number Input SSR smoke failed");
const otpMarkup = renderToString(React.createElement(OTPField.Root, { "aria-label": "Code", length: 2 }, React.createElement(OTPField.Group, null, React.createElement(OTPField.Input, { index: 0 }), React.createElement(OTPField.Input, { index: 1 }))));
if (!otpMarkup.includes("brick-otp-field") || !otpMarkup.includes('aria-label="Digit 1 of 2"')) throw new Error("OTP Field SSR smoke failed");
const passwordMarkup = renderToString(React.createElement(PasswordToggleField.Root, null, React.createElement(PasswordToggleField.Input, { "aria-label": "Password" }), React.createElement(PasswordToggleField.Toggle)));
if (!passwordMarkup.includes("brick-password-toggle-field") || !passwordMarkup.includes('aria-label="Show password"')) throw new Error("Password Toggle Field SSR smoke failed");
const textareaMarkup = renderToString(React.createElement(Textarea.Root, { "aria-label": "Notes", defaultValue: "Brick", maxLength: 20 }, React.createElement(Textarea.Count)));
if (!textareaMarkup.includes("brick-textarea") || !textareaMarkup.includes("5/20")) throw new Error("Textarea SSR smoke failed");
const linkMarkup = renderToString(React.createElement(Link, { href: "/guides", endIcon: React.createElement("svg") }, "Read guides"));
if (!linkMarkup.includes("brick-link") || !linkMarkup.includes('href="/guides"') || !linkMarkup.includes("Read guides")) throw new Error("Link SSR smoke failed");
const textMarkup = renderToString(React.createElement(Text, { as: "h2", variant: "title-sm" }, "Text consumer"));
if (!textMarkup.includes("brick-text") || !textMarkup.includes('data-variant="title-sm"')) throw new Error("Text SSR smoke failed");
const gridMarkup = renderToString(React.createElement(Grid.Root, { columns: 2, gap: "2" }, React.createElement("span", null, "One"), React.createElement(Grid.Item, { columnSpan: "full" }, "Summary")));
if (!gridMarkup.includes("brick-grid") || !gridMarkup.includes("brick-grid-item") || !gridMarkup.includes('data-column-span="full"')) throw new Error("Grid SSR smoke failed");
const containerMarkup = renderToString(React.createElement(Container, { as: "main", measure: "max", gutter: "lg" }, "Measured"));
if (!containerMarkup.includes("brick-container") || !containerMarkup.includes('data-measure="max"') || !containerMarkup.includes('data-gutter="lg"')) throw new Error("Container SSR smoke failed");
const surfaceMarkup = renderToString(React.createElement(Surface, { as: "section", bordered: true, inset: "md", level: "subtle" }, "Painted"));
if (!surfaceMarkup.includes("brick-surface") || !surfaceMarkup.includes('data-level="subtle"') || !surfaceMarkup.includes('data-bordered=""')) throw new Error("Surface SSR smoke failed");
const breadcrumbMarkup = renderToString(React.createElement(Breadcrumb.Root, { ariaLabel: "Current path" }, React.createElement(Breadcrumb.List, null, React.createElement(Breadcrumb.Item, null, React.createElement(Breadcrumb.Link, { href: "/" }, "Home")), React.createElement(Breadcrumb.Separator), React.createElement(Breadcrumb.Item, null, React.createElement(Breadcrumb.Page, null, "Current")))));
if (!breadcrumbMarkup.includes("brick-breadcrumb") || !breadcrumbMarkup.includes('aria-current="page"') || !breadcrumbMarkup.includes('aria-hidden="true"')) throw new Error("Breadcrumb SSR smoke failed");
const tabsMarkup = renderToString(React.createElement(Tabs.Root, { defaultValue: "one" }, React.createElement(Tabs.List, { ariaLabel: "Sections" }, React.createElement(Tabs.Trigger, { value: "one" }, "One")), React.createElement(Tabs.Content, { value: "one" }, "Panel")));
if (!tabsMarkup.includes("brick-tabs") || !tabsMarkup.includes('role="tablist"') || !tabsMarkup.includes('aria-selected="true"')) throw new Error("Tabs SSR smoke failed");
const skeletonMarkup = renderToString(React.createElement(Skeleton, { animation: "wave", lines: 3 }));
if (!skeletonMarkup.includes("brick-skeleton") || !skeletonMarkup.includes('data-lines="3"') || !skeletonMarkup.includes('aria-hidden="true"')) throw new Error("Skeleton SSR smoke failed");
const dropdownMarkup = renderToString(React.createElement(DropdownMenu.Root, null, React.createElement(DropdownMenu.Trigger, null, "Actions")));
if (!dropdownMarkup.includes("brick-dropdown-menu__trigger") || !dropdownMarkup.includes('aria-haspopup="menu"')) throw new Error("Dropdown Menu SSR smoke failed");
const contextMarkup = renderToString(React.createElement(ContextMenu.Root, null, React.createElement(ContextMenu.Trigger, null, "Region")));
if (!contextMarkup.includes("brick-context-menu__trigger") || !contextMarkup.includes("Region")) throw new Error("Context Menu SSR smoke failed");
const menubarMarkup = renderToString(React.createElement(Menubar.Root, { "aria-label": "Commands" }, React.createElement(Menubar.Menu, { value: "file" }, React.createElement(Menubar.Trigger, null, "File"))));
if (!menubarMarkup.includes("brick-menubar") || !menubarMarkup.includes('role="menubar"')) throw new Error("Menubar SSR smoke failed");
const navigationMarkup = renderToString(React.createElement(NavigationMenuModule.Root, { "aria-label": "Primary" }, React.createElement(NavigationMenuModule.List, null, React.createElement(NavigationMenuModule.Item, { value: "docs" }, React.createElement(NavigationMenuModule.Link, { href: "/docs" }, "Docs")))));
if (!navigationMarkup.includes("brick-navigation-menu") || !navigationMarkup.includes('href="/docs"')) throw new Error("Navigation Menu SSR smoke failed");
const bottomNavigationMarkup = renderToString(React.createElement(BottomNavigation.Root, { ariaLabel: "Primary", defaultValue: "home" }, React.createElement(BottomNavigation.Item, { href: "/home", value: "home" }, React.createElement(BottomNavigation.Icon, null, "H"), React.createElement(BottomNavigation.Label, null, "Home"))));
if (!bottomNavigationMarkup.includes("brick-bottom-navigation") || !bottomNavigationMarkup.includes('aria-current="page"') || !bottomNavigationMarkup.includes('data-safe-area=""')) throw new Error("Bottom Navigation SSR smoke failed");
const visuallyHiddenMarkup = renderToString(React.createElement(VisuallyHidden.Root, null, "Search"));
if (!visuallyHiddenMarkup.includes("brick-visually-hidden") || !visuallyHiddenMarkup.includes('data-slot="visually-hidden"') || !visuallyHiddenMarkup.includes('position:absolute')) throw new Error("Visually Hidden SSR smoke failed");
const showMarkup = renderToString(React.createElement(Show, { as: "aside", from: "md" }, "Wide guidance"));
const hideMarkup = renderToString(React.createElement(Hide, { as: "aside", from: "md" }, "Compact guidance"));
if (!showMarkup.includes("brick-show") || !showMarkup.includes('data-from="md"') || !hideMarkup.includes("brick-hide") || !hideMarkup.includes('data-from="md"')) throw new Error("Responsive visibility SSR smoke failed");
const swipeableMarkup = renderToString(React.createElement(SwipeableItem.Root, null, React.createElement(SwipeableItem.Content, null, "Message"), React.createElement(SwipeableItem.Actions, { "aria-label": "Message actions", side: "end" }, React.createElement("button", null, "Delete"))));
if (!swipeableMarkup.includes("brick-swipeable-item") || !swipeableMarkup.includes('aria-label="Message actions"')) throw new Error("Swipeable Item SSR smoke failed");
if (!SubpathTooltip || Object.keys(SubpathTooltip).length !== 8) throw new Error("Tooltip subpath smoke failed");
const css = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles.css", import.meta.url), "utf8");
const themeContract = JSON.parse(await readFile(new URL(import.meta.resolve("@flowstack-ui/brick/theme-contract.json")), "utf8"));
if (themeContract.$schema !== "flowstack.brick-theme-contract.v1" || themeContract.package.name !== "@flowstack-ui/brick") throw new Error("Theme contract export is invalid");
const coreCss = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles/core.css", import.meta.url), "utf8");
const buttonCss = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles/button.css", import.meta.url), "utf8");
if (!coreCss.includes("--brick-color-accent-solid") || !coreCss.includes("brick.foundations") || !coreCss.includes(":where(body)") || coreCss.includes(".brick-button")) throw new Error("Modular core CSS export is invalid");
if (!buttonCss.includes(".brick-button") || buttonCss.includes("--brick-color-accent-solid:")) throw new Error("Modular Button CSS export is invalid");
if (!css.includes("--brick-color-accent-solid") || !css.includes(".brick-icon-button") || !css.includes(".brick-app-bar") || !css.includes(".brick-card") || !css.includes(".brick-alert-dialog-content") || !css.includes(".brick-badge") || !css.includes(".brick-chip") || !css.includes(".brick-avatar") || !css.includes(".brick-toggle") || !css.includes(".brick-toggle-group") || !css.includes(".brick-tooltip") || !css.includes(".brick-hover-card") || !css.includes(".brick-popover") || !css.includes(".brick-checkbox") || !css.includes(".brick-checkbox-group") || !css.includes(".brick-radio-group") || !css.includes(".brick-input") || !css.includes(".brick-textarea") || !css.includes(".brick-link") || !css.includes(".brick-text") || !css.includes(".brick-grid") || !css.includes(".brick-container") || !css.includes(".brick-surface")) throw new Error("CSS export missing");
if (!css.includes(".brick-switch") || !css.includes("--brick-switch-track-inline-size")) throw new Error("Switch CSS export missing");
if (!css.includes(".brick-breadcrumb") || !css.includes("--brick-breadcrumb-foreground")) throw new Error("Breadcrumb CSS export missing");
if (!css.includes(".brick-tabs") || !css.includes("--brick-tabs-indicator-color")) throw new Error("Tabs CSS export missing");
if (!css.includes(".brick-skeleton") || !css.includes("--brick-skeleton-background")) throw new Error("Skeleton CSS export missing");
if (!css.includes(".brick-dropdown-menu__content") || !css.includes("--brick-dropdown-menu-content-background")) throw new Error("Dropdown Menu CSS export missing");
if (!css.includes(".brick-context-menu__content") || !css.includes("--brick-context-menu-content-background")) throw new Error("Context Menu CSS export missing");
if (!css.includes(".brick-menubar") || !css.includes("--brick-menubar-background")) throw new Error("Menubar CSS export missing");
if (!css.includes(".brick-navigation-menu") || !css.includes("--brick-navigation-menu-viewport-background")) throw new Error("Navigation Menu CSS export missing");
if (!css.includes(".brick-bottom-navigation") || !css.includes("--brick-bottom-navigation-selection-background")) throw new Error("Bottom Navigation CSS export missing");
if (!css.includes(".brick-number-input") || !css.includes("--brick-number-input-height")) throw new Error("Number Input CSS export missing");
if (!css.includes(".brick-otp-field") || !css.includes("--brick-otp-size")) throw new Error("OTP Field CSS export missing");
if (!css.includes(".brick-password-toggle-field") || !css.includes("--brick-password-height")) throw new Error("Password Toggle Field CSS export missing");
if (!css.includes(".brick-show") || !css.includes(".brick-hide") || !css.includes("@media (width<48rem)") || !css.includes("@media (width>=48rem)")) throw new Error("Responsive visibility CSS export missing");
if (!css.includes(".brick-swipeable-item") || !css.includes("--brick-swipeable-item-background")) throw new Error("Swipeable Item CSS export missing");
`,
    );
    await writeFile(
      join(consumer, "verify.ts"),
	`import { createElement } from "react";
import { AlertDialog, AppBar, Avatar, Badge, BottomNavigation, Breadcrumb, Button, Card, Checkbox, CheckboxGroup, Chip, Container, ContextMenu, Drawer, DropdownMenu, Grid, Hide, HoverCard, IconButton, Input, Link, Menubar, NavigationMenu, NotificationBadge, NumberInput, OTPField, PasswordToggleField, Popover, RadioGroup, Show, Skeleton, Surface, SwipeableItem, Switch, Tabs, Text, Textarea, Toggle, ToggleGroup, VisuallyHidden, type AppBarRootProps, type AvatarProps, type BadgeProps, type BottomNavigationRootProps, type BreadcrumbRootProps, type ButtonProps, type CardRootProps, type CheckboxGroupRootProps, type CheckboxProps, type ChipRootProps, type ContainerProps, type ContextMenuRootProps, type DropdownMenuRootProps, type GridRootProps, type HideProps, type HoverCardContentProps, type IconButtonProps, type InputProps, type LinkProps, type MenubarRootProps, type NavigationMenuRootProps, type NotificationBadgeProps, type NumberInputRootProps, type OTPFieldRootProps, type PasswordToggleFieldRootProps, type PopoverContentProps, type RadioGroupRootProps, type ShowProps, type SkeletonProps, type SurfaceProps, type SwipeableItemRootProps, type SwitchRootProps, type TabsRootProps, type TextareaRootProps, type TextProps, type ToggleProps, type ToggleGroupRootProps, type VisuallyHiddenRootProps } from "@flowstack-ui/brick";
import { AlertDialog as SubpathAlertDialog, type AlertDialogContentProps } from "@flowstack-ui/brick/alert-dialog";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { IconButton as SubpathIconButton } from "@flowstack-ui/brick/icon-button";
import { AppBar as SubpathAppBar } from "@flowstack-ui/brick/app-bar";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import * as DrawerModule from "@flowstack-ui/brick/drawer";
import type { DrawerRootProps } from "@flowstack-ui/brick/drawer";
import { Container as SubpathContainer } from "@flowstack-ui/brick/container";
import { Surface as SubpathSurface } from "@flowstack-ui/brick/surface";
import { Chip as SubpathChip } from "@flowstack-ui/brick/chip";
import { Link as SubpathLink } from "@flowstack-ui/brick/link";
import { Textarea as SubpathTextarea } from "@flowstack-ui/brick/textarea";
import { RadioGroup as SubpathRadioGroup } from "@flowstack-ui/brick/radio-group";
import { Switch as SubpathSwitch } from "@flowstack-ui/brick/switch";
import { Breadcrumb as SubpathBreadcrumb } from "@flowstack-ui/brick/breadcrumb";
import { Tabs as SubpathTabs } from "@flowstack-ui/brick/tabs";
import { Skeleton as SubpathSkeleton } from "@flowstack-ui/brick/skeleton";
import { VisuallyHidden as SubpathVisuallyHidden } from "@flowstack-ui/brick/visually-hidden";
import { NumberInput as SubpathNumberInput } from "@flowstack-ui/brick/number-input";
import { OTPField as SubpathOTPField } from "@flowstack-ui/brick/otp-field";
import { PasswordToggleField as SubpathPasswordToggleField } from "@flowstack-ui/brick/password-toggle-field";
import { Show as SubpathShow } from "@flowstack-ui/brick/show";
import { Hide as SubpathHide } from "@flowstack-ui/brick/hide";
import { SwipeableItem as SubpathSwipeableItem } from "@flowstack-ui/brick/swipeable-item";
import * as NavigationMenuModule from "@flowstack-ui/brick/navigation-menu";
const props: ButtonProps = { children: "Consumer" };
const iconButtonProps: IconButtonProps = { "aria-label": "Search", children: createElement("svg"), href: "/search" };
const appBarProps: AppBarRootProps = { children: createElement(AppBar.Toolbar, null, "Workspace"), position: "sticky" };
const cardProps: CardRootProps = { as: "article", children: "Consumer" };
const drawerModuleProps: DrawerRootProps = { children: createElement(DrawerModule.Trigger, null, "Open navigation") };
const alertDialogProps: AlertDialogContentProps = { size: "sm", children: "Consumer" };
const badgeProps: BadgeProps = { children: "Published", tone: "success" };
const notificationBadgeProps: NotificationBadgeProps = { count: 4, children: createElement("button", null, "Inbox") };
const avatarProps: AvatarProps = { alt: "Ada Lovelace", fallback: "AL", status: "online" };
const toggleProps: ToggleProps = { children: "Favorite", pressed: true };
const toggleGroupProps: ToggleGroupRootProps = { children: createElement(ToggleGroup.Item, { value: "cards" }, "Cards"), value: "cards" };
const hoverCardProps: HoverCardContentProps = { children: "Preview", size: "md" };
const popoverProps: PopoverContentProps = { "aria-label": "Settings", children: "Controls", size: "md" };
const checkboxProps: CheckboxProps = { children: "Terms", defaultChecked: "indeterminate", size: "lg" };
const checkboxGroupProps: CheckboxGroupRootProps = { "aria-label": "Channels", allValues: ["email"], children: createElement(CheckboxGroup.Item, { value: "email" }, "Email") };
const radioGroupProps: RadioGroupRootProps = { "aria-label": "Channel", defaultValue: "email", readOnly: true, children: createElement(RadioGroup.Item, { value: "email", children: "Email" }) };
const switchProps: SwitchRootProps = { "aria-label": "Reports", defaultChecked: true, children: createElement(Switch.Thumb) };
const inputProps: InputProps = { "aria-label": "Search", clearable: true, startAdornment: "Search" };
const numberInputProps: NumberInputRootProps = { "aria-label": "Quantity", children: createElement(NumberInput.Input), defaultValue: 3 };
const otpProps: OTPFieldRootProps = { "aria-label": "Code", children: createElement(OTPField.Input), length: 4 };
const passwordProps: PasswordToggleFieldRootProps = { children: createElement(PasswordToggleField.Input), showLabel: "Reveal password" };
const textareaProps: TextareaRootProps = { "aria-label": "Notes", autoResize: true, maxRows: 8 };
const linkProps: LinkProps = { children: "Read guides", href: "/guides", tone: "neutral" };
const textProps: TextProps = { as: "h2", children: "Consumer", variant: "title-sm" };
const gridProps: GridRootProps = { columns: 2, gap: "2", children: createElement(Grid.Item, { columnSpan: "full" }, "Summary") };
const containerProps: ContainerProps = { as: "main", children: "Measured", gutter: "lg", measure: "max" };
const surfaceProps: SurfaceProps = { as: "section", bordered: true, children: "Painted", inset: "md", level: "subtle" };
const chipProps: ChipRootProps = { children: createElement(Chip.Label, null, "Riley Chen"), tone: "accent", variant: "outline" };
const breadcrumbProps: BreadcrumbRootProps = { ariaLabel: "Current path", children: createElement(Breadcrumb.List, null), size: "md", variant: "underline" };
const tabsProps: TabsRootProps = { defaultValue: "one", size: "md", variant: "soft", children: createElement(Tabs.List, { ariaLabel: "Sections" }) };
const skeletonProps: SkeletonProps = { animation: "wave", lines: 3, variant: "text" };
const dropdownProps: DropdownMenuRootProps = { children: createElement(DropdownMenu.Trigger, null, "Actions"), size: "md" };
const contextProps: ContextMenuRootProps = { children: createElement(ContextMenu.Trigger, null, "Region"), size: "md" };
const menubarProps: MenubarRootProps = { "aria-label": "Commands", children: createElement(Menubar.Menu, { children: createElement(Menubar.Trigger, null, "File"), value: "file" }), size: "md" };
const navigationProps: NavigationMenuRootProps = { "aria-label": "Primary", children: createElement(NavigationMenu.List), size: "md" };
const navigationModuleProps: NavigationMenuRootProps = { "aria-label": "Module primary", children: createElement(NavigationMenuModule.List), size: "md" };
const bottomNavigationProps: BottomNavigationRootProps = { ariaLabel: "Primary", children: createElement(BottomNavigation.Item, { value: "home" }, "Home"), safeArea: true };
const visuallyHiddenProps: VisuallyHiddenRootProps = { children: "Search" };
const showProps: ShowProps = { as: "aside", children: "Wide", from: "md" };
const hideProps: HideProps = { as: "aside", children: "Compact", from: "md" };
const swipeableProps: SwipeableItemRootProps = { children: createElement(SwipeableItem.Content, null, "Message"), variant: "outline" };
void AlertDialog;
void SubpathAlertDialog;
void Grid;
void gridProps;
void Container;
void SubpathContainer;
void containerProps;
void Surface;
void SubpathSurface;
void surfaceProps;
void Chip;
void SubpathChip;
void chipProps;
void Breadcrumb;
void SubpathBreadcrumb;
void breadcrumbProps;
void Tabs;
void SubpathTabs;
void tabsProps;
void Skeleton;
void SubpathSkeleton;
void skeletonProps;
void DropdownMenu; void dropdownProps;
void ContextMenu; void contextProps;
void Menubar; void menubarProps;
void NavigationMenu; void navigationProps; void NavigationMenuModule; void navigationModuleProps; void BottomNavigation; void bottomNavigationProps; void VisuallyHidden; void SubpathVisuallyHidden; void visuallyHiddenProps;
void Show; void SubpathShow; void showProps; void Hide; void SubpathHide; void hideProps;
void SwipeableItem; void SubpathSwipeableItem; void swipeableProps;
void Button;
void SubpathButton;
void IconButton;
void SubpathIconButton;
void iconButtonProps;
void AppBar;
void SubpathAppBar;
void appBarProps;
void Card;
void Drawer; void DrawerModule; void drawerModuleProps;
void SubpathCard;
void props;
void cardProps;
void alertDialogProps;
void Badge;
void NotificationBadge;
void badgeProps;
void notificationBadgeProps;
void Avatar;
void avatarProps;
void Toggle;
void ToggleGroup;
void toggleProps;
void toggleGroupProps;
void HoverCard;
void hoverCardProps;
void Popover;
void popoverProps;
void Checkbox;
void CheckboxGroup;
void checkboxProps;
void checkboxGroupProps;
void RadioGroup;
void SubpathRadioGroup;
void radioGroupProps;
void Switch;
void SubpathSwitch;
void switchProps;
void Input;
void inputProps;
void NumberInput; void SubpathNumberInput; void numberInputProps;
void OTPField; void SubpathOTPField; void otpProps;
void PasswordToggleField; void SubpathPasswordToggleField; void passwordProps;
void Textarea;
void SubpathTextarea;
void textareaProps;
void Link;
void SubpathLink;
void linkProps;
void Text;
void textProps;
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

    console.log(`Installing the packed artifact in the React ${reactMajor} consumer...`);
    run(
      "npm",
      [
        "install",
        "--ignore-scripts",
        "--save-exact",
        tarball,
        `@flowstack-ui/atom@${atomVersion}`,
        `react@${reactVersion}`,
        `react-dom@${reactVersion}`,
        `@types/react@${reactMajor}`,
        `@types/react-dom@${reactMajor}`,
        "typescript@5.9.3",
      ],
      consumer,
    );
    console.log(`Running the React ${reactMajor} runtime export and SSR smoke...`);
    run("node", ["verify.mjs"], consumer);
    console.log(`Type-checking the React ${reactMajor} public API consumer...`);
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
