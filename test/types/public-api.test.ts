import { createElement } from "react";
import {
  Button,
  type ButtonProps,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "@flowstack-ui/brick";
import { Button as SubpathButton } from "@flowstack-ui/brick/button";
import {
  Card,
  type CardRootProps,
  type CardSize,
  type CardTitleElement,
  type CardVariant,
} from "@flowstack-ui/brick";
import { Card as SubpathCard } from "@flowstack-ui/brick/card";
import { Dialog, type DialogSize } from "@flowstack-ui/brick";
import {
  Dialog as SubpathDialog,
  DialogContent,
  type DialogContentProps,
} from "@flowstack-ui/brick/dialog";
import { AlertDialog, type AlertDialogSize } from "@flowstack-ui/brick";
import {
  AlertDialog as SubpathAlertDialog,
  AlertDialogContent,
  type AlertDialogContentProps,
  type AlertDialogOverlayProps,
  type AlertDialogRootProps,
} from "@flowstack-ui/brick/alert-dialog";
import { Drawer, type DrawerPlacement, type DrawerSize } from "@flowstack-ui/brick";
import {
  Drawer as SubpathDrawer,
  DrawerContent,
  type DrawerContentProps,
  type DrawerRootProps,
} from "@flowstack-ui/brick/drawer";
import {
  Badge,
  NotificationBadge,
  type BadgeProps,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
  type NotificationBadgeOverlap,
  type NotificationBadgePlacement,
  type NotificationBadgeProps,
  type NotificationBadgeSize,
} from "@flowstack-ui/brick";
import {
  Badge as SubpathBadge,
  NotificationBadge as SubpathNotificationBadge,
} from "@flowstack-ui/brick/badge";

const variant: ButtonVariant = "soft";
const tone: ButtonTone = "success";
const size: ButtonSize = "xl";
const shape: ButtonShape = "pill";
const props: ButtonProps = {
  children: "Save",
  endIcon: createElement("svg"),
  fullWidth: true,
  shape,
  size,
  tone,
  variant,
};
const composed: ButtonProps = {
  asChild: true,
  children: createElement("a", { href: "/account" }, "Account"),
};
const rendered: ButtonProps = {
  children: "Router",
  render: createElement("a", { href: "/router" }),
};

void Button;
void SubpathButton;
void props;
void composed;
void rendered;

const cardVariant: CardVariant = "elevated";
const cardSize: CardSize = "lg";
const cardTitleElement: CardTitleElement = "h1";
const cardProps: CardRootProps = {
  as: "article",
  children: createElement(Card.Content, null, "Report"),
  size: cardSize,
  variant: cardVariant,
};

void Card;
void SubpathCard;
void cardTitleElement;
void cardProps;

const dialogSize: DialogSize = "lg";
const dialogContentProps: DialogContentProps = {
  "aria-label": "Settings",
  children: createElement(Dialog.Body, null, "Settings form"),
  size: dialogSize,
};
void Dialog;
void SubpathDialog;
void DialogContent;
void dialogContentProps;

const alertDialogSize: AlertDialogSize = "sm";
const alertDialogRootProps: AlertDialogRootProps = {
  children: createElement(AlertDialog.Trigger, null, "Open decision"),
  closeOnEscape: false,
};
const alertDialogContentProps: AlertDialogContentProps = {
  children: createElement(
    AlertDialog.Description,
    null,
    "This action cannot be undone.",
  ),
  size: alertDialogSize,
};
const alertDialogOverlayProps: AlertDialogOverlayProps = {
  "aria-label": "Decision backdrop",
};
void AlertDialog;
void SubpathAlertDialog;
void AlertDialogContent;
void alertDialogRootProps;
void alertDialogContentProps;
void alertDialogOverlayProps;

// @ts-expect-error Brick exposes semantic tone instead of the native color attribute.
const nativeColor: ButtonProps = { children: "Invalid", color: "red" };
// @ts-expect-error asChild owns its content and does not accept icon props.
const composedIcon: ButtonProps = {
  asChild: true,
  children: createElement("a", null, "Invalid"),
  startIcon: createElement("svg"),
};
// @ts-expect-error asChild and render are mutually exclusive.
const doubleComposition: ButtonProps = {
  asChild: true,
  children: createElement("a", null, "Invalid"),
  render: createElement("button"),
};
// @ts-expect-error Button variants are a closed recipe set.
const invalidVariant: ButtonProps = { children: "Invalid", variant: "link" };

// @ts-expect-error Card variants are a closed recipe set.
const invalidCardVariant: CardRootProps = { children: "Invalid", variant: "ghost" };
// @ts-expect-error Card Root exposes only approved semantic containers.
const invalidCardElement: CardRootProps = { as: "main", children: "Invalid" };
// @ts-expect-error Card is a namespace and not a callable flat component.
const invalidFlatCard = createElement(Card, null, "Invalid");
// @ts-expect-error Card Title exposes heading elements only.
const invalidCardTitle = createElement(Card.Title, { as: "div" }, "Invalid");
// @ts-expect-error Dialog sizes are a closed recipe set.
const invalidDialogSize: DialogContentProps = { "aria-label": "Invalid", size: "full" };
// @ts-expect-error Dialog is a namespace and not a callable flat component.
const invalidFlatDialog = createElement(Dialog, { title: "Invalid" });
const invalidAlertDialogSize: AlertDialogContentProps = {
  children: "Invalid",
  // @ts-expect-error AlertDialog sizes are a closed recipe set.
  size: "lg",
};
// @ts-expect-error AlertDialog is a namespace and not a callable flat component.
const invalidFlatAlertDialog = createElement(AlertDialog, {
  title: "Invalid",
  description: "Invalid",
});
const invalidAlertDialogBackdrop: AlertDialogRootProps = {
  children: "Invalid",
  // @ts-expect-error AlertDialog backdrop dismissal is permanently disabled.
  closeOnBackdropClick: true,
};
// @ts-expect-error AlertDialog Overlay has no redundant disabled control.
const invalidAlertDialogOverlay: AlertDialogOverlayProps = { disabled: true };

void nativeColor;
void composedIcon;
void doubleComposition;
void invalidVariant;
void invalidCardVariant;
void invalidCardElement;
void invalidFlatCard;
void invalidCardTitle;
void invalidDialogSize;
void invalidFlatDialog;
void invalidAlertDialogSize;
void invalidFlatAlertDialog;
void invalidAlertDialogBackdrop;
void invalidAlertDialogOverlay;

const drawerPlacement: DrawerPlacement = "start";
const drawerSize: DrawerSize = "full";
const drawerRootProps: DrawerRootProps = {
  children: createElement(Drawer.Trigger, null, "Open drawer"),
  closeOnBackdropClick: false,
};
const drawerContentProps: DrawerContentProps = {
  "aria-label": "Filters",
  children: createElement(Drawer.Body, null, "Filter controls"),
  placement: drawerPlacement,
  size: drawerSize,
};
void Drawer;
void SubpathDrawer;
void DrawerContent;
void drawerRootProps;
void drawerContentProps;

const invalidDrawerPlacement: DrawerContentProps = {
  "aria-label": "Invalid",
  children: "Invalid",
  // @ts-expect-error Drawer placement uses logical edges.
  placement: "left",
};
const invalidDrawerSize: DrawerContentProps = {
  "aria-label": "Invalid",
  children: "Invalid",
  // @ts-expect-error Drawer sizes are a closed recipe set.
  size: "xl",
};
// @ts-expect-error Drawer is a namespace and not a callable flat component.
const invalidFlatDrawer = createElement(Drawer, { title: "Invalid" });
void invalidDrawerPlacement;
void invalidDrawerSize;
void invalidFlatDrawer;

const badgeVariant: BadgeVariant = "outline";
const badgeTone: BadgeTone = "warning";
const badgeSize: BadgeSize = "lg";
const badgeShape: BadgeShape = "pill";
const badgeProps: BadgeProps = {
  children: "Pending",
  shape: badgeShape,
  size: badgeSize,
  tone: badgeTone,
  variant: badgeVariant,
};
const notificationPlacement: NotificationBadgePlacement = "bottom-start";
const notificationOverlap: NotificationBadgeOverlap = "circular";
const notificationSize: NotificationBadgeSize = "sm";
const notificationCountProps: NotificationBadgeProps = {
  children: createElement("button", { "aria-label": "Tasks, 4 ready" }, "Tasks"),
  count: 4,
  overlap: notificationOverlap,
  placement: notificationPlacement,
  size: notificationSize,
};
const notificationDotProps: NotificationBadgeProps = {
  children: createElement("span", null, "Avatar"),
  dot: true,
};
void Badge;
void SubpathBadge;
void NotificationBadge;
void SubpathNotificationBadge;
void badgeProps;
void notificationCountProps;
void notificationDotProps;

// @ts-expect-error Badge variants are a closed recipe set.
const invalidBadgeVariant: BadgeProps = { children: "Invalid", variant: "ghost" };
// @ts-expect-error Badge exposes semantic tone instead of native color.
const invalidBadgeColor: BadgeProps = { children: "Invalid", color: "red" };
// @ts-expect-error NotificationBadge count and dot modes are mutually exclusive.
const invalidNotificationModes: NotificationBadgeProps = {
  children: createElement("span"),
  count: 4,
  dot: true,
};
// @ts-expect-error NotificationBadge requires one React element anchor.
const invalidNotificationChild: NotificationBadgeProps = { children: "Inbox", count: 4 };
const invalidNotificationAsChild: NotificationBadgeProps = {
  // @ts-expect-error NotificationBadge keeps its stable positioning wrapper.
  asChild: true,
  children: createElement("span"),
  count: 4,
};
void invalidBadgeVariant;
void invalidBadgeColor;
void invalidNotificationModes;
void invalidNotificationChild;
void invalidNotificationAsChild;
