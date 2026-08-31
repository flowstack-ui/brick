import type { ReactNode } from "react";
import { VStack, type SurfaceProps } from "@flowstack-ui/brick";
import { EvidenceSurface } from "./EvidenceSurface.js";
import { SpecimenLabel } from "./SpecimenLabel.js";

export function Specimen({
  children,
  label,
  ...surfaceProps
}: SurfaceProps & { children: ReactNode; label: string }) {
  return (
    <EvidenceSurface {...surfaceProps}>
      <VStack align="start" className="playground-specimen" gap="4">
        <SpecimenLabel>{label}</SpecimenLabel>
        <div className="playground-specimen__preview">{children}</div>
      </VStack>
    </EvidenceSurface>
  );
}
