import type { CSSProperties } from "react";
import { Grid, Prose, Text, VStack } from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const proseScenarios = [
  {
    id: "prose.overview",
    number: 1,
    title: "Overview",
    description:
      "Trusted native editorial content receives coherent typography, rhythm, and a readable measure without parsing or rewriting its tree.",
  },
  {
    id: "prose.scale",
    number: 2,
    title: "Size and measure",
    navigationTitle: "Scale",
    description:
      "Closed content sizes and reading measures adapt one complete article rather than isolated type samples.",
  },
  {
    id: "prose.content",
    number: 3,
    title: "Editorial descendants",
    navigationTitle: "Content",
    description:
      "Links, lists, quotations, tables, code, rules, and media share one finished reading language.",
  },
  {
    id: "prose.adaptation",
    number: 4,
    title: "Responsive and RTL",
    navigationTitle: "Adaptation",
    description:
      "Narrow regions, long technical content, localization, RTL, and direct Brick typography remain contained.",
  },
] as const satisfies readonly ScenarioDefinition[];

function ArticleSample({
  title = "Designing release evidence",
}: {
  title?: string;
}) {
  return (
    <>
      <h1>{title}</h1>
      <p>
        A durable release connects public contracts, automated evidence, and
        careful review before consumers adopt a new version.
      </p>
      <h2>Keep the boundary explicit</h2>
      <p>
        Use <a href="#verification">verification evidence</a> to distinguish a
        finished owner from application policy.
      </p>
      <ul>
        <li>Resolve exact package guidance.</li>
        <li>Exercise the public archive.</li>
        <li>Inspect responsive output.</li>
      </ul>
    </>
  );
}

export function ProsePage() {
  return (
    <VStack data-component-page="prose" gap="6">
      <Scenario {...proseScenarios[0]}>
        <Specimen
          data-testid="prose-overview"
          inset="lg"
          label="trusted parsed article"
        >
          <Prose as="article">
            <ArticleSample />
          </Prose>
        </Specimen>
      </Scenario>
      <Scenario {...proseScenarios[1]}>
        <VStack data-testid="prose-scale" gap="5">
          <Specimen label="sm · narrow">
            <Prose measure="narrow" size="sm">
              <ArticleSample title="Compact field notes" />
            </Prose>
          </Specimen>
          <Specimen label="lg · wide">
            <Prose measure="wide" size="lg">
              <ArticleSample title="Expanded editorial guide" />
            </Prose>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...proseScenarios[2]}>
        <Specimen
          data-testid="prose-content"
          inset="lg"
          label="editorial descendant coverage"
        >
          <Prose>
            <h2>Qualification record</h2>
            <blockquote>
              <p>
                Evidence is useful only when it proves the public boundary
                consumers actually receive.
              </p>
              <cite>Release practice</cite>
            </blockquote>
            <p>
              Run <code>npm run check:repository</code>, then compare the
              candidate archive.
            </p>
            <pre>
              <code>{`import { Prose } from "@flowstack-ui/brick/prose";\n\nexport function Guide() {\n  return <Prose>{content}</Prose>;\n}`}</code>
            </pre>
            <table>
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>Evidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Package</td>
                  <td>Archive integrity</td>
                </tr>
                <tr>
                  <td>Consumer</td>
                  <td>Runtime and types</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <figure>
              <img
                alt="Abstract workspace landscape"
                src="/assets/image/workspace-landscape.png"
              />
              <figcaption>
                Responsive media remains within the reading measure.
              </figcaption>
            </figure>
          </Prose>
        </Specimen>
      </Scenario>
      <Scenario {...proseScenarios[3]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Prose size="sm">
                <h3>Light article</h3>
                <p>Reading rhythm follows the local appearance.</p>
              </Prose>
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Prose size="sm">
                <h3>Dark article</h3>
                <p>Reading rhythm follows the local appearance.</p>
              </Prose>
            </Specimen>
          </Grid.Root>
          <Specimen
            data-testid="prose-adaptation"
            dir="rtl"
            inset="lg"
            label="narrow RTL + direct Brick override"
          >
            <Prose
              className="consumer-prose"
              data-owner="playground"
              dir="rtl"
              lang="ar"
              measure="narrow"
            >
              <h2>إرشادات إصدار واضحة</h2>
              <p>
                يحافظ المحتوى الطويل على ترتيب القراءة، بما في ذلك{" "}
                <code dir="ltr">
                  package/really-long-generated-module-name/without-breakpoints.ts
                </code>
                .
              </p>
              <ol>
                <li>تحقق من العقد العام.</li>
                <li>اختبر الحزمة المنشورة.</li>
              </ol>
              <Text as="p" tone="secondary">
                Direct Brick Text keeps its own finished class contract.
              </Text>
            </Prose>
          </Specimen>
          <CustomizationEvidence
            code={`--brick-prose-measure: 36rem;\n--brick-prose-accent: var(--brick-color-success-border);\n--brick-prose-flow-space: var(--brick-space-5);`}
            description="Measure, editorial accent, and flow rhythm match the code while the content tree stays untouched."
            title="Prose CSS properties"
          >
            <Prose
              style={
                {
                  "--brick-prose-measure": "36rem",
                  "--brick-prose-accent": "var(--brick-color-success-border)",
                  "--brick-prose-flow-space": "var(--brick-space-5)",
                } as CSSProperties
              }
            >
              <h3>Customized reading surface</h3>
              <p>
                Trusted React content receives the authored typography without
                parsing or rewriting.
              </p>
              <blockquote>
                <p>The application still owns content safety.</p>
              </blockquote>
            </Prose>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
