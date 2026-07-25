import { resolvePlaygroundEntry } from "./component-registry.js";
import {
  ButtonPage,
  buttonScenarios,
} from "../components/button/ButtonPage.js";
import {
  IconButtonPage,
  iconButtonScenarios,
} from "../components/icon-button/IconButtonPage.js";
import {
  AppBarPage,
  appBarScenarios,
} from "../components/app-bar/AppBarPage.js";
import { LinkPage, linkScenarios } from "../components/link/LinkPage.js";
import {
  CardPage,
  cardScenarios,
} from "../components/card/CardPage.js";
import {
  DialogPage,
  dialogScenarios,
} from "../components/dialog/DialogPage.js";
import {
  AlertDialogPage,
  alertDialogScenarios,
} from "../components/alert-dialog/AlertDialogPage.js";
import {
  DrawerPage,
  drawerScenarios,
} from "../components/drawer/DrawerPage.js";
import {
  BadgePage,
  badgeScenarios,
} from "../components/badge/BadgePage.js";
import {
  NotificationBadgePage,
  notificationBadgeScenarios,
} from "../components/notification-badge/NotificationBadgePage.js";
import {
  AvatarPage,
  avatarScenarios,
} from "../components/avatar/AvatarPage.js";
import {
  TogglePage,
  toggleScenarios,
} from "../components/toggle/TogglePage.js";
import {
  ToggleGroupPage,
  toggleGroupScenarios,
} from "../components/toggle-group/ToggleGroupPage.js";
import {
  TooltipPage,
  tooltipScenarios,
} from "../components/tooltip/TooltipPage.js";
import {
  HoverCardPage,
  hoverCardScenarios,
} from "../components/hover-card/HoverCardPage.js";
import { HoverCardDestinationPage } from "../components/hover-card/HoverCardDestinationPage.js";
import {
  PopoverPage,
  popoverScenarios,
} from "../components/popover/PopoverPage.js";
import { InputPage, inputScenarios } from "../components/input/InputPage.js";
import { TextPage, textScenarios } from "../components/text/TextPage.js";
import { StackPage, stackScenarios } from "../components/stack/StackPage.js";
import { GridPage, gridScenarios } from "../components/grid/GridPage.js";
import {
  ContainerPage,
  containerScenarios,
} from "../components/container/ContainerPage.js";
import {
  SurfacePage,
  surfaceScenarios,
} from "../components/surface/SurfacePage.js";
import {
  DividerPage,
  dividerScenarios,
} from "../components/divider/DividerPage.js";
import {
  ScrollAreaPage,
  scrollAreaScenarios,
} from "../components/scroll-area/ScrollAreaPage.js";
import { FormPage, formScenarios } from "../components/form/FormPage.js";
import { FieldPage, fieldScenarios } from "../components/field/FieldPage.js";
import {
  FieldsetPage,
  fieldsetScenarios,
} from "../components/fieldset/FieldsetPage.js";
import "../styles/surface-adoption.css";
import {
  CheckboxPage,
  checkboxScenarios,
} from "../components/checkbox/CheckboxPage.js";
import {
  CheckboxGroupPage,
  checkboxGroupScenarios,
} from "../components/checkbox-group/CheckboxGroupPage.js";
import { PlaygroundShell } from "../shell/PlaygroundShell.js";

export function PlaygroundApp() {
  const path = window.location.pathname;

  if (path === "/hover-card/destination") {
    return <HoverCardDestinationPage />;
  }

  const entry = resolvePlaygroundEntry(path === "/" ? "/button" : path);

  if (entry.id === "app-bar") {
    return (
      <PlaygroundShell entry={entry} scenarios={appBarScenarios}>
        <AppBarPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "link") {
    return (
      <PlaygroundShell entry={entry} scenarios={linkScenarios}>
        <LinkPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "icon-button") {
    return (
      <PlaygroundShell entry={entry} scenarios={iconButtonScenarios}>
        <IconButtonPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "card") {
    return (
      <PlaygroundShell entry={entry} scenarios={cardScenarios}>
        <CardPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "dialog") {
    return (
      <PlaygroundShell entry={entry} scenarios={dialogScenarios}>
        <DialogPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "alert-dialog") {
    return (
      <PlaygroundShell entry={entry} scenarios={alertDialogScenarios}>
        <AlertDialogPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "drawer") {
    return (
      <PlaygroundShell entry={entry} scenarios={drawerScenarios}>
        <DrawerPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "badge") {
    return (
      <PlaygroundShell entry={entry} scenarios={badgeScenarios}>
        <BadgePage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "notification-badge") {
    return (
      <PlaygroundShell entry={entry} scenarios={notificationBadgeScenarios}>
        <NotificationBadgePage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "avatar") {
    return (
      <PlaygroundShell entry={entry} scenarios={avatarScenarios}>
        <AvatarPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "toggle") {
    return (
      <PlaygroundShell entry={entry} scenarios={toggleScenarios}>
        <TogglePage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "toggle-group") {
    return (
      <PlaygroundShell entry={entry} scenarios={toggleGroupScenarios}>
        <ToggleGroupPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "tooltip") {
    return (
      <PlaygroundShell entry={entry} scenarios={tooltipScenarios}>
        <TooltipPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "hover-card") {
    return (
      <PlaygroundShell entry={entry} scenarios={hoverCardScenarios}>
        <HoverCardPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "popover") {
    return (
      <PlaygroundShell entry={entry} scenarios={popoverScenarios}>
        <PopoverPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "form") {
    return (
      <PlaygroundShell entry={entry} scenarios={formScenarios}>
        <FormPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "text") {
    return (
      <PlaygroundShell entry={entry} scenarios={textScenarios}>
        <TextPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "stack") {
    return (
      <PlaygroundShell entry={entry} scenarios={stackScenarios}>
        <StackPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "grid") {
    return (
      <PlaygroundShell entry={entry} scenarios={gridScenarios}>
        <GridPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "container") {
    return (
      <PlaygroundShell entry={entry} scenarios={containerScenarios}>
        <ContainerPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "surface") {
    return (
      <PlaygroundShell entry={entry} scenarios={surfaceScenarios}>
        <SurfacePage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "divider") {
    return (
      <PlaygroundShell entry={entry} scenarios={dividerScenarios}>
        <DividerPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "scroll-area") {
    return (
      <PlaygroundShell entry={entry} scenarios={scrollAreaScenarios}>
        <ScrollAreaPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "input") {
    return (
      <PlaygroundShell entry={entry} scenarios={inputScenarios}>
        <InputPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "field") {
    return (
      <PlaygroundShell entry={entry} scenarios={fieldScenarios}>
        <FieldPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "fieldset") {
    return (
      <PlaygroundShell entry={entry} scenarios={fieldsetScenarios}>
        <FieldsetPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "checkbox") {
    return (
      <PlaygroundShell entry={entry} scenarios={checkboxScenarios}>
        <CheckboxPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "checkbox-group") {
    return (
      <PlaygroundShell entry={entry} scenarios={checkboxGroupScenarios}>
        <CheckboxGroupPage />
      </PlaygroundShell>
    );
  }

  return (
    <PlaygroundShell entry={entry} scenarios={buttonScenarios}>
      <ButtonPage />
    </PlaygroundShell>
  );
}
