import { useState } from "react";
import { Alert, Appearance, Button, CloseButton, For, Frame, HStack, Link, Spinner, Text, VStack, type AlertRootProps } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const alertScenarios = [
  { id: "alert.basic", number: 1, title: "Title only", description: "Persistent inline feedback without an automatic live role." },
  { id: "alert.description", number: 2, title: "Description", description: "A title and supporting detail." },
  { id: "alert.statuses", number: 3, title: "Statuses", description: "Status selects the default indicator and palette." },
  { id: "alert.variants", number: 4, title: "Variants", description: "Four recipes retain the same border-box geometry." },
  { id: "alert.sizes", number: 5, title: "Sizes", description: "Three coordinated typography, spacing and indicator sizes." },
  { id: "alert.tone", number: 6, title: "Palette override", description: "Paint can change without changing the message status." },
  { id: "alert.inline", number: 7, title: "Inline content", description: "Title and description wrap naturally in one content row." },
  { id: "alert.close", number: 8, title: "Dismissal composition", description: "Application state owns dismissal; focus returns to the restore action." },
  { id: "alert.loading", number: 9, title: "Loading indicator", description: "A decorative Spinner inside the indicator slot." },
  { id: "alert.custom", number: 10, title: "Custom indicator", description: "Authored glyph replaces the default status icon." },
  { id: "alert.no-icon", number: 11, title: "No indicator", description: "Content does not reserve an empty icon column." },
  { id: "alert.actions", number: 12, title: "Actions and links", description: "Use ordinary named actions without changing Alert semantics." },
  { id: "alert.rich", number: 13, title: "Rich content", description: "Supporting content can have multiple distinct paragraphs." },
  { id: "alert.semantics", number: 14, title: "Announcement policy", description: "A dynamic polite update is an explicit application choice." },
  { id: "alert.narrow", number: 15, title: "Localized and narrow", description: "Long copy wraps beside a nonshrinking indicator." },
  { id: "alert.appearance", number: 16, title: "Appearances", description: "Matched recipes in light and dark, including warning solid paint." },
] as const;

function Notice(props: Pick<AlertRootProps, "status" | "tone" | "size" | "variant" | "inline">) {
  return <Alert.Root {...props}><Alert.Indicator /><Alert.Content><Alert.Title>Changes saved</Alert.Title><Alert.Description>Your team can now view the updated project.</Alert.Description></Alert.Content></Alert.Root>;
}
export function AlertEvidence() {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  return <VStack data-component-page="alert" gap="6">
    <Scenario {...alertScenarios[0]}><Specimen label="Persistent"><Alert.Root><Alert.Indicator /><Alert.Title>Changes saved</Alert.Title></Alert.Root></Specimen></Scenario>
    <Scenario {...alertScenarios[1]}><Specimen label="Supporting detail"><Notice /></Specimen></Scenario>
    <Scenario {...alertScenarios[2]}><VStack gap="4"><For each={["info", "warning", "success", "error", "neutral"] as const}>{status => <Specimen key={status} label={status}><Notice status={status} /></Specimen>}</For></VStack></Scenario>
    <Scenario {...alertScenarios[3]}><VStack gap="4"><For each={["soft", "surface", "outline", "solid"] as const}>{variant => <Specimen key={variant} label={variant}><Notice variant={variant} /></Specimen>}</For></VStack></Scenario>
    <Scenario {...alertScenarios[4]}><VStack gap="4"><For each={["sm", "md", "lg"] as const}>{size => <Specimen key={size} label={size}><Notice size={size} /></Specimen>}</For></VStack></Scenario>
    <Scenario {...alertScenarios[5]}><Specimen label="Success with accent"><Notice status="success" tone="accent" /></Specimen></Scenario>
    <Scenario {...alertScenarios[6]}><Specimen label="Inline"><Notice inline /></Specimen></Scenario>
    <Scenario {...alertScenarios[7]}><Specimen label="Dismiss and restore"><VStack gap="3"><Button id="restore-alert" onClick={() => setVisible(true)}>Restore notice</Button>{visible && <Alert.Root><Alert.Content><Alert.Title>Changes saved</Alert.Title></Alert.Content><CloseButton size="xs" aria-label="Dismiss notice" onClick={() => { setVisible(false); document.getElementById("restore-alert")?.focus(); }} /></Alert.Root>}</VStack></Specimen></Scenario>
    <Scenario {...alertScenarios[8]}><Specimen label="Preparing"><Alert.Root><Alert.Indicator><Spinner size="inherit" /></Alert.Indicator><Alert.Title>Preparing your export…</Alert.Title></Alert.Root></Specimen></Scenario>
    <Scenario {...alertScenarios[9]}><Specimen label="Custom glyph"><Alert.Root><Alert.Indicator><Text aria-hidden="true">!</Text></Alert.Indicator><Alert.Title>Review the workspace settings.</Alert.Title></Alert.Root></Specimen></Scenario>
    <Scenario {...alertScenarios[10]}><Specimen label="Content only"><Alert.Root><Alert.Content><Alert.Title>Changes saved</Alert.Title><Alert.Description>Your project is up to date.</Alert.Description></Alert.Content></Alert.Root></Specimen></Scenario>
    <Scenario {...alertScenarios[11]}><Specimen label="Recovery"><Alert.Root status="error"><Alert.Indicator /><Alert.Content><Alert.Title>Upload interrupted</Alert.Title><Alert.Description>Your draft is safe. <Link href="#restore-alert">Review the project</Link></Alert.Description><HStack gap="3" wrap><Button size="sm" variant="outline" tone="neutral" onClick={() => setMessage("Retry requested.")}>Retry upload</Button></HStack></Alert.Content></Alert.Root></Specimen></Scenario>
    <Scenario {...alertScenarios[12]}><Specimen label="Details"><Alert.Root><Alert.Content><Alert.Title>Before inviting your team</Alert.Title><Alert.Description><VStack gap="2"><Text>Confirm the project name.</Text><Text>Choose each member’s access level.</Text></VStack></Alert.Description></Alert.Content></Alert.Root></Specimen></Scenario>
    <Scenario {...alertScenarios[13]}><Specimen label="Polite update"><VStack gap="3"><Button onClick={() => setMessage("Your export is ready.")}>Complete export</Button><Alert.Root role="status"><Alert.Content><Alert.Description>{message || "No export updates yet."}</Alert.Description></Alert.Content></Alert.Root></VStack></Specimen></Scenario>
    <Scenario {...alertScenarios[14]}><Specimen label="Arabic"><Frame maxInlineSize="20rem"><Alert.Root dir="rtl" lang="ar"><Alert.Indicator /><Alert.Content><Alert.Title>تم حفظ التغييرات</Alert.Title><Alert.Description>يمكن لفريقك الآن عرض المشروع المحدّث ومشاركة المستندات بأمان.</Alert.Description></Alert.Content></Alert.Root></Frame></Specimen></Scenario>
    <Scenario {...alertScenarios[15]}><VStack gap="4"><For each={["light", "dark"] as const}>{appearance => <Appearance key={appearance} value={appearance}><Specimen label={appearance}><VStack gap="3"><Notice variant="surface" /><Notice status="warning" variant="solid" /></VStack></Specimen></Appearance>}</For></VStack></Scenario>
  </VStack>;
}
