import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  Grid,
  HStack,
  ReorderableList,
  Text,
  VStack,
  type ReorderableListRootProps,
  type ReorderableListSize,
  type ReorderableListVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./reorderable-list.playground.css";

const initialItems = ["connect", "configure", "verify", "launch"];
const itemContent: Record<string, { title: string; description: string }> = {
  connect: { title: "Connect source", description: "Choose the repository that owns the deployment." },
  configure: { title: "Configure deployment", description: "Set the environment, region, and build command." },
  verify: { title: "Verify setup", description: "Run the checks required before the first release." },
  launch: { title: "Launch application", description: "Publish the approved configuration." },
};
const sizes: ReorderableListSize[] = ["sm", "md", "lg"];
const variants: ReorderableListVariant[] = ["outline", "soft"];
const customStyle = {
  "--brick-reorderable-list-indicator-color": "var(--brick-color-success-solid)",
  "--brick-reorderable-list-item-radius": "var(--brick-radius-full)",
  "--brick-reorderable-list-target-background": "var(--brick-color-success-soft)",
} as CSSProperties;

function GripGraphic() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" /></svg>;
}

function ArrowGraphic({ direction }: { direction: "before" | "after" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={direction === "before" ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function ReorderExample({
  disabled,
  orientation = "vertical",
  readOnly,
  size,
  style,
  variant,
}: Pick<ReorderableListRootProps, "disabled" | "orientation" | "readOnly" | "size" | "style" | "variant">) {
  const [items, setItems] = useState(initialItems);
  return (
    <VStack gap="3">
      <ReorderableList.Root
        disabled={disabled}
        getItemLabel={(value) => itemContent[value].title}
        items={items}
        onItemsChange={setItems}
        orientation={orientation}
        readOnly={readOnly}
        size={size}
        style={style}
        variant={variant}
      >
        {items.map((value) => {
          const item = itemContent[value];
          return (
            <ReorderableList.Item key={value} value={value}>
              <ReorderableList.Handle aria-label={`Reorder ${item.title}`}><GripGraphic /></ReorderableList.Handle>
              <ReorderableList.Content>
                <VStack gap="1">
                  <Text as="span" variant="title-sm" weight="semibold">{item.title}</Text>
                  <Text as="span" tone="secondary" variant="body-sm">{item.description}</Text>
                </VStack>
              </ReorderableList.Content>
              <ReorderableList.Actions>
                <ReorderableList.MoveBefore aria-label={`Move ${item.title} earlier`}><ArrowGraphic direction="before" /></ReorderableList.MoveBefore>
                <ReorderableList.MoveAfter aria-label={`Move ${item.title} later`}><ArrowGraphic direction="after" /></ReorderableList.MoveAfter>
              </ReorderableList.Actions>
              <ReorderableList.DropIndicator />
            </ReorderableList.Item>
          );
        })}
      </ReorderableList.Root>
      <HStack justify="end"><Button onClick={() => setItems(initialItems)} size="sm" tone="neutral" variant="outline">Reset order</Button></HStack>
    </VStack>
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="reorderable-list-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

export const reorderableListScenarios = [
  { id: "reorderable-list.overview", number: 1, title: "Overview", description: "The canonical outline list exposes stable content, an explicit handle, visible direct movement, and insertion feedback." },
  { id: "reorderable-list.recipes", number: 2, title: "Recipes", description: "Outline and soft change paint, while sm, md, and lg change spacing without shrinking any movement target below 44px." },
  { id: "reorderable-list.direct", number: 3, title: "Direct movement", navigationTitle: "Movement", description: "Visible earlier and later controls reorder once, disable at unavailable edges, and keep focus with the moved item." },
  { id: "reorderable-list.input", number: 4, title: "Input and cancellation", navigationTitle: "Input", description: "The same list accepts keyboard lift, target movement, commit, cancellation, mouse drag, and touch without application-owned interaction code." },
  { id: "reorderable-list.states", number: 5, title: "Disabled and read-only", navigationTitle: "States", description: "Disabled removes interaction; read-only keeps the ordered content available while every movement path is unavailable." },
  { id: "reorderable-list.direction", number: 6, title: "Orientation and direction", navigationTitle: "Direction", description: "Horizontal ordering scrolls inside its owner and RTL mirrors logical movement without changing stable item identity." },
  { id: "reorderable-list.theme", number: 7, title: "Theme, customization, and stress", navigationTitle: "Theme", description: "Appearance, public variables, long localized content, narrow width, zoom, reduced motion, and forced colors preserve hierarchy and feedback." },
] as const satisfies readonly ScenarioDefinition[];

export function ReorderableListPage() {
  return <VStack className="reorderable-list-page" data-component-page="reorderable-list" gap="6">
    <Scenario {...reorderableListScenarios[0]}><EvidenceSurface><ReorderExample /></EvidenceSurface></Scenario>
    <Scenario {...reorderableListScenarios[1]}><VStack gap="5"><Grid.Root className="reorderable-list-grid reorderable-list-grid--two" columns={2} gap="4">{variants.map((variant) => <Cell key={variant} label={variant}><ReorderExample variant={variant} /></Cell>)}</Grid.Root><Grid.Root className="reorderable-list-grid reorderable-list-grid--sizes" columns={3} gap="4">{sizes.map((size) => <Cell key={size} label={size}><ReorderExample size={size} /></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...reorderableListScenarios[2]}><EvidenceSurface><VStack gap="3"><Badge size="sm" tone="neutral" variant="soft">Use the arrow controls</Badge><ReorderExample /></VStack></EvidenceSurface></Scenario>
    <Scenario {...reorderableListScenarios[3]}><EvidenceSurface><VStack gap="3"><Text tone="secondary" variant="body-sm">Focus a grip. Press Space, use Arrow Up or Arrow Down, then Space to commit or Escape to cancel. Pointer and touch use the same list.</Text><ReorderExample /></VStack></EvidenceSurface></Scenario>
    <Scenario {...reorderableListScenarios[4]}><Grid.Root className="reorderable-list-grid reorderable-list-grid--two" columns={2} gap="4"><Cell label="disabled"><ReorderExample disabled /></Cell><Cell label="read-only"><ReorderExample readOnly /></Cell></Grid.Root></Scenario>
    <Scenario {...reorderableListScenarios[5]}><VStack gap="5"><Cell label="horizontal"><ReorderExample orientation="horizontal" /></Cell><EvidenceSurface dir="rtl"><SpecimenLabel>RTL vertical</SpecimenLabel><ReorderExample /></EvidenceSurface></VStack></Scenario>
    <Scenario {...reorderableListScenarios[6]}><VStack gap="5"><Grid.Root className="reorderable-list-grid reorderable-list-grid--two" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><ReorderExample variant="soft" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><ReorderExample variant="soft" /></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Reorderable List CSS properties</Text><Text tone="secondary" variant="body-sm">The preview uses the exact success feedback and pill radius shown in code.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-reorderable-list-indicator-color: var(--brick-color-success-solid);\n--brick-reorderable-list-item-radius: var(--brick-radius-full);\n--brick-reorderable-list-target-background: var(--brick-color-success-soft);`}</PlaygroundCodeBlock></VStack><VStack className="playground-customization-preview" gap="3"><ReorderExample style={customStyle} /></VStack></Grid.Root></EvidenceSurface><Cell label="320px long content"><div className="reorderable-list-narrow"><ReorderExample /></div></Cell></VStack></Scenario>
  </VStack>;
}
