import { useRef, useState } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Chip } from "@flowstack-ui/brick/chip";
import { For } from "@flowstack-ui/brick/for";
import { FormatByte } from "@flowstack-ui/brick/format-byte";
import { FormatNumber } from "@flowstack-ui/brick/format-number";
import { LocaleProvider } from "@flowstack-ui/brick/locale-provider";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Stat } from "@flowstack-ui/brick/stat";
import { Text } from "@flowstack-ui/brick/text";
import { Timeline } from "@flowstack-ui/brick/timeline";
import { Marquee, useMarquee } from "@flowstack-ui/brick/marquee";

const milestones = [
  { title: "Workspace created", description: "Your shared project is ready.", time: "2026-09-01T14:00:00Z" },
  { title: "Review completed", description: "All requested changes were accepted.", time: "2026-09-07T14:00:00Z" },
] as const;
export function DataDisplaySummary() {
  const marquee = useMarquee({ autoFill: true });
  const partnerItems = () => <For each={["Northstar", "Layers", "Orbit", "Catalog"]}>{name => <Marquee.Item key={name}><Text variant="body-md" weight="medium">{name}</Text></Marquee.Item>}</For>;
  const [labels, setLabels] = useState(["Design", "Research"]), [status, setStatus] = useState("Select a discipline to review.");
  const restore = useRef<HTMLElement>(null);
  return <LocaleProvider locale="en-US"><Card.Root><Card.Content><VStack as="section" aria-label="Workspace usage and activity" gap="5">
    <Text as="h2" variant="title-lg">Workspace summary</Text>
    <HStack justify="between"><Text variant="body-sm">Our partners</Text><Button size="sm" variant="outline" aria-pressed={marquee.requestedPaused} onPress={marquee.togglePause}>{marquee.requestedPaused ? "Resume" : "Pause"} partner strip</Button></HStack>
    <Marquee.RootProvider value={marquee} aria-label="Workspace partners"><Marquee.Viewport><Marquee.Content renderReplica={partnerItems}>{partnerItems()}</Marquee.Content></Marquee.Viewport></Marquee.RootProvider>
    <Stat.Group><Stat.Root><Stat.Label>Monthly revenue</Stat.Label><Stat.ValueText><FormatNumber value={12450} formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} /></Stat.ValueText><Stat.HelpText><Stat.UpIndicator />12% above last month</Stat.HelpText></Stat.Root><Stat.Root><Stat.Label>Storage used</Stat.Label><Stat.ValueText><FormatByte value={1250000000} /></Stat.ValueText><Stat.HelpText>Of <FormatByte value={5000000000} /> available</Stat.HelpText></Stat.Root></Stat.Group>
    <HStack gap="2" wrap><For each={labels}>{label => <Chip.Root key={label} density="compact" variant="surface" tone="accent"><Chip.ActionTrigger onPress={() => setStatus(`Reviewing ${label.toLowerCase()}.`)}><Chip.Label>{label}</Chip.Label></Chip.ActionTrigger><Chip.RemoveTrigger ariaLabel={`Remove ${label} discipline`} onPress={() => { setLabels(values => values.filter(value => value !== label)); setStatus(`${label} removed.`); restore.current?.focus(); }} /></Chip.Root>}</For></HStack>
    <HStack><Button ref={restore} size="sm" variant="outline" onPress={() => { setLabels(["Design", "Research"]); setStatus("Disciplines restored."); }}>Restore disciplines</Button></HStack>
    <Text role="status" variant="body-sm">{status}</Text>
    <Timeline.Root variant="outline" tone="accent" aria-label="Project milestones"><For each={milestones}>{(event, index) => <Timeline.Item key={event.time}><Timeline.Connector><Timeline.Indicator>{index + 1}</Timeline.Indicator><Timeline.Separator /></Timeline.Connector><Timeline.Content><Timeline.Title>{event.title}</Timeline.Title><Timeline.Description>{event.description}</Timeline.Description><Timeline.Description><time dateTime={event.time}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(event.time))}</time></Timeline.Description></Timeline.Content></Timeline.Item>}</For></Timeline.Root>
  </VStack></Card.Content></Card.Root></LocaleProvider>;
}
