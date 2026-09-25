import { For, VStack } from "@flowstack-ui/brick";
import { usePreviewContext } from "../../preview/PreviewContext.js";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { DialogEvidence } from "./DialogEvidence.js";
import { Basic, basicSource, examples, rootRows, positionerRows, contentRows, portalRows, closeRows, footerRows, parts } from "./documentation.js";
export { dialogScenarios } from "./DialogEvidence.js";
export function DialogPage() {
 const preview = usePreviewContext();
 if (preview || (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("qualification") === "1")) return <DialogEvidence/>;
 return <VStack gap={12} data-component-page="dialog">
 <ExamplePreview label="Dialog basic" source={basicSource}><Basic/></ExamplePreview>
 <DocsSection id="usage" title="Usage" level={2} description="Keep the scrim separate from the owned scrolling positioner. Content supplies the accessible dialog.">
 <ExampleSource label="Dialog import" source={'import { Dialog } from "@flowstack-ui/brick";'}/>
 <ExampleSource label="Dialog usage" source={'<Dialog.Root>\n  <Dialog.Trigger />\n  <Dialog.Portal>\n    <Dialog.Overlay />\n    <Dialog.Positioner>\n      <Dialog.Content>\n        <Dialog.Header><Dialog.Title>Title</Dialog.Title></Dialog.Header>\n        <Dialog.Body>Content</Dialog.Body>\n        <Dialog.Footer />\n      </Dialog.Content>\n    </Dialog.Positioner>\n  </Dialog.Portal>\n</Dialog.Root>'}/>
 </DocsSection>
 <DocsSection id="examples" title="Examples" level={2}><VStack gap={16}><For each={examples}>{({id,title,description,Demo,source})=><DocsSection key={id} id={id} title={title} description={description} level={3}><ExamplePreview label={title} source={source}><Demo/></ExamplePreview></DocsSection>}</For></VStack></DocsSection>
 <DocsSection id="props" title="Props" level={2} description="Native attributes and refs are forwarded by DOM parts. Trigger supports asChild; Title supports h1 through h6. Header, Body and Description provide their named regions.">
 <DocsSection {...parts[0]} level={3}><PropsTable label="Dialog Root props" rows={rootRows}/></DocsSection>
<DocsSection {...parts[1]} level={3}><PropsTable label="Dialog Positioner props" rows={positionerRows}/></DocsSection>
<DocsSection {...parts[2]} level={3}><PropsTable label="Dialog Content props" rows={contentRows}/></DocsSection>
<DocsSection {...parts[3]} level={3}><PropsTable label="Dialog Portal props" rows={portalRows}/></DocsSection>
<DocsSection {...parts[4]} level={3}><PropsTable label="Dialog Close props" rows={closeRows}/></DocsSection>
<DocsSection {...parts[5]} level={3}><PropsTable label="Dialog Footer props" rows={footerRows}/></DocsSection>
 </DocsSection></VStack>;
}
