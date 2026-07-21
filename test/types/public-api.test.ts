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
  AppBar,
  IconButton,
  type AppBarRootProps,
  type AppBarVariant,
  type IconButtonProps,
  type IconButtonShape,
} from "@flowstack-ui/brick";
import { AppBar as SubpathAppBar } from "@flowstack-ui/brick/app-bar";
import { IconButton as SubpathIconButton } from "@flowstack-ui/brick/icon-button";
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
import {
  Avatar,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
} from "@flowstack-ui/brick";
import { Avatar as SubpathAvatar } from "@flowstack-ui/brick/avatar";
import {
  Toggle,
  ToggleGroup,
  type ToggleProps,
  type ToggleShape,
  type ToggleSize,
  type ToggleVariant,
  type ToggleGroupRootProps,
} from "@flowstack-ui/brick";
import { Toggle as SubpathToggle } from "@flowstack-ui/brick/toggle";
import { ToggleGroup as SubpathToggleGroup } from "@flowstack-ui/brick/toggle-group";
import {
  Tooltip,
  type TooltipContentProps,
  type TooltipRootProps,
} from "@flowstack-ui/brick";
import { Tooltip as SubpathTooltip } from "@flowstack-ui/brick/tooltip";
import {
  HoverCard,
  type HoverCardContentProps,
  type HoverCardRootProps,
  type HoverCardSize,
} from "@flowstack-ui/brick";
import { HoverCard as SubpathHoverCard } from "@flowstack-ui/brick/hover-card";
import {
  Popover,
  type PopoverContentProps,
  type PopoverRootProps,
  type PopoverSize,
} from "@flowstack-ui/brick";
import { Popover as SubpathPopover } from "@flowstack-ui/brick/popover";

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

const tooltipRootProps: TooltipRootProps = {
  children: createElement(Tooltip.Trigger, null, "More information"),
  variant: "rich",
};
const tooltipContentProps: TooltipContentProps = {
  children: createElement(Tooltip.Description, null, "Supplemental description"),
  side: "bottom",
  sideOffset: 8,
};
void Tooltip;
void SubpathTooltip;
void tooltipRootProps;
void tooltipContentProps;

// @ts-expect-error Tooltip has no semantic tone API.
const invalidTooltipTone: TooltipRootProps = { children: "Invalid", tone: "danger" };
// @ts-expect-error Tooltip Content intentionally omits accessible-label overrides.
const invalidTooltipLabel: TooltipContentProps = { children: "Invalid", "aria-label": "Other meaning" };
// @ts-expect-error Tooltip is a namespace and not a callable component.
const invalidFlatTooltip = createElement(Tooltip, { content: "Invalid" });
void invalidTooltipTone;
void invalidTooltipLabel;
void invalidFlatTooltip;

const hoverCardSize: HoverCardSize = "lg";
const hoverCardRootProps: HoverCardRootProps = {
  children: createElement(HoverCard.Trigger, null, "Preview"),
  openDelay: 700,
};
const hoverCardContentProps: HoverCardContentProps = {
  children: "Profile preview",
  side: "bottom",
  sideOffset: 8,
  size: hoverCardSize,
};
void HoverCard;
void SubpathHoverCard;
void hoverCardRootProps;
void hoverCardContentProps;

// @ts-expect-error HoverCard sizes are a closed recipe set.
const invalidHoverCardSize: HoverCardContentProps = { children: "Invalid", size: "xl" };
// @ts-expect-error HoverCard Content intentionally omits accessible-label overrides.
const invalidHoverCardLabel: HoverCardContentProps = { children: "Invalid", ariaLabel: "Profile" };
// @ts-expect-error HoverCard Content intentionally omits native accessible-label overrides.
const invalidNativeHoverCardLabel: HoverCardContentProps = { children: "Invalid", "aria-label": "Profile" };
// @ts-expect-error HoverCard is a namespace and not a callable component.
const invalidFlatHoverCard = createElement(HoverCard, { content: "Invalid" });
void invalidHoverCardSize;
void invalidHoverCardLabel;
void invalidNativeHoverCardLabel;
void invalidFlatHoverCard;

const popoverSize: PopoverSize = "lg";
const popoverRootProps: PopoverRootProps = {
  children: createElement(Popover.Trigger, null, "Open settings"),
  closeOnEscape: true,
  modal: false,
};
const popoverContentProps: PopoverContentProps = {
  "aria-label": "Quick settings",
  children: createElement(Popover.Body, null, "Controls"),
  initialFocus: false,
  side: "bottom",
  sideOffset: 8,
  size: popoverSize,
};
void Popover;
void SubpathPopover;
void popoverRootProps;
void popoverContentProps;

// @ts-expect-error Popover sizes are a closed recipe set.
const invalidPopoverSize: PopoverContentProps = { children: "Invalid", size: "xl" };
// @ts-expect-error Brick Popover intentionally omits hover activation.
const invalidPopoverMode: PopoverRootProps = { children: "Invalid", triggerMode: "hover" };
// @ts-expect-error Brick Popover intentionally omits hover timing.
const invalidPopoverDelay: PopoverRootProps = { children: "Invalid", openDelay: 200 };
// @ts-expect-error Popover uses native ARIA and has no ariaLabel alias.
const invalidPopoverLabelAlias: PopoverContentProps = { children: "Invalid", ariaLabel: "Settings" };
// @ts-expect-error Popover is a namespace and not a callable component.
const invalidFlatPopover = createElement(Popover, { content: "Invalid" });
void invalidPopoverSize;
void invalidPopoverMode;
void invalidPopoverDelay;
void invalidPopoverLabelAlias;
void invalidFlatPopover;

const iconButtonShape: IconButtonShape = "circle";
const iconButtonProps: IconButtonProps = {
  "aria-label": "Open documentation",
  children: createElement("svg"),
  href: "/docs",
  shape: iconButtonShape,
  tone: "accent",
  variant: "soft",
};
const composedIconButton: IconButtonProps = {
  "aria-label": "Custom action",
  asChild: true,
  children: createElement("button", null, createElement("svg")),
};
void IconButton;
void SubpathIconButton;
void iconButtonProps;
void composedIconButton;

const appBarVariant: AppBarVariant = "transparent";
const appBarProps: AppBarRootProps = {
  blurred: true,
  children: createElement(AppBar.Toolbar, null, "Workspace"),
  position: "fixed",
  variant: appBarVariant,
};
void AppBar;
void SubpathAppBar;
void appBarProps;

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
// @ts-expect-error IconButton shapes are a closed recipe set.
const invalidIconButtonShape: IconButtonProps = { "aria-label": "Invalid", children: createElement("svg"), shape: "pill" };
// @ts-expect-error AppBar is a namespace and not a callable flat component.
const invalidFlatAppBar = createElement(AppBar, null, "Invalid");
// @ts-expect-error AppBar variants are a closed recipe set.
const invalidAppBarVariant: AppBarRootProps = { children: "Invalid", variant: "blur" };

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
void invalidIconButtonShape;
void invalidFlatAppBar;
void invalidAppBarVariant;
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

const avatarSize: AvatarSize = "xl";
const avatarShape: AvatarShape = "rounded";
const avatarStatus: AvatarStatus = "online";
const avatarProps: AvatarProps = {
  alt: "Ada Lovelace",
  fallback: "AL",
  shape: avatarShape,
  size: avatarSize,
  src: "/ada.png",
  status: avatarStatus,
};
const decorativeAvatarProps: AvatarProps = { alt: "", fallback: "AL" };
void Avatar;
void SubpathAvatar;
void avatarProps;
void decorativeAvatarProps;

// @ts-expect-error Avatar requires an explicit alt decision.
const missingAvatarAlt: AvatarProps = { fallback: "AL" };
// @ts-expect-error Avatar requires explicit fallback content.
const missingAvatarFallback: AvatarProps = { alt: "Ada Lovelace" };
// @ts-expect-error Avatar sizes are a closed recipe set.
const invalidAvatarSize: AvatarProps = { alt: "Ada", fallback: "A", size: "2xl" };
// @ts-expect-error Avatar shapes are a closed recipe set.
const invalidAvatarShape: AvatarProps = { alt: "Ada", fallback: "A", shape: "square" };
// @ts-expect-error Avatar statuses are concrete availability states.
const invalidAvatarStatus: AvatarProps = { alt: "Ada", fallback: "A", status: "success" };
// @ts-expect-error Avatar does not expose a free native color prop.
const invalidAvatarColor: AvatarProps = { alt: "Ada", fallback: "A", color: "red" };
// @ts-expect-error Avatar does not expose legacy nested badge configuration.
const invalidAvatarBadge: AvatarProps = { alt: "Ada", fallback: "A", badge: { count: 2 } };
// @ts-expect-error Avatar is a direct component without a Group namespace.
const invalidAvatarGroup = Avatar.Group;
void missingAvatarAlt;
void missingAvatarFallback;
void invalidAvatarSize;
void invalidAvatarShape;
void invalidAvatarStatus;
void invalidAvatarColor;
void invalidAvatarBadge;
void invalidAvatarGroup;

const toggleVariant: ToggleVariant = "solid";
const toggleSize: ToggleSize = "lg";
const toggleShape: ToggleShape = "pill";
const toggleProps: ToggleProps = {
  children: "Favorite",
  defaultPressed: true,
  shape: toggleShape,
  size: toggleSize,
  variant: toggleVariant,
};
const singleToggleGroup: ToggleGroupRootProps = {
  children: createElement(ToggleGroup.Item, { value: "cards" }, "Cards"),
  onValueChange: (value: string) => void value,
  type: "single",
  value: "cards",
};
const multipleToggleGroup: ToggleGroupRootProps = {
  children: createElement(ToggleGroup.Item, { value: "bold" }, "Bold"),
  onValueChange: (value: string[]) => void value,
  type: "multiple",
  value: ["bold"],
};
void Toggle;
void SubpathToggle;
void ToggleGroup;
void SubpathToggleGroup;
void toggleProps;
void singleToggleGroup;
void multipleToggleGroup;

// @ts-expect-error Toggle variants are a closed recipe set.
const invalidToggleVariant: ToggleProps = { children: "Invalid", variant: "raised" };
// @ts-expect-error Standalone Toggle intentionally omits Atom's value convenience.
const invalidToggleValue: ToggleProps = { children: "Invalid", value: "favorite" };
// @ts-expect-error Toggle exposes selected accent styling rather than semantic tones.
const invalidToggleTone: ToggleProps = { children: "Invalid", tone: "danger" };
// @ts-expect-error Multiple groups require an array value.
const invalidMultipleToggleGroup: ToggleGroupRootProps = { children: null, type: "multiple", value: "bold" };
// @ts-expect-error Group Item visual recipes are owned by Root.
const invalidToggleGroupItem = createElement(ToggleGroup.Item, { value: "bold", variant: "ghost" });
// @ts-expect-error ToggleGroup is a namespace and not a callable flat component.
const invalidFlatToggleGroup = createElement(ToggleGroup, null);
void invalidToggleVariant;
void invalidToggleValue;
void invalidToggleTone;
void invalidMultipleToggleGroup;
void invalidToggleGroupItem;
void invalidFlatToggleGroup;
