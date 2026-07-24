import { Input, Text, VStack, type InputProps } from "@flowstack-ui/brick";
import type { ReactNode } from "react";
import { RenderedOutput } from "./RenderedOutput.js";
import { SpecimenLabel } from "./SpecimenLabel.js";

export function FormEvidenceGroup({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <VStack as="section" className="forms-evidence-group" gap="3">
      <VStack className="forms-evidence-group__heading" gap="1">
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text as="p" tone="secondary" variant="body-sm">{description}</Text>
      </VStack>
      {children}
    </VStack>
  );
}

export function FormEvidenceCell({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="forms-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="forms-cell__preview">{children}</div>
    </div>
  );
}

export function FormRenderedOutput({
  children,
  label = "Rendered HTML",
}: {
  children: ReactNode;
  label?: string;
}) {
  return <RenderedOutput label={label}>{children}</RenderedOutput>;
}

export function FormEvidenceControl(props: InputProps) {
  return <Input {...props} />;
}
