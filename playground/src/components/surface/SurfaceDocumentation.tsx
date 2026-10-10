import { SurfaceSurfaceEffects } from "./examples/SurfaceSurfaceEffects.js";
import surfaceEffectsSource from "./examples/SurfaceSurfaceEffects.tsx?raw";
import { For, VStack } from "@flowstack-ui/brick";
import { DocsSection } from "../../shared/DocsSection.js";
import { ExamplePreview } from "../../shared/ExamplePreview.js";
import { ExampleSource } from "../../shared/ExampleSource.js";
import { PropsTable } from "../../shared/PropsTable.js";
import { surfaceSection } from "./sections.js";
import {
  surfaceProps,
  surfaceMediaProps,
  surfaceScrimProps,
  surfaceContentProps,
} from "./props.js";
import { SurfaceLevels } from "./examples/SurfaceLevels.js";
import levelsSource from "./examples/SurfaceLevels.tsx?raw";
import { SurfaceTones } from "./examples/SurfaceTones.js";
import tonesSource from "./examples/SurfaceTones.tsx?raw";
import { SurfaceBorders } from "./examples/SurfaceBorders.js";
import bordersSource from "./examples/SurfaceBorders.tsx?raw";
import { SurfaceElevation } from "./examples/SurfaceElevation.js";
import elevationSource from "./examples/SurfaceElevation.tsx?raw";
import { SurfaceRadius } from "./examples/SurfaceRadius.js";
import radiusSource from "./examples/SurfaceRadius.tsx?raw";
import { SurfaceInset } from "./examples/SurfaceInset.js";
import insetSource from "./examples/SurfaceInset.tsx?raw";
import { SurfaceComposition } from "./examples/SurfaceComposition.js";
import compositionSource from "./examples/SurfaceComposition.tsx?raw";
import { SurfaceMedia } from "./examples/SurfaceMedia.js";
import mediaSource from "./examples/SurfaceMedia.tsx?raw";
import { SurfaceScrims } from "./examples/SurfaceScrims.js";
import scrimsSource from "./examples/SurfaceScrims.tsx?raw";
const examples = [
  {
    id: "surface-effects",
    description:
      "Tune fill alpha, exact blur and the structural edge independently. The backdrop is diagnostic artwork; the component owns the surface.",
    Demo: SurfaceSurfaceEffects,
    source: surfaceEffectsSource,
  },
  {
    id: "levels",
    Demo: SurfaceLevels,
    source: levelsSource,
    description:
      "Transparent has no fill; canvas uses the page color. Base, subtle and raised express surface hierarchy.",
  },
  {
    id: "tones",
    Demo: SurfaceTones,
    source: tonesSource,
    description:
      "Transparent accent uses readable accent text rather than on-solid text.",
  },
  {
    id: "borders",
    Demo: SurfaceBorders,
    source: bordersSource,
    description: "Border is independent of fill and elevation.",
  },
  {
    id: "elevation",
    Demo: SurfaceElevation,
    source: elevationSource,
    description:
      "Elevation changes shadow offset, softness and reach to suggest height—not position or z-index. These equal raised surfaces keep the same fill; only elevation differs. Shadows are subtler on dark backgrounds.",
  },
  {
    id: "radius",
    Demo: SurfaceRadius,
    source: radiusSource,
    description:
      "Core values and semantic roles follow the theme. Radius does not clip foreground content.",
  },
  {
    id: "inset",
    Demo: SurfaceInset,
    source: insetSource,
    description:
      "Inset supplies all-edge padding. Omit it for none. Sparse responsive values inherit that default.",
  },
  {
    id: "composition",
    Demo: SurfaceComposition,
    source: compositionSource,
    description:
      "asChild merges owner and child props, events and cleanup-aware refs on one host.",
  },
  {
    id: "media",
    Demo: SurfaceMedia,
    source: mediaSource,
    description:
      "Media is decorative and noninteractive. Keep foreground content inside Content and meaningful images in normal flow.",
  },
  {
    id: "scrims",
    Demo: SurfaceScrims,
    source: scrimsSource,
    description:
      "Directional gradients support horizontal LTR and RTL, including a direction set on Scrim itself. Use uniform in vertical writing. Verify contrast against actual media.",
  },
] as const;
export function SurfaceDocumentation() {
  return (
    <VStack gap={8} startSpacing={8}>
      <DocsSection
        {...surfaceSection("usage")}
        description="Surface owns paint, border, elevation, radius and inset. Layout and interaction belong to composed components."
      >
        <ExampleSource
          label="Surface import"
          source={'import { Surface } from "@flowstack-ui/brick";'}
        />
        <ExampleSource
          label="Surface usage"
          source={"<Surface>Content</Surface>"}
        />
      </DocsSection>
      <DocsSection {...surfaceSection("examples")}>
        <VStack gap={16}>
          <For each={examples}>
            {({ id, Demo, source, description }) => (
              <DocsSection
                key={id}
                {...surfaceSection(id)}
                description={description}
              >
                <ExamplePreview
                  label={surfaceSection(id).title}
                  source={source}
                >
                  <Demo />
                </ExamplePreview>
              </DocsSection>
            )}
          </For>
        </VStack>
      </DocsSection>
      <DocsSection
        {...surfaceSection("props")}
        description="Component-owned props. Layout, typography and behavior from other components remain composition."
      >
        <DocsSection
          {...surfaceSection("props-root")}
          description="Root owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Surface.Root props" rows={surfaceProps} />
        </DocsSection>
        <DocsSection
          {...surfaceSection("props-media")}
          description="Media owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Surface.Media props" rows={surfaceMediaProps} />
        </DocsSection>
        <DocsSection
          {...surfaceSection("props-scrim")}
          description="Scrim owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable label="Surface.Scrim props" rows={surfaceScrimProps} />
        </DocsSection>
        <DocsSection
          {...surfaceSection("props-content")}
          description="Content owns the following props. Native attributes and refs also pass through."
        >
          <PropsTable
            label="Surface.Content props"
            rows={surfaceContentProps}
          />
        </DocsSection>
      </DocsSection>
    </VStack>
  );
}
