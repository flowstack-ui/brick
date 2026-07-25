import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const packageRoot = resolve(".");
const packageJson = JSON.parse(
  await readFile(join(packageRoot, "package.json"), "utf8"),
);
const atomVersion = packageJson.dependencies["@flowstack-ui/atom"];
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
      `import { AlertDialog, AppBar, Avatar, Badge, Button, Card, Checkbox, CheckboxGroup, Container, Grid, HoverCard, IconButton, Input, Link, NotificationBadge, Popover, Surface, Text, Toggle, ToggleGroup } from "@flowstack-ui/brick";
import { AlertDialog as SubpathAlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { IconButton as SubpathIconButton } from "@flowstack-ui/brick/icon-button";
import { AppBar as SubpathAppBar } from "@flowstack-ui/brick/app-bar";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import { Badge as SubpathBadge, NotificationBadge as SubpathNotificationBadge } from "@flowstack-ui/brick/badge";
import { Avatar as SubpathAvatar } from "@flowstack-ui/brick/avatar";
import { Toggle as SubpathToggle } from "@flowstack-ui/brick/toggle";
import { ToggleGroup as SubpathToggleGroup } from "@flowstack-ui/brick/toggle-group";
import { Tooltip as SubpathTooltip } from "@flowstack-ui/brick/tooltip";
import { HoverCard as SubpathHoverCard } from "@flowstack-ui/brick/hover-card";
import { Popover as SubpathPopover } from "@flowstack-ui/brick/popover";
import { Checkbox as SubpathCheckbox } from "@flowstack-ui/brick/checkbox";
import { CheckboxGroup as SubpathCheckboxGroup } from "@flowstack-ui/brick/checkbox-group";
import { Input as SubpathInput } from "@flowstack-ui/brick/input";
import { Link as SubpathLink } from "@flowstack-ui/brick/link";
import { Text as SubpathText } from "@flowstack-ui/brick/text";
import { Grid as SubpathGrid } from "@flowstack-ui/brick/grid";
import { Container as SubpathContainer } from "@flowstack-ui/brick/container";
import { Surface as SubpathSurface } from "@flowstack-ui/brick/surface";
import React from "react";
import { renderToString } from "react-dom/server";
import { readFile } from "node:fs/promises";

if (Button !== SubpathButton) throw new Error("Button subpath export mismatch");
if (IconButton !== SubpathIconButton) throw new Error("IconButton subpath export mismatch");
if (AppBar !== SubpathAppBar) throw new Error("AppBar subpath export mismatch");
if (Card !== SubpathCard) throw new Error("Card subpath export mismatch");
if (AlertDialog !== SubpathAlertDialog) throw new Error("AlertDialog subpath export mismatch");
if (Badge !== SubpathBadge || NotificationBadge !== SubpathNotificationBadge) throw new Error("Badge subpath export mismatch");
if (Avatar !== SubpathAvatar) throw new Error("Avatar subpath export mismatch");
if (Toggle !== SubpathToggle) throw new Error("Toggle subpath export mismatch");
if (ToggleGroup !== SubpathToggleGroup) throw new Error("ToggleGroup subpath export mismatch");
if (HoverCard !== SubpathHoverCard || Object.keys(SubpathHoverCard).length !== 5) throw new Error("HoverCard subpath smoke failed");
if (Popover !== SubpathPopover || Object.keys(SubpathPopover).length !== 12) throw new Error("Popover subpath smoke failed");
if (Checkbox !== SubpathCheckbox) throw new Error("Checkbox subpath export mismatch");
if (CheckboxGroup !== SubpathCheckboxGroup || Object.keys(SubpathCheckboxGroup).length !== 5) throw new Error("CheckboxGroup subpath smoke failed");
if (Input !== SubpathInput) throw new Error("Input subpath export mismatch");
if (Link !== SubpathLink) throw new Error("Link subpath export mismatch");
if (Text !== SubpathText) throw new Error("Text subpath export mismatch");
if (Grid !== SubpathGrid || Object.keys(SubpathGrid).length !== 2) throw new Error("Grid subpath smoke failed");
if (Container !== SubpathContainer) throw new Error("Container subpath export mismatch");
if (Surface !== SubpathSurface) throw new Error("Surface subpath export mismatch");
const markup = renderToString(React.createElement(Button, null, "Brick consumer"));
if (!markup.includes("brick-button") || !markup.includes("Brick consumer")) throw new Error("Button SSR smoke failed");
const iconButtonMarkup = renderToString(React.createElement(IconButton, { "aria-label": "Search" }, React.createElement("svg")));
if (!iconButtonMarkup.includes("brick-icon-button") || !iconButtonMarkup.includes('aria-label="Search"')) throw new Error("IconButton SSR smoke failed");
const appBarMarkup = renderToString(React.createElement(AppBar.Root, { position: "sticky" }, React.createElement(AppBar.Toolbar, null, "Workspace")));
if (!appBarMarkup.includes("brick-app-bar") || !appBarMarkup.includes('data-position="sticky"')) throw new Error("AppBar SSR smoke failed");
const cardMarkup = renderToString(React.createElement(Card.Root, { as: "article" }, React.createElement(Card.Title, { as: "h1" }, "Card consumer")));
if (!cardMarkup.includes("brick-card") || !cardMarkup.includes("Card consumer")) throw new Error("Card SSR smoke failed");
const badgeMarkup = renderToString(React.createElement(Badge, { tone: "success" }, "Published"));
if (!badgeMarkup.includes("brick-badge") || !badgeMarkup.includes("Published")) throw new Error("Badge SSR smoke failed");
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
const inputMarkup = renderToString(React.createElement(Input, { "aria-label": "Search", defaultValue: "Brick", clearable: true }));
if (!inputMarkup.includes("brick-input") || !inputMarkup.includes('aria-label="Clear input"')) throw new Error("Input SSR smoke failed");
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
if (!SubpathTooltip || Object.keys(SubpathTooltip).length !== 8) throw new Error("Tooltip subpath smoke failed");
const css = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles.css", import.meta.url), "utf8");
if (!css.includes("--brick-color-accent-solid") || !css.includes(".brick-icon-button") || !css.includes(".brick-app-bar") || !css.includes(".brick-card") || !css.includes(".brick-alert-dialog-content") || !css.includes(".brick-badge") || !css.includes(".brick-avatar") || !css.includes(".brick-toggle") || !css.includes(".brick-toggle-group") || !css.includes(".brick-tooltip") || !css.includes(".brick-hover-card") || !css.includes(".brick-popover") || !css.includes(".brick-checkbox") || !css.includes(".brick-checkbox-group") || !css.includes(".brick-input") || !css.includes(".brick-link") || !css.includes(".brick-text") || !css.includes(".brick-grid") || !css.includes(".brick-container") || !css.includes(".brick-surface")) throw new Error("CSS export missing");
`,
    );
    await writeFile(
      join(consumer, "verify.ts"),
	`import { createElement } from "react";
import { AlertDialog, AppBar, Avatar, Badge, Button, Card, Checkbox, CheckboxGroup, Container, Grid, HoverCard, IconButton, Input, Link, NotificationBadge, Popover, Surface, Text, Toggle, ToggleGroup, type AppBarRootProps, type AvatarProps, type BadgeProps, type ButtonProps, type CardRootProps, type CheckboxGroupRootProps, type CheckboxProps, type ContainerProps, type GridRootProps, type HoverCardContentProps, type IconButtonProps, type InputProps, type LinkProps, type NotificationBadgeProps, type PopoverContentProps, type SurfaceProps, type TextProps, type ToggleProps, type ToggleGroupRootProps } from "@flowstack-ui/brick";
import { AlertDialog as SubpathAlertDialog, type AlertDialogContentProps } from "@flowstack-ui/brick/alert-dialog";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { IconButton as SubpathIconButton } from "@flowstack-ui/brick/icon-button";
import { AppBar as SubpathAppBar } from "@flowstack-ui/brick/app-bar";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import { Container as SubpathContainer } from "@flowstack-ui/brick/container";
import { Surface as SubpathSurface } from "@flowstack-ui/brick/surface";
import { Link as SubpathLink } from "@flowstack-ui/brick/link";
const props: ButtonProps = { children: "Consumer" };
const iconButtonProps: IconButtonProps = { "aria-label": "Search", children: createElement("svg"), href: "/search" };
const appBarProps: AppBarRootProps = { children: createElement(AppBar.Toolbar, null, "Workspace"), position: "sticky" };
const cardProps: CardRootProps = { as: "article", children: "Consumer" };
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
const inputProps: InputProps = { "aria-label": "Search", clearable: true, startAdornment: "Search" };
const linkProps: LinkProps = { children: "Read guides", href: "/guides", tone: "neutral" };
const textProps: TextProps = { as: "h2", children: "Consumer", variant: "title-sm" };
const gridProps: GridRootProps = { columns: 2, gap: "2", children: createElement(Grid.Item, { columnSpan: "full" }, "Summary") };
const containerProps: ContainerProps = { as: "main", children: "Measured", gutter: "lg", measure: "max" };
const surfaceProps: SurfaceProps = { as: "section", bordered: true, children: "Painted", inset: "md", level: "subtle" };
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
void Button;
void SubpathButton;
void IconButton;
void SubpathIconButton;
void iconButtonProps;
void AppBar;
void SubpathAppBar;
void appBarProps;
void Card;
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
void Input;
void inputProps;
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
