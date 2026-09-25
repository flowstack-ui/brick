import { Prose } from "@flowstack-ui/brick";

export function ProseMedia() {
  return (
    <Prose>
      <figure>
        <img
          src="/assets/image/workspace-landscape.png"
          alt="Illustrated workspace with a chart and summary cards"
        />
        <figcaption>A workspace illustration with a caption.</figcaption>
      </figure>
    </Prose>
  );
}
