import { Input, type InputRootProps } from "@flowstack-ui/atom/input";
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
    <section className="forms-evidence-group">
      <div className="forms-evidence-group__heading">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {children}
    </section>
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

export function FormEvidenceControl(props: InputRootProps) {
  return <Input.Root {...props} className={`forms-control ${props.className ?? ""}`.trim()} />;
}
