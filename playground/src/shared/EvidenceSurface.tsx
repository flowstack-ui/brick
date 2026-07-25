import { forwardRef } from "react";
import { Surface, type SurfaceProps } from "@flowstack-ui/brick";

export const EvidenceSurface = forwardRef<HTMLElement, SurfaceProps>(
  function EvidenceSurface(
    {
      bordered = true,
      inset = "md",
      level = "raised",
      ...props
    },
    ref,
  ) {
    return (
      <Surface
        bordered={bordered}
        data-playground-evidence=""
        inset={inset}
        level={level}
        ref={ref}
        {...props}
      />
    );
  },
);
