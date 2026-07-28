import { useEffect, useState } from "react";
import { Button, Grid, Text, Toast, Toaster, VStack, toast, type ToastPosition, type ToastType } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./toast.playground.css";

const types: ToastType[] = ["default", "success", "error", "warning", "info", "loading"];
const positions: ToastPosition[] = ["top-start", "top-center", "top-end", "bottom-start", "bottom-center", "bottom-end"];

export const toastScenarios = [
  { id: "toast.overview", number: 1, title: "Overview", description: "Create, update, and dismiss a finished default notification from application actions." },
  { id: "toast.types", number: 2, title: "Types", description: "Six semantic types retain one stable card geometry and communicate meaning in authored text." },
  { id: "toast.content", number: 3, title: "Content and actions", navigationTitle: "Content", description: "Title, description, custom icon, optional action, close policy, and persistent content use the same public anatomy." },
  { id: "toast.queue", number: 4, title: "Lifecycle and queue", navigationTitle: "Queue", description: "Three visible cards, separated or overlapping, preserve Atom-owned timing and queue promotion." },
  { id: "toast.positions", number: 5, title: "Logical positions", navigationTitle: "Positions", description: "Start and end follow document direction while center remains physically centered." },
  { id: "toast.async", number: 6, title: "Async workflows", navigationTitle: "Async", description: "Loading, stable-ID updates, and promise outcomes use the imperative helper." },
  { id: "toast.customization", number: 7, title: "Customization", navigationTitle: "Theme", description: "Width, component variables, compound parts, and scoped appearances customize paint without replacing behavior." },
  { id: "toast.keyboard", number: 8, title: "Keyboard and accessibility", navigationTitle: "Keyboard", description: "F8 reaches the notification region; focus pauses timers and Escape dismisses without global interference." },
  { id: "toast.stress", number: 9, title: "Responsive stress", navigationTitle: "Stress", description: "Long localized content, RTL, narrow layouts, reduced motion, and forced colors remain usable." },
] as const satisfies readonly ScenarioDefinition[];

function Specimen({ type, title = `${type} notification`, description = "The durable result remains available in the workspace." }: { type: ToastType; title?: string; description?: string }) {
  return <Toast.Root forceMount type={type} closeButton className="toast-specimen"><Toast.Icon type={type} /><Toast.Content><Toast.Title>{title}</Toast.Title><Toast.Description>{description}</Toast.Description></Toast.Content><Toast.Close /></Toast.Root>;
}

export function ToastPage() {
  const [position, setPosition] = useState<ToastPosition>("bottom-end");
  const [stacking, setStacking] = useState<"separated" | "overlap">("separated");
  useEffect(() => () => toast.dismiss(), []);
  const createOverview = () => toast.success("Workspace published", { description: "The release is available to reviewers.", action: { label: "View", onClick: () => undefined } });
  const createQueue = () => { toast.dismiss(); for (let index = 1; index <= 4; index += 1) toast.info(`Queued notification ${index}`, { description: index === 2 ? "This deliberately longer description verifies variable-height card separation." : "Queue evidence.", duration: Infinity }); };
  const runPromise = () => { const task = new Promise<string>((resolve) => window.setTimeout(() => resolve("Report exported"), 600)); void toast.promise(task, { loading: "Exporting report", success: (value) => value, error: "Export failed" }); };

  return <VStack className="toast-page" data-component-page="toast" data-testid="toast-workbench">
    <Toaster position={position} stacking={stacking} data-testid="toast-live-viewport" />
    <Scenario {...toastScenarios[0]}><EvidenceSurface inset="lg" data-testid="toast-overview"><div className="toast-controls"><Button onPress={createOverview}>Create success toast</Button><Button variant="outline" tone="neutral" onPress={() => toast.dismiss()}>Dismiss all</Button></div><Specimen type="success" title="Workspace published" /></EvidenceSurface></Scenario>
    <Scenario {...toastScenarios[1]}><Grid.Root columns={3} className="toast-grid" data-testid="toast-types">{types.map((type) => <Specimen key={type} type={type} />)}</Grid.Root></Scenario>
    <Scenario {...toastScenarios[2]}><Grid.Root columns={2} className="toast-grid" data-testid="toast-content"><Toast.Root forceMount type="info" closeButton><Toast.Icon type="info"><span className="toast-custom-icon">★</span></Toast.Icon><Toast.Content><Toast.Title>Custom icon</Toast.Title><Toast.Description>Consumer content replaces the default glyph.</Toast.Description><Toast.Actions><Toast.Action>Review</Toast.Action></Toast.Actions></Toast.Content><Toast.Close /></Toast.Root><Specimen type="default" title="Title-only notification" description="" /></Grid.Root></Scenario>
    <Scenario {...toastScenarios[3]}><EvidenceSurface inset="lg" data-testid="toast-queue"><div className="toast-controls"><Button onPress={createQueue}>Create four queued toasts</Button><Button variant="outline" tone="neutral" onPress={() => setStacking((value) => value === "separated" ? "overlap" : "separated")}>Stacking: {stacking}</Button></div><VStack gap="2"><Specimen type="info" title="Newest notification" /><Specimen type="success" title="Older variable-height notification" description="Longer supporting content proves that separated cards do not collide." /><Specimen type="warning" title="Oldest notification" /></VStack></EvidenceSurface></Scenario>
    <Scenario {...toastScenarios[4]}><EvidenceSurface inset="lg" data-testid="toast-positions"><div className="toast-controls toast-controls--wrap">{positions.map((value) => <Button key={value} size="sm" variant={position === value ? "solid" : "outline"} onPress={() => { setPosition(value); toast.info(value, { duration: Infinity }); }}>{value}</Button>)}</div><div dir="rtl"><Specimen type="info" title="RTL logical anatomy" description="The accent and content follow logical inline direction." /></div></EvidenceSurface></Scenario>
    <Scenario {...toastScenarios[5]}><EvidenceSurface inset="lg" data-testid="toast-async"><div className="toast-controls"><Button onPress={runPromise}>Run promise toast</Button><Button variant="outline" onPress={() => { const id = toast.loading("Uploading archive"); window.setTimeout(() => toast.update(id, { title: "Upload complete", type: "success", duration: 5000 }), 600); }}>Run stable-ID update</Button></div><Specimen type="loading" title="Exporting report" /></EvidenceSurface></Scenario>
    <Scenario {...toastScenarios[6]}><Grid.Root columns={2} className="toast-grid" data-testid="toast-customization"><EvidenceSurface data-brick-appearance="light"><Specimen type="success" title="Light appearance" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Specimen type="success" title="Dark appearance" /></EvidenceSurface></Grid.Root></Scenario>
    <Scenario {...toastScenarios[7]}><EvidenceSurface inset="lg" data-testid="toast-keyboard"><Text>Activate a persistent toast, then press F8. Tab reaches its action and close controls; Escape dismisses the focused notification.</Text><Button onPress={() => toast.warning("Review required soon", { description: "The same task remains in the activity list.", action: { label: "Review", onClick: () => undefined }, duration: Infinity })}>Create keyboard fixture</Button></EvidenceSurface></Scenario>
    <Scenario {...toastScenarios[8]}><div className="toast-phone" data-testid="toast-stress" dir="rtl"><Specimen type="error" title="تعذر حفظ مساحة العمل" description="ستظل التغييرات المحلية متاحة حتى تتمكن من إعادة المحاولة من سجل النشاط." /></div></Scenario>
  </VStack>;
}
