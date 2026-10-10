import type { CSSProperties } from "react";
import { Card, Frame } from "@flowstack-ui/brick";
export function CardCustomization() {
  return (
    <Frame maxInlineSize={400}>
      <Card.Root
        style={
          {
            "--brick-card-background": "var(--brick-color-accent-soft)",
            "--brick-card-foreground": "var(--brick-color-accent-on-soft)",
            "--brick-card-description-foreground":
              "var(--brick-color-accent-on-soft)",
            "--brick-card-border-color": "var(--brick-color-accent-border)",
            "--brick-card-title-weight": 700,
          } as CSSProperties
        }
      >
        <Card.Header>
          <Card.Title>A local recipe</Card.Title>
          <Card.Description>
            Foreground and background stay paired.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          Public Card hooks customize this instance without replacing its
          layout.
        </Card.Content>
      </Card.Root>
    </Frame>
  );
}
