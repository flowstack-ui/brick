import { Accordion } from "@flowstack-ui/brick";
import type { CSSProperties } from "react";
export function AccordionExpanded() {
  return (
    <Accordion.Root
      variant="subtle"
      defaultValue="shipping"
      style={
        {
          "--brick-accordion-expanded-background":
            "var(--brick-color-accent-soft)",
        } as CSSProperties
      }
    >
      {[
        {
          value: "shipping",
          title: "When will my order arrive?",
          body: "Standard delivery takes three to five business days.",
        },
        {
          value: "returns",
          title: "Can I return an item?",
          body: "Unused items can be returned within 30 days.",
        },
      ].map((item) => (
        <Accordion.Item value={item.value} key={item.value}>
          <Accordion.Header>
            <Accordion.Trigger>
              {item.title}
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <Accordion.ContentInner>{item.body}</Accordion.ContentInner>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
