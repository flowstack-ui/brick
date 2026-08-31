import { useEffect, useState, type ComponentType } from "react";
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
import {
  LinkBoxPage,
  linkBoxScenarios,
} from "../components/link-box/LinkBoxPage.js";
import {
  NavListPage,
  navListScenarios,
} from "../components/nav-list/NavListPage.js";
import {
  SidebarPage,
  sidebarScenarios,
} from "../components/sidebar/SidebarPage.js";
import { CardPage, cardScenarios } from "../components/card/CardPage.js";
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
import { BadgePage, badgeScenarios } from "../components/badge/BadgePage.js";
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
import {
  NumberInputPage,
  numberInputScenarios,
} from "../components/number-input/NumberInputPage.js";
import {
  OTPFieldPage,
  otpFieldScenarios,
} from "../components/otp-field/OTPFieldPage.js";
import {
  PasswordToggleFieldPage,
  passwordToggleFieldScenarios,
} from "../components/password-toggle-field/PasswordToggleFieldPage.js";
import {
  TextareaPage,
  textareaScenarios,
} from "../components/textarea/TextareaPage.js";
import {
  SelectPage,
  selectScenarios,
} from "../components/select/SelectPage.js";
import {
  ComboboxPage,
  comboboxScenarios,
} from "../components/combobox/ComboboxPage.js";
import {
  MultiSelectPage,
  multiSelectScenarios,
} from "../components/multi-select/MultiSelectPage.js";
import { TextPage, textScenarios } from "../components/text/TextPage.js";
import { ChipPage, chipScenarios } from "../components/chip/ChipPage.js";
import { IconPage, iconScenarios } from "../components/icon/IconPage.js";
import { ImagePage, imageScenarios } from "../components/image/ImagePage.js";
import { ListPage, listScenarios } from "../components/list/ListPage.js";
import {
  ReorderableListPage,
  reorderableListScenarios,
} from "../components/reorderable-list/ReorderableListPage.js";
import { TablePage, tableScenarios } from "../components/table/TablePage.js";
import {
  DataGridPage,
  dataGridScenarios,
} from "../components/data-grid/DataGridPage.js";
import {
  TreeGridPage,
  treeGridScenarios,
} from "../components/tree-grid/TreeGridPage.js";
import {
  AspectRatioPage,
  aspectRatioScenarios,
} from "../components/aspect-ratio/AspectRatioPage.js";
import { TreePage, treeScenarios } from "../components/tree/TreePage.js";
import { FeedPage, feedScenarios } from "../components/feed/FeedPage.js";
import {
  SwipeableItemPage,
  swipeableItemScenarios,
} from "../components/swipeable-item/SwipeableItemPage.js";
import {
  ToolbarPage,
  toolbarScenarios,
} from "../components/toolbar/ToolbarPage.js";
import {
  PaginationPage,
  paginationScenarios,
} from "../components/pagination/PaginationPage.js";
import {
  CarouselPage,
  carouselScenarios,
} from "../components/carousel/CarouselPage.js";
import { CodePage, codeScenarios } from "../components/code/CodePage.js";
import { EmPage, emScenarios } from "../components/em/EmPage.js";
import { MarkPage, markScenarios } from "../components/mark/MarkPage.js";
import { KbdPage, kbdScenarios } from "../components/kbd/KbdPage.js";
import {
  BlockquotePage,
  blockquoteScenarios,
} from "../components/blockquote/BlockquotePage.js";
import {
  HighlightPage,
  highlightScenarios,
} from "../components/highlight/HighlightPage.js";
import { ProsePage, proseScenarios } from "../components/prose/ProsePage.js";
import {
  CodeBlockPage,
  codeBlockScenarios,
} from "../components/code-block/CodeBlockPage.js";
import { StackPage, stackScenarios } from "../components/stack/StackPage.js";
import { GroupPage, groupScenarios } from "../components/group/GroupPage.js";
import {
  DataListPage,
  dataListScenarios,
} from "../components/data-list/DataListPage.js";
import {
  ZStackPage,
  zStackScenarios,
} from "../components/z-stack/ZStackPage.js";
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
import { BleedPage, bleedScenarios } from "../components/bleed/BleedPage.js";
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
import {
  SegmentGroupPage,
  segmentGroupScenarios,
} from "../components/segment-group/SegmentGroupPage.js";
import {
  SwitchPage,
  switchScenarios,
} from "../components/switch/SwitchPage.js";
import {
  BreadcrumbPage,
  breadcrumbScenarios,
} from "../components/breadcrumb/BreadcrumbPage.js";
import { TabsPage, tabsScenarios } from "../components/tabs/TabsPage.js";
import {
  DropdownMenuPage,
  dropdownMenuScenarios,
} from "../components/dropdown-menu/DropdownMenuPage.js";
import {
  ContextMenuPage,
  contextMenuScenarios,
} from "../components/context-menu/ContextMenuPage.js";
import {
  MenubarPage,
  menubarScenarios,
} from "../components/menubar/MenubarPage.js";
import {
  NavigationMenuPage,
  navigationMenuScenarios,
} from "../components/navigation-menu/NavigationMenuPage.js";
import {
  BottomNavigationPage,
  bottomNavigationScenarios,
} from "../components/bottom-navigation/BottomNavigationPage.js";
import {
  VisuallyHiddenPage,
  visuallyHiddenScenarios,
} from "../components/visually-hidden/VisuallyHiddenPage.js";
import {
  SkipLinkFixturePage,
  SkipLinkPage,
  skipLinkScenarios,
} from "../components/skip-link/SkipLinkPage.js";
import {
  SkeletonPage,
  skeletonScenarios,
} from "../components/skeleton/SkeletonPage.js";
import {
  ProgressPage,
  progressScenarios,
} from "../components/progress/ProgressPage.js";
import {
  ProgressCirclePage,
  progressCircleScenarios,
} from "../components/progress-circle/ProgressCirclePage.js";
import {
  SliderPage,
  sliderScenarios,
} from "../components/slider/SliderPage.js";
import {
  RatingPage,
  ratingScenarios,
} from "../components/rating/RatingPage.js";
import {
  StatusPage,
  statusScenarios,
} from "../components/status/StatusPage.js";
import {
  ColorSwatchPage,
  colorSwatchScenarios,
} from "../components/color-swatch/ColorSwatchPage.js";
import {
  ColorPickerPage,
  colorPickerScenarios,
} from "../components/color-picker/ColorPickerPage.js";
import {
  FileUploadPage,
  fileUploadScenarios,
} from "../components/file-upload/FileUploadPage.js";
import { ToastPage, toastScenarios } from "../components/toast/ToastPage.js";
import {
  CollapsiblePage,
  collapsibleScenarios,
} from "../components/collapsible/CollapsiblePage.js";
import {
  AccordionPage,
  accordionScenarios,
} from "../components/accordion/AccordionPage.js";
import { ShowPage, showScenarios } from "../components/show/ShowPage.js";
import { HidePage, hideScenarios } from "../components/hide/HidePage.js";
import {
  AppearancePage,
  appearanceScenarios,
} from "../components/appearance/AppearancePage.js";
import { PlaygroundShell } from "../shell/PlaygroundShell.js";
import type { ScenarioDefinition } from "../shared/Scenario.js";
import type { PlaygroundComponentId } from "./component-registry.js";

interface PlaygroundModule {
  Page: ComponentType;
  scenarios: readonly ScenarioDefinition[];
}

const playgroundModules = {
  accordion: { Page: AccordionPage, scenarios: accordionScenarios },
  "alert-dialog": { Page: AlertDialogPage, scenarios: alertDialogScenarios },
  "app-bar": { Page: AppBarPage, scenarios: appBarScenarios },
  appearance: { Page: AppearancePage, scenarios: appearanceScenarios },
  "aspect-ratio": { Page: AspectRatioPage, scenarios: aspectRatioScenarios },
  avatar: { Page: AvatarPage, scenarios: avatarScenarios },
  badge: { Page: BadgePage, scenarios: badgeScenarios },
  bleed: { Page: BleedPage, scenarios: bleedScenarios },
  blockquote: { Page: BlockquotePage, scenarios: blockquoteScenarios },
  "bottom-navigation": {
    Page: BottomNavigationPage,
    scenarios: bottomNavigationScenarios,
  },
  breadcrumb: { Page: BreadcrumbPage, scenarios: breadcrumbScenarios },
  button: { Page: ButtonPage, scenarios: buttonScenarios },
  card: { Page: CardPage, scenarios: cardScenarios },
  carousel: { Page: CarouselPage, scenarios: carouselScenarios },
  "checkbox-group": {
    Page: CheckboxGroupPage,
    scenarios: checkboxGroupScenarios,
  },
  checkbox: { Page: CheckboxPage, scenarios: checkboxScenarios },
  chip: { Page: ChipPage, scenarios: chipScenarios },
  "code-block": { Page: CodeBlockPage, scenarios: codeBlockScenarios },
  code: { Page: CodePage, scenarios: codeScenarios },
  collapsible: { Page: CollapsiblePage, scenarios: collapsibleScenarios },
  "color-picker": { Page: ColorPickerPage, scenarios: colorPickerScenarios },
  "color-swatch": { Page: ColorSwatchPage, scenarios: colorSwatchScenarios },
  combobox: { Page: ComboboxPage, scenarios: comboboxScenarios },
  container: { Page: ContainerPage, scenarios: containerScenarios },
  "context-menu": { Page: ContextMenuPage, scenarios: contextMenuScenarios },
  "data-grid": { Page: DataGridPage, scenarios: dataGridScenarios },
  "data-list": { Page: DataListPage, scenarios: dataListScenarios },
  dialog: { Page: DialogPage, scenarios: dialogScenarios },
  divider: { Page: DividerPage, scenarios: dividerScenarios },
  drawer: { Page: DrawerPage, scenarios: drawerScenarios },
  "dropdown-menu": { Page: DropdownMenuPage, scenarios: dropdownMenuScenarios },
  em: { Page: EmPage, scenarios: emScenarios },
  feed: { Page: FeedPage, scenarios: feedScenarios },
  field: { Page: FieldPage, scenarios: fieldScenarios },
  fieldset: { Page: FieldsetPage, scenarios: fieldsetScenarios },
  "file-upload": { Page: FileUploadPage, scenarios: fileUploadScenarios },
  form: { Page: FormPage, scenarios: formScenarios },
  frame: { Page: FramePage, scenarios: frameScenarios },
  grid: { Page: GridPage, scenarios: gridScenarios },
  group: { Page: GroupPage, scenarios: groupScenarios },
  hide: { Page: HidePage, scenarios: hideScenarios },
  highlight: { Page: HighlightPage, scenarios: highlightScenarios },
  "hover-card": { Page: HoverCardPage, scenarios: hoverCardScenarios },
  "icon-button": { Page: IconButtonPage, scenarios: iconButtonScenarios },
  icon: { Page: IconPage, scenarios: iconScenarios },
  image: { Page: ImagePage, scenarios: imageScenarios },
  input: { Page: InputPage, scenarios: inputScenarios },
  kbd: { Page: KbdPage, scenarios: kbdScenarios },
  "link-box": { Page: LinkBoxPage, scenarios: linkBoxScenarios },
  link: { Page: LinkPage, scenarios: linkScenarios },
  list: { Page: ListPage, scenarios: listScenarios },
  mark: { Page: MarkPage, scenarios: markScenarios },
  menubar: { Page: MenubarPage, scenarios: menubarScenarios },
  "multi-select": { Page: MultiSelectPage, scenarios: multiSelectScenarios },
  "nav-list": { Page: NavListPage, scenarios: navListScenarios },
  "navigation-menu": {
    Page: NavigationMenuPage,
    scenarios: navigationMenuScenarios,
  },
  "notification-badge": {
    Page: NotificationBadgePage,
    scenarios: notificationBadgeScenarios,
  },
  "number-input": { Page: NumberInputPage, scenarios: numberInputScenarios },
  "otp-field": { Page: OTPFieldPage, scenarios: otpFieldScenarios },
  pagination: { Page: PaginationPage, scenarios: paginationScenarios },
  "password-toggle-field": {
    Page: PasswordToggleFieldPage,
    scenarios: passwordToggleFieldScenarios,
  },
  popover: { Page: PopoverPage, scenarios: popoverScenarios },
  "progress-circle": {
    Page: ProgressCirclePage,
    scenarios: progressCircleScenarios,
  },
  progress: { Page: ProgressPage, scenarios: progressScenarios },
  prose: { Page: ProsePage, scenarios: proseScenarios },
  "radio-group": { Page: RadioGroupPage, scenarios: radioGroupScenarios },
  rating: { Page: RatingPage, scenarios: ratingScenarios },
  "reorderable-list": {
    Page: ReorderableListPage,
    scenarios: reorderableListScenarios,
  },
  "scroll-area": { Page: ScrollAreaPage, scenarios: scrollAreaScenarios },
  section: { Page: SectionPage, scenarios: sectionScenarios },
  "segment-group": { Page: SegmentGroupPage, scenarios: segmentGroupScenarios },
  select: { Page: SelectPage, scenarios: selectScenarios },
  show: { Page: ShowPage, scenarios: showScenarios },
  sidebar: { Page: SidebarPage, scenarios: sidebarScenarios },
  skeleton: { Page: SkeletonPage, scenarios: skeletonScenarios },
  "skip-link": { Page: SkipLinkPage, scenarios: skipLinkScenarios },
  slider: { Page: SliderPage, scenarios: sliderScenarios },
  stack: { Page: StackPage, scenarios: stackScenarios },
  status: { Page: StatusPage, scenarios: statusScenarios },
  surface: { Page: SurfacePage, scenarios: surfaceScenarios },
  "swipeable-item": {
    Page: SwipeableItemPage,
    scenarios: swipeableItemScenarios,
  },
  switch: { Page: SwitchPage, scenarios: switchScenarios },
  table: { Page: TablePage, scenarios: tableScenarios },
  tabs: { Page: TabsPage, scenarios: tabsScenarios },
  text: { Page: TextPage, scenarios: textScenarios },
  textarea: { Page: TextareaPage, scenarios: textareaScenarios },
  toast: { Page: ToastPage, scenarios: toastScenarios },
  "toggle-group": { Page: ToggleGroupPage, scenarios: toggleGroupScenarios },
  toggle: { Page: TogglePage, scenarios: toggleScenarios },
  toolbar: { Page: ToolbarPage, scenarios: toolbarScenarios },
  tooltip: { Page: TooltipPage, scenarios: tooltipScenarios },
  "tree-grid": { Page: TreeGridPage, scenarios: treeGridScenarios },
  tree: { Page: TreePage, scenarios: treeScenarios },
  "visually-hidden": {
    Page: VisuallyHiddenPage,
    scenarios: visuallyHiddenScenarios,
  },
  "z-stack": { Page: ZStackPage, scenarios: zStackScenarios },
} satisfies Record<PlaygroundComponentId, PlaygroundModule>;

const playgroundRoutes = new Set(playgroundEntries.map((entry) => entry.route));

function usePlaygroundPath() {
  const [locationKey, setLocationKey] = useState(
    () =>
      `${window.location.pathname}${window.location.search}${window.location.hash}`,
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
        !destination.searchParams.has("theme") &&
        new URLSearchParams(window.location.search).get("theme") ===
          "qualification"
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

  if (path === "/skip-link/fixture") return <SkipLinkFixturePage />;
  if (path === "/hover-card/destination") return <HoverCardDestinationPage />;

  const entry = resolvePlaygroundEntry(path === "/" ? "/button" : path);
  const { Page, scenarios } =
    playgroundModules[entry.id as PlaygroundComponentId];
  const skipLink =
    entry.id === "skip-link"
      ? {
          href: "#skip-link-playground-main" as const,
          label: "Skip Brick playground navigation",
          targetId: "skip-link-playground-main",
        }
      : undefined;

  return (
    <PlaygroundShell entry={entry} scenarios={scenarios} skipLink={skipLink}>
      <Page />
    </PlaygroundShell>
  );
}
