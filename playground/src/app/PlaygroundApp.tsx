import { useEffect, useState } from "react";
import {
  playgroundEntries,
  resolvePlaygroundEntry,
} from "./component-registry.js";
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
import { NavListPage, navListScenarios } from "../components/nav-list/NavListPage.js";
import { SidebarPage, sidebarScenarios } from "../components/sidebar/SidebarPage.js";
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
import { NumberInputPage, numberInputScenarios } from "../components/number-input/NumberInputPage.js";
import { OTPFieldPage, otpFieldScenarios } from "../components/otp-field/OTPFieldPage.js";
import { PasswordToggleFieldPage, passwordToggleFieldScenarios } from "../components/password-toggle-field/PasswordToggleFieldPage.js";
import { TextareaPage, textareaScenarios } from "../components/textarea/TextareaPage.js";
import { SelectPage, selectScenarios } from "../components/select/SelectPage.js";
import { ComboboxPage, comboboxScenarios } from "../components/combobox/ComboboxPage.js";
import { MultiSelectPage, multiSelectScenarios } from "../components/multi-select/MultiSelectPage.js";
import { TextPage, textScenarios } from "../components/text/TextPage.js";
import { ChipPage, chipScenarios } from "../components/chip/ChipPage.js";
import { IconPage, iconScenarios } from "../components/icon/IconPage.js";
import { ImagePage, imageScenarios } from "../components/image/ImagePage.js";
import { ListPage, listScenarios } from "../components/list/ListPage.js";
import { ReorderableListPage, reorderableListScenarios } from "../components/reorderable-list/ReorderableListPage.js";
import { TablePage, tableScenarios } from "../components/table/TablePage.js";
import { DataGridPage, dataGridScenarios } from "../components/data-grid/DataGridPage.js";
import { TreeGridPage, treeGridScenarios } from "../components/tree-grid/TreeGridPage.js";
import { AspectRatioPage, aspectRatioScenarios } from "../components/aspect-ratio/AspectRatioPage.js";
import { TreePage, treeScenarios } from "../components/tree/TreePage.js";
import { FeedPage, feedScenarios } from "../components/feed/FeedPage.js";
import { SwipeableItemPage, swipeableItemScenarios } from "../components/swipeable-item/SwipeableItemPage.js";
import { ToolbarPage, toolbarScenarios } from "../components/toolbar/ToolbarPage.js";
import { PaginationPage, paginationScenarios } from "../components/pagination/PaginationPage.js";
import { CarouselPage, carouselScenarios } from "../components/carousel/CarouselPage.js";
import { CodePage, codeScenarios } from "../components/code/CodePage.js";
import { CodeBlockPage, codeBlockScenarios } from "../components/code-block/CodeBlockPage.js";
import { StackPage, stackScenarios } from "../components/stack/StackPage.js";
import { ZStackPage, zStackScenarios } from "../components/z-stack/ZStackPage.js";
import { GridPage, gridScenarios } from "../components/grid/GridPage.js";
import {
  ContainerPage,
  containerScenarios,
} from "../components/container/ContainerPage.js";
import {
  SectionPage,
  sectionScenarios,
} from "../components/section/SectionPage.js";
import { FramePage, frameScenarios } from "../components/frame/FramePage.js";
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
import "../styles/code-adoption.css";
import {
  CheckboxPage,
  checkboxScenarios,
} from "../components/checkbox/CheckboxPage.js";
import {
  CheckboxGroupPage,
  checkboxGroupScenarios,
} from "../components/checkbox-group/CheckboxGroupPage.js";
import {
  RadioGroupPage,
  radioGroupScenarios,
} from "../components/radio-group/RadioGroupPage.js";
import { SwitchPage, switchScenarios } from "../components/switch/SwitchPage.js";
import { BreadcrumbPage, breadcrumbScenarios } from "../components/breadcrumb/BreadcrumbPage.js";
import { TabsPage, tabsScenarios } from "../components/tabs/TabsPage.js";
import { DropdownMenuPage, dropdownMenuScenarios } from "../components/dropdown-menu/DropdownMenuPage.js";
import { ContextMenuPage, contextMenuScenarios } from "../components/context-menu/ContextMenuPage.js";
import { MenubarPage, menubarScenarios } from "../components/menubar/MenubarPage.js";
import { NavigationMenuPage, navigationMenuScenarios } from "../components/navigation-menu/NavigationMenuPage.js";
import { BottomNavigationPage, bottomNavigationScenarios } from "../components/bottom-navigation/BottomNavigationPage.js";
import { VisuallyHiddenPage, visuallyHiddenScenarios } from "../components/visually-hidden/VisuallyHiddenPage.js";
import { SkipLinkFixturePage, SkipLinkPage, skipLinkScenarios } from "../components/skip-link/SkipLinkPage.js";
import { SkeletonPage, skeletonScenarios } from "../components/skeleton/SkeletonPage.js";
import { ProgressPage, progressScenarios } from "../components/progress/ProgressPage.js";
import { ProgressCirclePage, progressCircleScenarios } from "../components/progress-circle/ProgressCirclePage.js";
import { SliderPage, sliderScenarios } from "../components/slider/SliderPage.js";
import { RatingPage, ratingScenarios } from "../components/rating/RatingPage.js";
import { FileUploadPage, fileUploadScenarios } from "../components/file-upload/FileUploadPage.js";
import { ToastPage, toastScenarios } from "../components/toast/ToastPage.js";
import { CollapsiblePage, collapsibleScenarios } from "../components/collapsible/CollapsiblePage.js";
import { AccordionPage, accordionScenarios } from "../components/accordion/AccordionPage.js";
import { ShowPage, showScenarios } from "../components/show/ShowPage.js";
import { HidePage, hideScenarios } from "../components/hide/HidePage.js";
import { AppearancePage, appearanceScenarios } from "../components/appearance/AppearancePage.js";
import { PlaygroundShell } from "../shell/PlaygroundShell.js";

const playgroundRoutes = new Set(playgroundEntries.map((entry) => entry.route));

function usePlaygroundPath() {
  const [locationKey, setLocationKey] = useState(
    () => `${window.location.pathname}${window.location.search}${window.location.hash}`,
  );

  useEffect(() => {
    const syncLocation = () => {
      setLocationKey(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      );
    };
    const navigateInPlayground = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (
        !destination.searchParams.has("theme")
        && new URLSearchParams(window.location.search).get("theme") === "qualification"
      ) {
        destination.searchParams.set("theme", "qualification");
      }
      if (
        destination.origin !== window.location.origin ||
        !playgroundRoutes.has(destination.pathname) ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      event.preventDefault();
      window.history.pushState(
        null,
        "",
        `${destination.pathname}${destination.search}${destination.hash}`,
      );
      syncLocation();
      window.scrollTo({ left: 0, top: 0 });
    };

    document.addEventListener("click", navigateInPlayground);
    window.addEventListener("popstate", syncLocation);
    return () => {
      document.removeEventListener("click", navigateInPlayground);
      window.removeEventListener("popstate", syncLocation);
    };
  }, []);

  return new URL(locationKey, window.location.origin).pathname;
}

export function PlaygroundApp() {
  const path = usePlaygroundPath();

  if (path === "/skip-link/fixture") {
    return <SkipLinkFixturePage />;
  }

  if (path === "/hover-card/destination") {
    return <HoverCardDestinationPage />;
  }

  const entry = resolvePlaygroundEntry(path === "/" ? "/button" : path);

  if (entry.id === "show") return <PlaygroundShell entry={entry} scenarios={showScenarios}><ShowPage /></PlaygroundShell>;
  if (entry.id === "hide") return <PlaygroundShell entry={entry} scenarios={hideScenarios}><HidePage /></PlaygroundShell>;
  if (entry.id === "appearance") return <PlaygroundShell entry={entry} scenarios={appearanceScenarios}><AppearancePage /></PlaygroundShell>;

  if (entry.id === "visually-hidden") {
    return <PlaygroundShell entry={entry} scenarios={visuallyHiddenScenarios}><VisuallyHiddenPage /></PlaygroundShell>;
  }

  if (entry.id === "skip-link") {
    return <PlaygroundShell entry={entry} scenarios={skipLinkScenarios} skipLink={{ href: "#skip-link-playground-main", label: "Skip Brick playground navigation", targetId: "skip-link-playground-main" }}><SkipLinkPage /></PlaygroundShell>;
  }

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

  if (entry.id === "nav-list") {
    return (
      <PlaygroundShell entry={entry} scenarios={navListScenarios}>
        <NavListPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "sidebar") {
    return <PlaygroundShell entry={entry} scenarios={sidebarScenarios}><SidebarPage /></PlaygroundShell>;
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

  if (entry.id === "chip") {
    return <PlaygroundShell entry={entry} scenarios={chipScenarios}><ChipPage /></PlaygroundShell>;
  }

  if (entry.id === "icon") {
    return <PlaygroundShell entry={entry} scenarios={iconScenarios}><IconPage /></PlaygroundShell>;
  }

  if (entry.id === "image") {
    return <PlaygroundShell entry={entry} scenarios={imageScenarios}><ImagePage /></PlaygroundShell>;
  }

  if (entry.id === "list") {
    return <PlaygroundShell entry={entry} scenarios={listScenarios}><ListPage /></PlaygroundShell>;
  }

  if (entry.id === "reorderable-list") {
    return <PlaygroundShell entry={entry} scenarios={reorderableListScenarios}><ReorderableListPage /></PlaygroundShell>;
  }

  if (entry.id === "table") {
    return <PlaygroundShell entry={entry} scenarios={tableScenarios}><TablePage /></PlaygroundShell>;
  }
  if (entry.id === "data-grid") {
    return <PlaygroundShell entry={entry} scenarios={dataGridScenarios}><DataGridPage /></PlaygroundShell>;
  }
  if (entry.id === "tree-grid") {
    return <PlaygroundShell entry={entry} scenarios={treeGridScenarios}><TreeGridPage /></PlaygroundShell>;
  }
  if (entry.id === "aspect-ratio") {
    return <PlaygroundShell entry={entry} scenarios={aspectRatioScenarios}><AspectRatioPage /></PlaygroundShell>;
  }
  if (entry.id === "tree") {
    return <PlaygroundShell entry={entry} scenarios={treeScenarios}><TreePage /></PlaygroundShell>;
  }
  if (entry.id === "feed") {
    return <PlaygroundShell entry={entry} scenarios={feedScenarios}><FeedPage /></PlaygroundShell>;
  }
  if (entry.id === "swipeable-item") {
    return <PlaygroundShell entry={entry} scenarios={swipeableItemScenarios}><SwipeableItemPage /></PlaygroundShell>;
  }
  if (entry.id === "toolbar") {
    return <PlaygroundShell entry={entry} scenarios={toolbarScenarios}><ToolbarPage /></PlaygroundShell>;
  }
  if (entry.id === "pagination") {
    return <PlaygroundShell entry={entry} scenarios={paginationScenarios}><PaginationPage /></PlaygroundShell>;
  }
  if (entry.id === "carousel") {
    return <PlaygroundShell entry={entry} scenarios={carouselScenarios}><CarouselPage /></PlaygroundShell>;
  }

  if (entry.id === "code") {
    return <PlaygroundShell entry={entry} scenarios={codeScenarios}><CodePage /></PlaygroundShell>;
  }

  if (entry.id === "code-block") {
    return <PlaygroundShell entry={entry} scenarios={codeBlockScenarios}><CodeBlockPage /></PlaygroundShell>;
  }

  if (entry.id === "stack") {
    return (
      <PlaygroundShell entry={entry} scenarios={stackScenarios}>
        <StackPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "z-stack") {
    return (
      <PlaygroundShell entry={entry} scenarios={zStackScenarios}>
        <ZStackPage />
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

  if (entry.id === "section") {
    return (
      <PlaygroundShell entry={entry} scenarios={sectionScenarios}>
        <SectionPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "frame") {
    return (
      <PlaygroundShell entry={entry} scenarios={frameScenarios}>
        <FramePage />
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

  if (entry.id === "number-input") {
    return <PlaygroundShell entry={entry} scenarios={numberInputScenarios}><NumberInputPage /></PlaygroundShell>;
  }

  if (entry.id === "otp-field") {
    return <PlaygroundShell entry={entry} scenarios={otpFieldScenarios}><OTPFieldPage /></PlaygroundShell>;
  }

  if (entry.id === "password-toggle-field") {
    return <PlaygroundShell entry={entry} scenarios={passwordToggleFieldScenarios}><PasswordToggleFieldPage /></PlaygroundShell>;
  }

  if (entry.id === "textarea") {
    return (
      <PlaygroundShell entry={entry} scenarios={textareaScenarios}>
        <TextareaPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "select") {
    return (
      <PlaygroundShell entry={entry} scenarios={selectScenarios}>
        <SelectPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "combobox") {
    return <PlaygroundShell entry={entry} scenarios={comboboxScenarios}><ComboboxPage /></PlaygroundShell>;
  }

  if (entry.id === "multi-select") {
    return (
      <PlaygroundShell entry={entry} scenarios={multiSelectScenarios}>
        <MultiSelectPage />
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

  if (entry.id === "radio-group") {
    return (
      <PlaygroundShell entry={entry} scenarios={radioGroupScenarios}>
        <RadioGroupPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "switch") {
    return (
      <PlaygroundShell entry={entry} scenarios={switchScenarios}>
        <SwitchPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "breadcrumb") {
    return (
      <PlaygroundShell entry={entry} scenarios={breadcrumbScenarios}>
        <BreadcrumbPage />
      </PlaygroundShell>
    );
  }

  if (entry.id === "tabs") {
    return <PlaygroundShell entry={entry} scenarios={tabsScenarios}><TabsPage /></PlaygroundShell>;
  }

  if (entry.id === "dropdown-menu") {
    return <PlaygroundShell entry={entry} scenarios={dropdownMenuScenarios}><DropdownMenuPage /></PlaygroundShell>;
  }

  if (entry.id === "context-menu") {
    return <PlaygroundShell entry={entry} scenarios={contextMenuScenarios}><ContextMenuPage /></PlaygroundShell>;
  }

  if (entry.id === "menubar") {
    return <PlaygroundShell entry={entry} scenarios={menubarScenarios}><MenubarPage /></PlaygroundShell>;
  }

  if (entry.id === "navigation-menu") {
    return <PlaygroundShell entry={entry} scenarios={navigationMenuScenarios}><NavigationMenuPage /></PlaygroundShell>;
  }

  if (entry.id === "bottom-navigation") {
    return <PlaygroundShell entry={entry} scenarios={bottomNavigationScenarios}><BottomNavigationPage /></PlaygroundShell>;
  }

  if (entry.id === "skeleton") {
    return <PlaygroundShell entry={entry} scenarios={skeletonScenarios}><SkeletonPage /></PlaygroundShell>;
  }

  if (entry.id === "progress") {
    return <PlaygroundShell entry={entry} scenarios={progressScenarios}><ProgressPage /></PlaygroundShell>;
  }

  if (entry.id === "progress-circle") {
    return <PlaygroundShell entry={entry} scenarios={progressCircleScenarios}><ProgressCirclePage /></PlaygroundShell>;
  }

  if (entry.id === "slider") {
    return <PlaygroundShell entry={entry} scenarios={sliderScenarios}><SliderPage /></PlaygroundShell>;
  }

  if (entry.id === "rating") {
    return <PlaygroundShell entry={entry} scenarios={ratingScenarios}><RatingPage /></PlaygroundShell>;
  }

  if (entry.id === "file-upload") {
    return <PlaygroundShell entry={entry} scenarios={fileUploadScenarios}><FileUploadPage /></PlaygroundShell>;
  }

  if (entry.id === "toast") {
    return <PlaygroundShell entry={entry} scenarios={toastScenarios}><ToastPage /></PlaygroundShell>;
  }

  if (entry.id === "collapsible") {
    return <PlaygroundShell entry={entry} scenarios={collapsibleScenarios}><CollapsiblePage /></PlaygroundShell>;
  }

  if (entry.id === "accordion") {
    return <PlaygroundShell entry={entry} scenarios={accordionScenarios}><AccordionPage /></PlaygroundShell>;
  }

  return (
    <PlaygroundShell entry={entry} scenarios={buttonScenarios}>
      <ButtonPage />
    </PlaygroundShell>
  );
}
