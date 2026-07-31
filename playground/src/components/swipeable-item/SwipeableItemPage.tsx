import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  DropdownMenu,
  Grid,
  HStack,
  SwipeableItem,
  Text,
  VStack,
  type SwipeableItemVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./swipeable-item.playground.css";

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="swipeable-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

function AlternativeMenu({ onAction }: { onAction?: (message: string) => void }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild><Button size="sm" variant="ghost">More actions</Button></DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content ariaLabel="Message actions" sideOffset={6}>
          <DropdownMenu.Item onSelect={() => onAction?.("Archived from menu")} value="archive"><DropdownMenu.ItemLabel>Archive</DropdownMenu.ItemLabel></DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => onAction?.("Deleted from menu")} tone="danger" value="delete"><DropdownMenu.ItemLabel>Delete</DropdownMenu.ItemLabel></DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function MessageItem({
  dir,
  disabled,
  openSide,
  onAction,
  onOpenSideChange,
  readOnly,
  title = "Design review",
  variant = "outline",
  ...props
}: {
  dir?: "ltr" | "rtl";
  disabled?: boolean;
  openSide?: "start" | "end" | null;
  onAction?: (message: string) => void;
  onOpenSideChange?: (side: "start" | "end" | null) => void;
  readOnly?: boolean;
  title?: string;
  variant?: SwipeableItemVariant;
} & Omit<React.ComponentProps<typeof SwipeableItem.Root>, "children" | "onOpenSideChange" | "openSide">) {
  const controlled = openSide !== undefined;
  return (
    <SwipeableItem.Root
      {...props}
      dir={dir}
      disabled={disabled}
      onOpenSideChange={onOpenSideChange}
      readOnly={readOnly}
      variant={variant}
      {...(controlled ? { openSide } : {})}
    >
      <SwipeableItem.Actions aria-label="Archive actions" side="start">
        <Button onClick={() => onAction?.("Archived from swipe actions")} size="sm" variant="ghost">Archive</Button>
      </SwipeableItem.Actions>
      <SwipeableItem.Content className="swipeable-message">
        <VStack gap="1">
          <Text as="h3" variant="title-sm">{title}</Text>
          <Text as="p" tone="secondary" variant="body-sm">Morgan requested feedback on the responsive interaction.</Text>
        </VStack>
        <AlternativeMenu onAction={onAction} />
      </SwipeableItem.Content>
      <SwipeableItem.Actions aria-label="Delete actions" side="end">
        <Button onClick={() => onAction?.("Deleted from swipe actions")} size="sm" tone="danger" variant="ghost">Delete</Button>
      </SwipeableItem.Actions>
    </SwipeableItem.Root>
  );
}

function InteractiveExample() {
  const [message, setMessage] = useState("No action selected");
  return <VStack gap="3"><MessageItem data-testid="swipeable-overview-item" onAction={setMessage} /><Text aria-live="polite" as="p" tone="secondary" variant="body-sm">{message}</Text></VStack>;
}

function ControlledExample() {
  const [side, setSide] = useState<"start" | "end" | null>(null);
  return <VStack gap="3"><HStack gap="2" wrap><Button onClick={() => setSide("start")} size="sm">Open start</Button><Button onClick={() => setSide("end")} size="sm" variant="outline">Open end</Button><Button onClick={() => setSide(null)} size="sm" variant="ghost">Close</Button></HStack><MessageItem onOpenSideChange={setSide} openSide={side} /><Text as="p" tone="secondary" variant="body-sm">Open side: {side ?? "none"}</Text></VStack>;
}

const customTokens = {
  "--brick-swipeable-item-background": "var(--brick-color-accent-soft)",
  "--brick-swipeable-item-action-background": "var(--brick-color-accent-surface)",
  "--brick-swipeable-item-border-color": "var(--brick-color-accent-border)",
  "--brick-swipeable-item-radius": "1.25rem",
} as CSSProperties;

export const swipeableItemScenarios = [
  { id: "swipeable-item.overview", number: 1, title: "Overview", description: "Swipe horizontally or use Arrow keys to reveal actions; the visible menu provides the same commands without dragging." },
  { id: "swipeable-item.anatomy", number: 2, title: "Anatomy and output", navigationTitle: "Anatomy", description: "Root, Content, and labeled logical-side Actions remain the only component-owned parts." },
  { id: "swipeable-item.variants", number: 3, title: "Variants", description: "Plain composes in an existing item boundary while outline provides a standalone row boundary." },
  { id: "swipeable-item.sides", number: 4, title: "Start and end actions", navigationTitle: "Actions", description: "Each measured logical side reveals its own labeled native action group." },
  { id: "swipeable-item.alternative", number: 5, title: "Visible alternative", navigationTitle: "Alternative", description: "The always-visible More actions menu exposes Archive and Delete without a drag gesture." },
  { id: "swipeable-item.states", number: 6, title: "Disabled and read only", navigationTitle: "States", description: "Disabled and read-only rows preserve layout while Atom blocks reveal state changes." },
  { id: "swipeable-item.controlled", number: 7, title: "Controlled state", navigationTitle: "Controlled", description: "Applications can coordinate the open logical side without owning gesture math." },
  { id: "swipeable-item.appearance", number: 8, title: "Appearance", description: "Separate padded light and dark scopes retain compact badges and identical geometry." },
  { id: "swipeable-item.customized", number: 9, title: "Customized", description: "A titled token-only example changes surfaces, border, and radius while preserving rounded clipping." },
  { id: "swipeable-item.stress", number: 10, title: "Responsive and RTL", navigationTitle: "Stress", description: "Long content wraps at phone width and logical actions mirror in genuine RTL." },
] satisfies ScenarioDefinition[];

export function SwipeableItemPage() {
  return (
    <VStack className="swipeable-page" data-component-page="swipeable-item" gap="6">
      <Scenario {...swipeableItemScenarios[0]}><EvidenceSurface data-testid="swipeable-overview" inset="lg"><InteractiveExample /></EvidenceSurface></Scenario>
      <Scenario {...swipeableItemScenarios[1]}><RenderedOutput label="Rendered Swipeable Item HTML"><MessageItem /></RenderedOutput></Scenario>
      <Scenario {...swipeableItemScenarios[2]}><Grid.Root className="swipeable-grid" columns={2} gap="4"><Cell label="plain"><MessageItem variant="plain" /></Cell><Cell label="outline"><MessageItem variant="outline" /></Cell></Grid.Root></Scenario>
      <Scenario {...swipeableItemScenarios[3]}><Grid.Root className="swipeable-grid" columns={2} gap="4"><Cell label="start revealed"><MessageItem defaultOpenSide="start" /></Cell><Cell label="end revealed"><MessageItem defaultOpenSide="end" /></Cell></Grid.Root></Scenario>
      <Scenario {...swipeableItemScenarios[4]}><EvidenceSurface className="swipeable-alternative" data-testid="swipeable-alternative" inset="lg"><VStack gap="3"><Badge size="sm" tone="neutral" variant="soft">No swipe needed</Badge><Text as="h3" variant="title-sm">Every command remains one click away</Text><Text as="p" tone="secondary" variant="body-sm">Open More actions to reach Archive and Delete without swiping.</Text><MessageItem /></VStack></EvidenceSurface></Scenario>
      <Scenario {...swipeableItemScenarios[5]}><Grid.Root className="swipeable-grid" columns={2} gap="4"><Cell label="disabled"><MessageItem disabled /></Cell><Cell label="read only"><MessageItem readOnly /></Cell></Grid.Root></Scenario>
      <Scenario {...swipeableItemScenarios[6]}><EvidenceSurface inset="lg"><ControlledExample /></EvidenceSurface></Scenario>
      <Scenario {...swipeableItemScenarios[7]}><Grid.Root className="swipeable-grid" columns={2} gap="4"><EvidenceSurface className="swipeable-appearance-surface" data-brick-appearance="light"><Badge size="sm" tone="neutral" variant="soft">Light</Badge><MessageItem /></EvidenceSurface><EvidenceSurface className="swipeable-appearance-surface" data-brick-appearance="dark"><Badge size="sm" tone="neutral" variant="soft">Dark</Badge><MessageItem /></EvidenceSurface></Grid.Root></Scenario>
      <Scenario {...swipeableItemScenarios[8]}><EvidenceSurface as="article" className="playground-customization-evidence" inset="none"><Grid.Root className="swipeable-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><Badge size="sm" style={{ alignSelf: "flex-start", inlineSize: "fit-content" }} tone="neutral" variant="soft">Customized</Badge><Text as="h3" variant="title-sm">Accent message actions</Text><Text as="p" tone="secondary" variant="body-sm">Public variables recolor both layers while the shared radius clips every translated edge.</Text><PlaygroundCodeBlock>{`--brick-swipeable-item-background: var(--brick-color-accent-soft);\n--brick-swipeable-item-action-background: var(--brick-color-accent-surface);\n--brick-swipeable-item-border-color: var(--brick-color-accent-border);\n--brick-swipeable-item-radius: 1.25rem;`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><MessageItem style={customTokens} /></div></Grid.Root></EvidenceSurface></Scenario>
      <Scenario {...swipeableItemScenarios[9]}><Grid.Root className="swipeable-grid" columns={2} gap="4"><Cell label="320px constrained"><div className="swipeable-phone"><MessageItem title="A deliberately long localized message title wraps inside the moving content surface" /></div></Cell><Cell label="RTL logical actions"><div dir="rtl"><MessageItem defaultOpenSide="end" dir="rtl" title="مراجعة التصميم" /></div></Cell></Grid.Root></Scenario>
    </VStack>
  );
}
