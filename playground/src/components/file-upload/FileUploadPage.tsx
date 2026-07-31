import { useState, type CSSProperties, type ComponentProps, type ReactNode } from "react";
import { Badge, Button, Field, FileUpload, Form, Grid, Text, VStack, type FileUploadShape, type FileUploadSize, type FileUploadVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";
import "./file-upload.playground.css";

const variants: FileUploadVariant[] = ["outline", "soft"];
const sizes: FileUploadSize[] = ["sm", "md", "lg"];
const shapes: FileUploadShape[] = ["sharp", "rounded"];
const definitions = [
  [1, "Overview", "A complete labeled File Upload combines picker, dropzone, hidden native input, and removable file list."],
  [2, "Variants", "Outline and soft recipes change surface paint while preserving the same anatomy and behavior."],
  [3, "Sizes and shapes", "Three densities and two corner treatments change the complete upload geometry."],
  [4, "Acceptance and limits", "Accepted and rejected selections use the same Atom validation rules as pre-drop feedback."],
  [5, "States", "Disabled, read-only, required, invalid, empty, and filled states remain visually and semantically distinct."],
  [6, "File content", "Multiple files, long names, byte formatting, custom action content, and removal remain contained."],
  [7, "Form and Field", "One File Upload uses one Field label and participates in native submission, validation, and reset."],
  [8, "Appearance and customization", "Light and dark scopes retain defaults while one titled, badged specimen uses public tokens."],
  [9, "Responsive and RTL", "Narrow and right-to-left layouts preserve readable files, logical actions, and touch targets."],
] as const;
export const fileUploadScenarios = definitions.map(([number, title, description]) => ({ id: `file-upload.${number}`, number, title, description })) satisfies ScenarioDefinition[];

const receipt = new File(["receipt"], "conference-receipt.pdf", { type: "application/pdf" });
const photo = new File(["photo-data"], "workspace-photo.png", { type: "image/png" });
const longFile = new File(["details"], "international-shipping-supporting-document-with-a-long-name.pdf", { type: "application/pdf" });

function Upload({ children, hint = "PDF or image, up to 5 MB.", ...props }: ComponentProps<typeof FileUpload.Root> & { hint?: string }) {
  return <FileUpload.Root accept="image/*,.pdf" maxSize={5_000_000} {...props}>
    <FileUpload.HiddenInput />
    <FileUpload.Dropzone>
      <Text as="p" variant="title-sm">Drop files here</Text>
      <Text as="p" tone="secondary" variant="body-sm">{hint}</Text>
      <FileUpload.Trigger />
    </FileUpload.Dropzone>
    <FileUpload.ItemGroup>{(file, index) => <FileUpload.Item file={file} index={index} key={`${file.name}-${index}`}><FileUpload.ItemName /><FileUpload.ItemSize /><FileUpload.ItemDeleteTrigger /></FileUpload.Item>}</FileUpload.ItemGroup>
    {children}
  </FileUpload.Root>;
}

function Labeled({ children, id, label = "Attachments" }: { children: ReactNode; id: string; label?: string }) {
  return <Field.Root id={id}><Field.Label>{label}</Field.Label>{children}<Field.Description>Add supporting files for this request.</Field.Description></Field.Root>;
}

const customTokens = { "--brick-file-upload-background": "#f5f3ff", "--brick-file-upload-border": "#7c3aed", "--brick-file-upload-trigger-background": "#6d28d9", "--brick-file-upload-radius": "1rem" } as CSSProperties;

function AcceptanceExample() {
  const [message, setMessage] = useState("No rejected files");
  return <Labeled id="file-upload-acceptance"><Upload multiple maxFiles={2} onRejectedFilesChange={files => setMessage(files.length ? `${files[0].file.name}: ${files[0].errors.join(", ")}` : "No rejected files")}><output className="forms-status" aria-live="polite"><Text as="span">{message}</Text></output></Upload></Labeled>;
}

export function FileUploadPage() {
  const [status, setStatus] = useState("No form event yet");
  return <VStack className="forms-page file-upload-page" data-component-page="file-upload">
    <Scenario {...fileUploadScenarios[0]}><EvidenceSurface className="forms-overview" data-testid="file-upload-overview" inset="lg"><Labeled id="file-upload-overview-field"><Upload defaultFiles={[receipt]} name="attachments" /></Labeled></EvidenceSurface></Scenario>
    <Scenario {...fileUploadScenarios[1]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="file-upload-variants">{variants.map(variant => <Cell key={variant} label={variant}><Labeled id={`file-upload-variant-${variant}`}><Upload variant={variant} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...fileUploadScenarios[2]}><VStack className="forms-evidence-stack" data-testid="file-upload-recipes"><EvidenceGroup title="Sizes" description="The content stays fixed while the whole upload changes density."><Grid.Root columns={3} className="forms-grid forms-grid--three">{sizes.map(size => <Cell key={size} label={size}><Labeled id={`file-upload-size-${size}`}><Upload size={size} /></Labeled></Cell>)}</Grid.Root></EvidenceGroup><EvidenceGroup title="Shapes" description="Sharp and rounded alter only the component boundary treatment."><Grid.Root columns={2} className="forms-grid forms-grid--two">{shapes.map(shape => <Cell key={shape} label={shape}><Labeled id={`file-upload-shape-${shape}`}><Upload shape={shape} /></Labeled></Cell>)}</Grid.Root></EvidenceGroup></VStack></Scenario>
    <Scenario {...fileUploadScenarios[3]}><EvidenceSurface data-testid="file-upload-acceptance" inset="lg"><AcceptanceExample /></EvidenceSurface></Scenario>
    <Scenario {...fileUploadScenarios[4]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="file-upload-states"><Cell label="disabled"><Labeled id="file-upload-disabled"><Upload disabled /></Labeled></Cell><Cell label="read-only filled"><Labeled id="file-upload-readonly"><Upload defaultFiles={[receipt]} readOnly /></Labeled></Cell><Cell label="invalid and required"><Field.Root id="file-upload-invalid" invalid required><Field.Label>Attachments</Field.Label><Upload /><Field.Error>Add at least one file.</Field.Error></Field.Root></Cell></Grid.Root></Scenario>
    <Scenario {...fileUploadScenarios[5]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="file-upload-content"><Cell label="multiple files"><Labeled id="file-upload-multiple"><Upload defaultFiles={[receipt, photo]} multiple /></Labeled></Cell><Cell label="long name and custom action"><Labeled id="file-upload-long"><FileUpload.Root defaultFiles={[longFile]}><FileUpload.HiddenInput /><FileUpload.Dropzone><Text as="p" variant="title-sm">Supporting document</Text><FileUpload.Trigger>Select document</FileUpload.Trigger></FileUpload.Dropzone><FileUpload.ItemGroup>{file => <FileUpload.Item file={file} key={file.name}><FileUpload.ItemName /><FileUpload.ItemSize /><FileUpload.ItemDeleteTrigger>Delete</FileUpload.ItemDeleteTrigger></FileUpload.Item>}</FileUpload.ItemGroup></FileUpload.Root></Labeled></Cell></Grid.Root></Scenario>
    <Scenario {...fileUploadScenarios[6]}><EvidenceSurface className="forms-overview" data-testid="file-upload-form"><Form aria-label="Attachment form" preventDefaultOnSubmit validationBehavior="inline" onReset={() => setStatus("Form reset")} onSubmit={event => setStatus(`Submitted files: ${(new FormData(event.currentTarget).getAll("documents") as File[]).filter(value => value instanceof File && value.name).length}`)}><Field.Root id="file-upload-form-field" required><Field.Label>Documents</Field.Label><Upload name="documents" multiple /><Field.Error>Add at least one document.</Field.Error></Field.Root><Button type="submit">Save attachments</Button><Button type="reset" variant="outline">Reset</Button><output className="forms-status"><Text as="span">{status}</Text></output></Form></EvidenceSurface></Scenario>
    <Scenario {...fileUploadScenarios[7]}><VStack className="forms-evidence-stack" data-testid="file-upload-appearance"><EvidenceGroup title="Scoped appearances" description="Compact badges identify the same File Upload defaults inside light and dark scopes."><Grid.Root columns={2} className="forms-scoped-grid"><EvidenceSurface data-brick-appearance="light"><Badge size="sm">Light</Badge><Labeled id="file-upload-light"><Upload defaultFiles={[receipt]} /></Labeled></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Badge size="sm">Dark</Badge><Labeled id="file-upload-dark"><Upload defaultFiles={[receipt]} /></Labeled></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The titled preview uses only documented File Upload variables."><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><Badge size="sm">Customized</Badge><Text as="h4" variant="title-sm">Violet attachment area</Text><Text as="p" tone="secondary" variant="body-sm">A scoped surface, border, action, and radius distinguish one upload.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-file-upload-background: #f5f3ff;\n--brick-file-upload-border: #7c3aed;\n--brick-file-upload-trigger-background: #6d28d9;\n--brick-file-upload-radius: 1rem;`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><Labeled id="file-upload-custom"><Upload style={customTokens} /></Labeled></EvidenceSurface></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...fileUploadScenarios[8]}><VStack className="forms-evidence-stack" data-testid="file-upload-stress"><EvidenceGroup title="Constrained-width stress" description="Long file content truncates inside a narrow application-owned frame."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Labeled id="file-upload-narrow"><Upload defaultFiles={[longFile]} /></Labeled></div></EvidenceSurface></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="Arabic copy and the file action follow the genuine right-to-left flow."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Labeled id="file-upload-rtl" label="المرفقات"><Upload defaultFiles={[photo]} dir="rtl" hint="صور أو مستندات PDF" /></Labeled></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
