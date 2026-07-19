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
      `import { AlertDialog, Avatar, Badge, Button, Card, NotificationBadge, Toggle, ToggleGroup } from "@flowstack-ui/brick";
import { AlertDialog as SubpathAlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import { Badge as SubpathBadge, NotificationBadge as SubpathNotificationBadge } from "@flowstack-ui/brick/badge";
import { Avatar as SubpathAvatar } from "@flowstack-ui/brick/avatar";
import { Toggle as SubpathToggle } from "@flowstack-ui/brick/toggle";
import { ToggleGroup as SubpathToggleGroup } from "@flowstack-ui/brick/toggle-group";
import React from "react";
import { renderToString } from "react-dom/server";
import { readFile } from "node:fs/promises";

if (Button !== SubpathButton) throw new Error("Button subpath export mismatch");
if (Card !== SubpathCard) throw new Error("Card subpath export mismatch");
if (AlertDialog !== SubpathAlertDialog) throw new Error("AlertDialog subpath export mismatch");
if (Badge !== SubpathBadge || NotificationBadge !== SubpathNotificationBadge) throw new Error("Badge subpath export mismatch");
if (Avatar !== SubpathAvatar) throw new Error("Avatar subpath export mismatch");
if (Toggle !== SubpathToggle) throw new Error("Toggle subpath export mismatch");
if (ToggleGroup !== SubpathToggleGroup) throw new Error("ToggleGroup subpath export mismatch");
const markup = renderToString(React.createElement(Button, null, "Brick consumer"));
if (!markup.includes("brick-button") || !markup.includes("Brick consumer")) throw new Error("Button SSR smoke failed");
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
const css = await readFile(new URL("./node_modules/@flowstack-ui/brick/dist/styles.css", import.meta.url), "utf8");
if (!css.includes("--brick-color-accent-solid") || !css.includes(".brick-card") || !css.includes(".brick-alert-dialog-content") || !css.includes(".brick-badge") || !css.includes(".brick-avatar") || !css.includes(".brick-toggle") || !css.includes(".brick-toggle-group")) throw new Error("CSS export missing");
`,
    );
    await writeFile(
      join(consumer, "verify.ts"),
      `import { createElement } from "react";
import { AlertDialog, Avatar, Badge, Button, Card, NotificationBadge, Toggle, ToggleGroup, type AvatarProps, type BadgeProps, type ButtonProps, type CardRootProps, type NotificationBadgeProps, type ToggleProps, type ToggleGroupRootProps } from "@flowstack-ui/brick";
import { AlertDialog as SubpathAlertDialog, type AlertDialogContentProps } from "@flowstack-ui/brick/alert-dialog";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
const props: ButtonProps = { children: "Consumer" };
const cardProps: CardRootProps = { as: "article", children: "Consumer" };
const alertDialogProps: AlertDialogContentProps = { size: "sm", children: "Consumer" };
const badgeProps: BadgeProps = { children: "Published", tone: "success" };
const notificationBadgeProps: NotificationBadgeProps = { count: 4, children: createElement("button", null, "Inbox") };
const avatarProps: AvatarProps = { alt: "Ada Lovelace", fallback: "AL", status: "online" };
const toggleProps: ToggleProps = { children: "Favorite", pressed: true };
const toggleGroupProps: ToggleGroupRootProps = { children: createElement(ToggleGroup.Item, { value: "cards" }, "Cards"), value: "cards" };
void AlertDialog;
void SubpathAlertDialog;
void Button;
void SubpathButton;
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
        "@flowstack-ui/atom@0.3.3",
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
