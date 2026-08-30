import { Prose, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const proseScenarios = [
  { id: "prose.overview", number: 1, title: "Overview", description: "Trusted native editorial content receives coherent typography, rhythm, and a readable measure without parsing or rewriting its tree." },
  { id: "prose.scale", number: 2, title: "Size and measure", navigationTitle: "Scale", description: "Closed content sizes and reading measures adapt one complete article rather than isolated type samples." },
  { id: "prose.content", number: 3, title: "Editorial descendants", navigationTitle: "Content", description: "Links, lists, quotations, tables, code, rules, and media share one finished reading language." },
  { id: "prose.adaptation", number: 4, title: "Responsive and RTL", navigationTitle: "Adaptation", description: "Narrow regions, long technical content, localization, RTL, and direct Brick typography remain contained." },
] as const satisfies readonly ScenarioDefinition[];

function ArticleSample({ title = "Designing release evidence" }: { title?: string }) {
  return (
    <>
      <h1>{title}</h1>
      <p>A durable release connects public contracts, automated evidence, and careful review before consumers adopt a new version.</p>
      <h2>Keep the boundary explicit</h2>
      <p>Use <a href="#verification">verification evidence</a> to distinguish a finished owner from application policy.</p>
      <ul><li>Resolve exact package guidance.</li><li>Exercise the public archive.</li><li>Inspect responsive output.</li></ul>
    </>
  );
}

export function ProsePage() {
  return (
    <VStack data-component-page="prose" gap="6">
      <Scenario {...proseScenarios[0]}>
        <EvidenceSurface data-testid="prose-overview" inset="lg">
          <Prose as="article"><ArticleSample /></Prose>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...proseScenarios[1]}>
        <VStack data-testid="prose-scale" gap="5">
          <EvidenceSurface inset="lg"><Prose measure="narrow" size="sm"><ArticleSample title="Compact field notes" /></Prose></EvidenceSurface>
          <EvidenceSurface inset="lg"><Prose measure="wide" size="lg"><ArticleSample title="Expanded editorial guide" /></Prose></EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...proseScenarios[2]}>
        <EvidenceSurface data-testid="prose-content" inset="lg">
          <Prose>
            <h2>Qualification record</h2>
            <blockquote><p>Evidence is useful only when it proves the public boundary consumers actually receive.</p><cite>Release practice</cite></blockquote>
            <p>Run <code>npm run check:repository</code>, then compare the candidate archive.</p>
            <pre><code>{`import { Prose } from "@flowstack-ui/brick/prose";\n\nexport function Guide() {\n  return <Prose>{content}</Prose>;\n}`}</code></pre>
            <table><thead><tr><th>Owner</th><th>Evidence</th></tr></thead><tbody><tr><td>Package</td><td>Archive integrity</td></tr><tr><td>Consumer</td><td>Runtime and types</td></tr></tbody></table>
            <hr />
            <figure><img alt="Abstract workspace landscape" src="/assets/image/workspace-landscape.png" /><figcaption>Responsive media remains within the reading measure.</figcaption></figure>
          </Prose>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...proseScenarios[3]}>
        <EvidenceSurface data-testid="prose-adaptation" inset="lg">
          <Prose className="consumer-prose" data-owner="playground" dir="rtl" lang="ar" measure="narrow">
            <h2>إرشادات إصدار واضحة</h2>
            <p>يحافظ المحتوى الطويل على ترتيب القراءة، بما في ذلك <code dir="ltr">package/really-long-generated-module-name/without-breakpoints.ts</code>.</p>
            <ol><li>تحقق من العقد العام.</li><li>اختبر الحزمة المنشورة.</li></ol>
            <Text as="p" tone="secondary">Direct Brick Text keeps its own finished class contract.</Text>
          </Prose>
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
