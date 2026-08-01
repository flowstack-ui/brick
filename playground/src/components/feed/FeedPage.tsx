import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  Feed,
  Grid,
  HStack,
  Link,
  ScrollArea,
  Text,
  VStack,
  type FeedDensity,
  type FeedVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./feed.playground.css";

interface Update {
  id: string;
  title: string;
  summary: string;
  meta: string;
  status: string;
}

const updates: Update[] = [
  { id: "publish", title: "Atom 0.19.8 published", summary: "The Feed focus correction passed package and browser release gates.", meta: "8 minutes ago", status: "Published" },
  { id: "review", title: "Design review requested", summary: "Morgan requested review of the activity-stream spacing and focus treatment.", meta: "24 minutes ago", status: "Review" },
  { id: "docs", title: "Usage guide drafted", summary: "Accessible naming, dynamic updates, and application-owned loading are documented.", meta: "1 hour ago", status: "Docs" },
];

const olderUpdate: Update = { id: "research", title: "Feed research approved", summary: "The two-part Root and Item contract is ready for implementation.", meta: "Yesterday", status: "Approved" };
const newerUpdate: Update = { id: "verify", title: "Consumer verification ready", summary: "A packed application can now prove realistic activity-stream composition.", meta: "Just now", status: "Ready" };

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="feed-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

function ActivityItem({ prefix, update }: { prefix: string; update: Update }) {
  const titleId = `${prefix}-${update.id}-title`;
  const summaryId = `${prefix}-${update.id}-summary`;
  return (
    <>
      <HStack className="feed-article-header" gap="3" wrap>
        <Badge size="sm" tone={update.status === "Published" || update.status === "Ready" ? "success" : "neutral"} variant="soft">{update.status}</Badge>
        <Text as="span" className="feed-meta" tone="secondary" variant="caption">{update.meta}</Text>
      </HStack>
      <VStack gap="1">
        <Text as="h3" id={titleId} variant="title-sm">{update.title}</Text>
        <Text as="p" id={summaryId} tone="secondary" variant="body-sm">{update.summary}</Text>
      </VStack>
      <HStack className="feed-actions" gap="3" wrap>
        <Link href={`#${titleId}`} size="sm">View update</Link>
        <Button size="sm" variant="ghost">Acknowledge</Button>
      </HStack>
    </>
  );
}

function ActivityStream({
  items = updates,
  prefix,
  setSize = items.length,
  ...props
}: Omit<React.ComponentProps<typeof Feed.Root>, "children" | "setSize"> & {
  items?: Update[];
  prefix: string;
  setSize?: number | "unknown";
}) {
  return (
    <Feed.Root aria-label="Release activity" setSize={setSize} {...props}>
      {items.map((update, index) => (
        <Feed.Item
          aria-describedby={`${prefix}-${update.id}-summary`}
          aria-labelledby={`${prefix}-${update.id}-title`}
          index={index}
          key={update.id}
        >
          <ActivityItem prefix={prefix} update={update} />
        </Feed.Item>
      ))}
    </Feed.Root>
  );
}

function DynamicFeed() {
  const [items, setItems] = useState(updates);
  const [busy, setBusy] = useState(false);
  const [unknown, setUnknown] = useState(false);
  return (
    <VStack gap="3">
      <HStack gap="2" wrap>
        <Button disabled={items.some(item => item.id === newerUpdate.id)} onClick={() => setItems(current => [newerUpdate, ...current])} size="sm">Prepend newest</Button>
        <Button disabled={items.some(item => item.id === olderUpdate.id)} onClick={() => setItems(current => [...current, olderUpdate])} size="sm" variant="outline">Append older</Button>
        <Button disabled={items.length <= 1} onClick={() => setItems(current => current.slice(0, -1))} size="sm" variant="ghost">Remove last</Button>
        <Button aria-pressed={busy} onClick={() => setBusy(value => !value)} size="sm" variant="ghost">{busy ? "Finish update" : "Mark busy"}</Button>
        <Button aria-pressed={unknown} onClick={() => setUnknown(value => !value)} size="sm" variant="ghost">{unknown ? "Use known total" : "Use unknown total"}</Button>
      </HStack>
      <Text aria-live="polite" as="p" className="feed-status" tone="secondary" variant="body-sm">{busy ? "Updating release activity…" : `${items.length} updates shown`}</Text>
      <ActivityStream busy={busy} items={items} prefix="dynamic" setSize={unknown ? "unknown" : items.length} />
    </VStack>
  );
}

const customTokens = {
  "--brick-feed-background": "var(--brick-color-accent-soft)",
  "--brick-feed-border-color": "var(--brick-color-accent-border)",
  "--brick-feed-divider-color": "var(--brick-color-accent-border)",
  "--brick-feed-radius": "1rem",
} as CSSProperties;

export const feedScenarios = [
  { id: "feed.overview", number: 1, title: "Overview", description: "A finished three-article activity stream uses the divided and comfortable defaults." },
  { id: "feed.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Root and direct Item hosts expose live Feed roles, relationships, positions, slots, and classes without Brick wrappers." },
  { id: "feed.variants", number: 3, title: "Variants", description: "Plain, divided, and outline change only article separation and surface treatment." },
  { id: "feed.density", number: 4, title: "Density", description: "Compact and comfortable use identical content while changing only stream spacing." },
  { id: "feed.dynamic", number: 5, title: "Dynamic state", navigationTitle: "Dynamic", description: "The application owns insertion, removal, busy state, status copy, and known or unknown totals." },
  { id: "feed.keyboard", number: 6, title: "Keyboard and focus", navigationTitle: "Keyboard", description: "Page keys move and reveal articles; Control or Command Home and End leave the bounded stream, while consumers can cancel the behavior." },
  { id: "feed.rich", number: 7, title: "Rich composition", navigationTitle: "Composition", description: "Badges, text, links, and actions remain ordinary authored Item children rather than a private Feed schema." },
  { id: "feed.appearance", number: 8, title: "Appearance", description: "Separate padded light and dark scopes retain the same outlined Feed defaults and compact specimen badges." },
  { id: "feed.customized", number: 9, title: "Customized", description: "A titled token-only override demonstrates accent surfaces, separators, and rounded article containment." },
  { id: "feed.stress", number: 10, title: "Responsive and RTL", navigationTitle: "Stress", description: "Long localized content wraps at narrow widths while metadata and actions follow genuine logical direction." },
] satisfies ScenarioDefinition[];

export function FeedPage() {
  const variants: FeedVariant[] = ["plain", "divided", "outline"];
  const densities: FeedDensity[] = ["compact", "comfortable"];
  return (
    <VStack className="feed-page" data-component-page="feed" gap="6">
      <Scenario {...feedScenarios[0]}><EvidenceSurface data-testid="feed-overview" inset="lg"><Text as="p" className="feed-keyboard-help" id="feed-overview-help" tone="secondary" variant="body-sm">Use Page Up and Page Down to move article by article.</Text><ActivityStream aria-describedby="feed-overview-help" prefix="overview" /></EvidenceSurface></Scenario>
      <Scenario {...feedScenarios[1]}><RenderedOutput label="Rendered Feed HTML"><ActivityStream prefix="anatomy" /></RenderedOutput></Scenario>
      <Scenario {...feedScenarios[2]}><Grid.Root className="feed-specimens feed-specimens--three" columns={3} gap="4">{variants.map(variant => <Cell key={variant} label={variant}><ActivityStream items={updates.slice(0, 2)} prefix={`variant-${variant}`} variant={variant} /></Cell>)}</Grid.Root></Scenario>
      <Scenario {...feedScenarios[3]}><Grid.Root className="feed-specimens" columns={2} gap="4">{densities.map(density => <Cell key={density} label={density}><ActivityStream density={density} items={updates.slice(0, 2)} prefix={`density-${density}`} /></Cell>)}</Grid.Root></Scenario>
      <Scenario {...feedScenarios[4]}><EvidenceSurface data-testid="feed-dynamic" inset="lg"><DynamicFeed /></EvidenceSurface></Scenario>
      <Scenario {...feedScenarios[5]}><VStack gap="4"><Button size="sm">Before feed</Button><ScrollArea.Root className="feed-keyboard-scroll" orientation="vertical"><ScrollArea.Viewport aria-label="Keyboard Feed viewport" className="feed-keyboard-viewport"><ActivityStream items={[...updates, olderUpdate]} prefix="keyboard" /></ScrollArea.Viewport></ScrollArea.Root><Button size="sm">After feed</Button><Cell label="consumer prevention"><ActivityStream items={updates.slice(0, 2)} onKeyDown={event => event.preventDefault()} prefix="prevented" /></Cell></VStack></Scenario>
      <Scenario {...feedScenarios[6]}><EvidenceSurface data-testid="feed-rich" inset="lg"><ActivityStream prefix="rich" variant="outline" /></EvidenceSurface></Scenario>
      <Scenario {...feedScenarios[7]}><Grid.Root className="feed-specimens" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light" data-testid="feed-light"><SpecimenLabel>Light</SpecimenLabel><ActivityStream items={updates.slice(0, 2)} prefix="light" variant="outline" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark" data-testid="feed-dark"><SpecimenLabel>Dark</SpecimenLabel><ActivityStream items={updates.slice(0, 2)} prefix="dark" variant="outline" /></EvidenceSurface></Grid.Root></Scenario>
      <Scenario {...feedScenarios[8]}><EvidenceSurface as="article" className="feed-customization playground-customization-evidence playground-customization-layout" data-testid="feed-customized" inset="none"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Accent activity stream</Text><Text as="p" tone="secondary" variant="body-sm">Documented Feed variables recolor surfaces and separators while the rounded outline contains every article background.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-feed-background: var(--brick-color-accent-soft);\n--brick-feed-border-color: var(--brick-color-accent-border);\n--brick-feed-divider-color: var(--brick-color-accent-border);\n--brick-feed-radius: 1rem;`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><ActivityStream items={updates.slice(0, 2)} prefix="custom" style={customTokens} variant="outline" /></div></EvidenceSurface></Scenario>
      <Scenario {...feedScenarios[9]}><Grid.Root className="feed-specimens" columns={2} gap="4"><Cell label="320px constrained content"><div className="feed-constrained"><ActivityStream items={[{ ...updates[1], summary: "A deliberately long localized update summary wraps safely without introducing horizontal component scrolling or pushing article actions outside the focus boundary." }]} prefix="narrow" variant="outline" /></div></Cell><Cell label="RTL localized activity"><div dir="rtl"><Feed.Root aria-label="نشاط الإصدار" setSize={2} variant="outline"><Feed.Item aria-labelledby="rtl-one-title" index={0}><HStack className="feed-article-header" gap="3" wrap><Badge size="sm" tone="success">منشور</Badge><Text as="span" className="feed-meta" tone="secondary" variant="caption">منذ ٨ دقائق</Text></HStack><Text as="h3" id="rtl-one-title" variant="title-sm">تم نشر الإصدار</Text><Text as="p" tone="secondary" variant="body-sm">اكتملت اختبارات الحزمة والمتصفح بنجاح.</Text><HStack className="feed-actions" gap="3" wrap><Link href="#rtl-one-title" size="sm">عرض التحديث</Link><Button size="sm" variant="ghost">تأكيد</Button></HStack></Feed.Item><Feed.Item aria-label="مراجعة التصميم" index={1}><Text as="h3" variant="title-sm">مراجعة التصميم</Text><Text as="p" tone="secondary" variant="body-sm">المحتوى والإجراءات يتبعان اتجاه الصفحة الحقيقي.</Text></Feed.Item></Feed.Root></div></Cell></Grid.Root></Scenario>
    </VStack>
  );
}
