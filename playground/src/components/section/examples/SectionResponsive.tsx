import { Section, Surface, Text } from "@flowstack-ui/brick";

export function SectionResponsive() {
  return (
    <Surface bordered level="transparent" asChild>
      <Section as="div" spacing={{ lg: "xl" }} startSpacing={{ md: "none" }}>
        <Text>
          Medium by default; extra large from lg. No start spacing from md.
        </Text>
      </Section>
    </Surface>
  );
}
