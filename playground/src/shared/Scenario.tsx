import { Text, VStack } from "@flowstack-ui/brick";
import type { ReactNode } from "react";
import { usePreviewContext } from "../preview/PreviewContext.js";

export interface ScenarioDefinition {
  description: string;
  id: string;
  navigationTitle?: string;
  number: number;
  title: string;
}

export interface ScenarioProps extends ScenarioDefinition {
  children: ReactNode;
  hideHeading?: boolean;
}

export function scenarioDomId(id: string) {
  return `scenario-${id.replace(/\./g, "-")}`;
}

export function Scenario({
  children,
  description,
  id,
  number,
  title,
  hideHeading = false,
}: ScenarioProps) {
  const preview = usePreviewContext();
  if (preview?.mode === "preview") {
    return preview.scenario === id ? <div data-scenario={id}>{children}</div> : null;
  }
  const scenarioId = scenarioDomId(id);
  const headingId = `${scenarioId}-title`;

  return (
    <VStack
      as="section"
      aria-labelledby={hideHeading ? undefined : headingId}
      aria-label={hideHeading ? title : undefined}
      className={hideHeading ? undefined : "scenario"}
      data-scenario={id}
      gap="4"
      id={scenarioId}
    >
      {!hideHeading && <VStack className="scenario-heading" gap="1">
        <Text className="scenario-number" variant="caption">
          Scenario {String(number).padStart(2, "0")}
        </Text>
        <Text as="h2" id={headingId} variant="title-lg">{title}</Text>
        <Text as="p" tone="secondary">{description}</Text>
      </VStack>}
      {children}
    </VStack>
  );
}
