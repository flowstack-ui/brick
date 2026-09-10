import { useState } from "react";
import { Button, Frame, HStack, Splitter, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
export const splitterScenarios = [
  { id: "splitter.workspace", number: 1, title: "Workspace", description: "Adjacent panes with a centered boundary and independent pointer target." },
  { id: "splitter.vertical", number: 2, title: "Vertical", description: "Stacked regions retain the same handle geometry." },
  { id: "splitter.controlled", number: 3, title: "Controlled RTL", description: "The parent owns proportions; physical arrow movement respects RTL." },
  { id: "splitter.nested", number: 4, title: "Nested panels", description: "Three outer panels and an independent vertical editor split." },
  { id: "splitter.pixels", number: 5, title: "Pixel constraints", description: "A file pane preserves its measured width as the host changes." },
  { id: "splitter.disabled", number: 6, title: "Disabled boundary", description: "The boundary remains visible while its grip is unavailable." },
  { id: "splitter.constraints", number: 7, title: "Bounds and custom handle", description: "Maximum size, a nonzero collapsed rail and a composed public handle." },
] as const;
export function SplitterPage() {
  const [sizes, setSizes] = useState({ files: 30, editor: 70 });
  return <VStack gap="6" data-component-page="splitter">
    <Scenario {...splitterScenarios[0]}><Specimen label="Files and editor">
      <VStack gap="4"><Frame blockSize={240} asChild>
        <Splitter.Root data-testid="splitter-workspace" panels={[{ id: "files", minSize: 20, collapsible: true }, { id: "editor", minSize: 25 }]} defaultSizes={{ files: 30, editor: 70 }}>
          <Splitter.Panel panelId="files"><Text>Project files</Text></Splitter.Panel>
          <Splitter.ResizeTrigger before="files" after="editor" aria-label="Project files width" />
          <Splitter.Panel panelId="editor"><HStack startSpacing="4" endSpacing="4"><VStack gap="3"><Text>Document editor</Text><Splitter.Context>{api => <HStack gap="2" wrap><Button size="sm" variant="outline" onClick={() => api.isPanelCollapsed("files") ? api.expandPanel("files") : api.collapsePanel("files")}>{api.isPanelCollapsed("files") ? "Show files" : "Hide files"}</Button><Button size="sm" variant="ghost" onClick={api.resetSizes}>Reset workspace</Button></HStack>}</Splitter.Context></VStack></HStack></Splitter.Panel>
        </Splitter.Root>
      </Frame><Text tone="secondary">Use arrow keys to resize. Enter collapses or restores the files pane.</Text></VStack>
    </Specimen></Scenario>
    <Scenario {...splitterScenarios[1]}><Specimen label="Editor and output"><Frame blockSize={320} asChild>
      <Splitter.Root orientation="vertical" data-testid="splitter-vertical" panels={[{ id: "editor", minSize: 20 }, { id: "output", minSize: 20 }]}>
        <Splitter.Panel panelId="editor"><Text>Editor</Text></Splitter.Panel><Splitter.ResizeTrigger before="editor" after="output" aria-label="Editor height" /><Splitter.Panel panelId="output"><Text>Build output</Text></Splitter.Panel>
      </Splitter.Root>
    </Frame></Specimen></Scenario>
    <Scenario {...splitterScenarios[2]}><Specimen label="Controlled workspace"><VStack gap="4">
      <Button variant="outline" onClick={() => setSizes({ files: 30, editor: 70 })}>Reset panel sizes</Button>
      <Frame blockSize={200} asChild><Splitter.Root dir="rtl" sizes={sizes} onResize={d => setSizes({ files: d.sizes.files!, editor: d.sizes.editor! })} panels={[{ id: "files", minSize: 20 }, { id: "editor", minSize: 20 }]}>
        <Splitter.Panel panelId="files"><Text>Files</Text></Splitter.Panel><Splitter.ResizeTrigger before="files" after="editor" aria-label="Controlled files width" /><Splitter.Panel panelId="editor"><Text>Editor</Text></Splitter.Panel>
      </Splitter.Root></Frame>
    </VStack></Specimen></Scenario>
    <Scenario {...splitterScenarios[3]}><Specimen label="Editor workspace"><Frame blockSize={260} asChild>
      <Splitter.Root panels={[{ id: "files", minSize: 10 }, { id: "editor", minSize: 30 }, { id: "inspector", minSize: 10 }]} defaultSizes={{ files: 20, editor: 60, inspector: 20 }}>
        <Splitter.Panel panelId="files"><Text>Files</Text></Splitter.Panel><Splitter.ResizeTrigger before="files" after="editor" aria-label="Workspace files width" />
        <Splitter.Panel panelId="editor"><Frame blockSize="100%" asChild><Splitter.Root orientation="vertical" panels={[{ id: "document", minSize: 20 }, { id: "console", minSize: 20 }]}>
          <Splitter.Panel panelId="document"><Text>Document</Text></Splitter.Panel><Splitter.ResizeTrigger before="document" after="console" aria-label="Document height" /><Splitter.Panel panelId="console"><Text>Console</Text></Splitter.Panel>
        </Splitter.Root></Frame></Splitter.Panel><Splitter.ResizeTrigger before="editor" after="inspector" aria-label="Editor width" /><Splitter.Panel panelId="inspector"><Text>Inspector</Text></Splitter.Panel>
      </Splitter.Root>
    </Frame></Specimen></Scenario>
    <Scenario {...splitterScenarios[4]}><Specimen label="Fixed file pane"><Frame blockSize={200} asChild>
      <Splitter.Root panels={[{ id: "files", minSize: "100px", resizeBehavior: "preserve-pixels" }, { id: "editor", minSize: 20 }]} defaultSizes={{ files: "180px" }}>
        <Splitter.Panel panelId="files"><Text>Files</Text></Splitter.Panel><Splitter.ResizeTrigger before="files" after="editor" aria-label="Fixed files width" /><Splitter.Panel panelId="editor"><Text>Editor</Text></Splitter.Panel>
      </Splitter.Root>
    </Frame></Specimen></Scenario>
    <Scenario {...splitterScenarios[5]}><Specimen label="Locked workspace"><Frame blockSize={160} asChild>
      <Splitter.Root disabled panels={[{ id: "files" }, { id: "editor" }]}>
        <Splitter.Panel panelId="files"><Text>Files</Text></Splitter.Panel><Splitter.ResizeTrigger before="files" after="editor" aria-label="Locked files width" /><Splitter.Panel panelId="editor"><Text>Editor</Text></Splitter.Panel>
      </Splitter.Root>
    </Frame></Specimen></Scenario>
    <Scenario {...splitterScenarios[6]}><Specimen label="Collapsible rail"><Frame blockSize={240} asChild><Splitter.Root panels={[{ id: "rail", minSize: 20, maxSize: 45, collapsible: true, collapsedSize: 8 }, { id: "content", minSize: 40 }]} defaultSizes={{ rail: 30, content: 70 }}>
      <Splitter.Panel panelId="rail"><Text>Files</Text></Splitter.Panel><Splitter.ResizeTrigger before="rail" after="content" aria-label="Navigation rail width"><Splitter.ResizeTriggerSeparator /><Splitter.ResizeTriggerIndicator /></Splitter.ResizeTrigger>
      <Splitter.Panel panelId="content"><HStack startSpacing="4" endSpacing="4"><VStack gap="3"><Text>Content remains available when the rail collapses.</Text><Splitter.Context>{api => <HStack gap="2" wrap><Button variant="outline" size="sm" onClick={() => api.collapsePanel("rail")}>Collapse rail</Button><Button variant="outline" size="sm" onClick={() => api.expandPanel("rail")}>Expand rail</Button></HStack>}</Splitter.Context></VStack></HStack></Splitter.Panel>
    </Splitter.Root></Frame></Specimen></Scenario>
  </VStack>;
}
