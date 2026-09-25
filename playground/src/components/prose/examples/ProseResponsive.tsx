import { Prose } from "@flowstack-ui/brick";

export function ProseResponsive() {
  return (
    <Prose size={{ initial: "sm", md: "md", lg: "lg" }} measure="reading">
      <h2>A responsive document</h2>
      <p>
        The visual scale changes at the shared breakpoints. The content,
        semantic structure and reading order stay the same.
      </p>
      <h3>One document tree</h3>
      <p>No client-side viewport measurements are needed.</p>
    </Prose>
  );
}
