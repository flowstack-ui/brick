import { Info, Users } from "lucide-react";
import { Appearance, Badge, Card, For, FormatByte, FormatNumber, Frame, Grid, Icon, IconButton, LocaleProvider, Progress, Skeleton, Stat, Text, Tooltip, VStack, type StatSize } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const statScenarios = [
  { id: "stat.basic", number: 1, title: "Basic metric", description: "A native label and value with authored comparison text." },
  { id: "stat.sizes", number: 2, title: "Sizes", description: "Value typography changes together with line height." },
  { id: "stat.formats", number: 3, title: "Number formats", description: "Existing Intl helpers own formatting, not Stat." },
  { id: "stat.locales", number: 4, title: "Locales and bytes", description: "Provider inheritance and explicit overrides use the same metric anatomy." },
  { id: "stat.units", number: 5, title: "Units and long values", description: "Authored units align to the numeric baseline without cropping." },
  { id: "stat.trends", number: 6, title: "Direction and meaning", description: "A lower cost can be good; direction does not dictate desirability." },
  { id: "stat.icons", number: 7, title: "Icons and information", description: "Label icons and named tooltip triggers compose independently." },
  { id: "stat.support", number: 8, title: "Supporting content", description: "Trend badges and progress belong to their own components." },
  { id: "stat.group", number: 9, title: "Grouped metrics", description: "Group supplies inherited size defaults; explicit root sizes win." },
  { id: "stat.values", number: 10, title: "Value boundaries", description: "Zero, negative and unavailable are different authored values." },
  { id: "stat.appearance", number: 11, title: "Appearance and RTL", description: "Surface-free metrics retain hierarchy in nested appearances and constrained layouts." },
] as const satisfies readonly ScenarioDefinition[];

function Revenue({ size }: { size?: StatSize }) {
  return <Stat.Root size={size}><Stat.Label>Monthly revenue</Stat.Label>
    <Stat.ValueText><FormatNumber value={12450} formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} /></Stat.ValueText>
    <Stat.HelpText><Stat.UpIndicator />12% higher than last month</Stat.HelpText>
  </Stat.Root>;
}

export function StatPage() {
  return <VStack gap="8" data-component-page="stat">
    <Scenario {...statScenarios[0]}><Specimen label="Default"><Revenue /></Specimen></Scenario>
    <Scenario {...statScenarios[1]}><Grid.Root columns={{ initial: 1, md: 3 }} gap="4"><For each={["sm", "md", "lg"] as const}>{size => <Specimen key={size} label={size}><Revenue size={size} /></Specimen>}</For></Grid.Root></Scenario>
    <Scenario {...statScenarios[2]}><Grid.Root columns={{ initial: 1, md: 2 }} gap="4"><For each={[
      { name: "Integer", value: 12345, options: { maximumFractionDigits: 0 } },
      { name: "Decimal", value: 12345.67, options: { minimumFractionDigits: 2 } },
      { name: "Currency", value: 12345.67, options: { style: "currency", currency: "EUR" } },
      { name: "Percent", value: 0.127, options: { style: "percent", maximumFractionDigits: 1 } },
      { name: "Compact", value: 1234500, options: { notation: "compact" } },
    ] as const}>{item => <Specimen key={item.name} label={item.name}><Stat.Root><Stat.Label>Account metric</Stat.Label><Stat.ValueText><FormatNumber value={item.value} formatOptions={item.options} /></Stat.ValueText></Stat.Root></Specimen>}</For></Grid.Root></Scenario>
    <Scenario {...statScenarios[3]}><Grid.Root columns={{ initial: 1, md: 2 }} gap="4"><For each={["en-US", "de-DE", "ar-EG"]}>{locale => <LocaleProvider key={locale} locale={locale}><Specimen label={locale}><Stat.Root>
      <Stat.Label>Storage used</Stat.Label><Stat.ValueText><FormatByte value={1250000000} /></Stat.ValueText>
      <Stat.HelpText><FormatNumber value={1234.56} /> / <FormatNumber locale="en-US" value={1234.56} /></Stat.HelpText>
    </Stat.Root></Specimen></LocaleProvider>}</For></Grid.Root></Scenario>
    <Scenario {...statScenarios[4]}><Specimen label="Authored unit"><Frame maxInlineSize="20rem"><Stat.Root><Stat.Label>Average latency</Stat.Label><Stat.ValueText><FormatNumber value={123.4} /><Stat.ValueUnit>milliseconds</Stat.ValueUnit></Stat.ValueText><Stat.HelpText>Measured across all successful requests</Stat.HelpText></Stat.Root></Frame></Specimen></Scenario>
    <Scenario {...statScenarios[5]}><Grid.Root columns={{ initial: 1, md: 3 }} gap="4"><Specimen label="Higher revenue"><Revenue /></Specimen><Specimen label="Lower cost"><Stat.Root><Stat.Label>Cost per request</Stat.Label><Stat.ValueText><FormatNumber value={0.02} formatOptions={{ style: "currency", currency: "USD" }} /></Stat.ValueText><Stat.HelpText><Stat.DownIndicator tone="success" />8% lower than last month</Stat.HelpText></Stat.Root></Specimen><Specimen label="Neutral trend"><Stat.Root><Stat.Label>Requests</Stat.Label><Stat.ValueText><FormatNumber value={12450} /></Stat.ValueText><Stat.HelpText><Stat.UpIndicator tone="neutral" />2% more requests</Stat.HelpText></Stat.Root></Specimen></Grid.Root></Scenario>
    <Scenario {...statScenarios[6]}><Specimen label="Label adornments"><Stat.Root><Stat.Label><Icon size="sm"><Users /></Icon>Active members
      <Tooltip.Root><Tooltip.Trigger asChild><IconButton size="xs" aria-label="About active members"><Info /></IconButton></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Members active in the last 30 days.</Tooltip.Content></Tooltip.Portal></Tooltip.Root>
    </Stat.Label><Stat.ValueText>124</Stat.ValueText></Stat.Root></Specimen></Scenario>
    <Scenario {...statScenarios[7]}><VStack gap="4"><Specimen label="Trend badge"><Stat.Root><Stat.Label>Annual revenue</Stat.Label><Stat.ValueText><FormatNumber value={124000} formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }} /></Stat.ValueText><Stat.HelpText><Badge tone="success" size="sm">+12%</Badge>Year over year</Stat.HelpText></Stat.Root></Specimen><Specimen label="Progress"><Stat.Root><Stat.Label>Storage quota</Stat.Label><Stat.ValueText><FormatByte value={750000000} /></Stat.ValueText><Stat.HelpText asChild><dd><Progress.Root value={75} aria-label="Storage quota used"><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root></dd></Stat.HelpText></Stat.Root></Specimen></VStack></Scenario>
    <Scenario {...statScenarios[8]}><Card.Root><Card.Content><Stat.Group size="lg"><Revenue /><Revenue size="sm" /><Stat.Root><Stat.Label>Storage</Stat.Label><Stat.ValueText><FormatByte value={4500000000} /></Stat.ValueText></Stat.Root></Stat.Group></Card.Content></Card.Root></Scenario>
    <Scenario {...statScenarios[9]}><Grid.Root columns={{ initial: 1, md: 3 }} gap="4"><For each={[0, -125, 1234567890123] as const}>{value => <Specimen key={value} label={String(value)}><Stat.Root><Stat.Label>Balance</Stat.Label><Stat.ValueText><FormatNumber value={value} /></Stat.ValueText></Stat.Root></Specimen>}</For><Specimen label="Unavailable"><Stat.Root><Stat.Label>Forecast</Stat.Label><Stat.ValueText>Unavailable</Stat.ValueText><Stat.HelpText>Not enough historical data</Stat.HelpText></Stat.Root></Specimen><Specimen label="Loading"><Stat.Root aria-busy="true"><Stat.Label>Revenue</Stat.Label><Stat.ValueText><Skeleton width="8rem" height="2rem" /></Stat.ValueText><Stat.HelpText>Loading revenue</Stat.HelpText></Stat.Root></Specimen></Grid.Root></Scenario>
    <Scenario {...statScenarios[10]}><VStack gap="4"><For each={["light", "dark"] as const}>{appearance => <Appearance key={appearance} value={appearance}><Specimen label={appearance}><Frame maxInlineSize="20rem"><LocaleProvider locale="ar-EG"><Stat.Root dir="rtl" lang="ar"><Stat.Label>إجمالي الإيرادات</Stat.Label><Stat.ValueText><FormatNumber value={12345.67} formatOptions={{ style: "currency", currency: "USD" }} /></Stat.ValueText><Stat.HelpText>مقارنة بالشهر الماضي</Stat.HelpText></Stat.Root></LocaleProvider></Frame></Specimen></Appearance>}</For><Text variant="body-sm" tone="secondary">The metric owns no card background.</Text></VStack></Scenario>
  </VStack>;
}
