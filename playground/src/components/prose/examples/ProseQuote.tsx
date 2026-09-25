import { Prose } from "@flowstack-ui/brick";

export function ProseQuote() {
  return (
    <Prose>
      <h2>Make room for reflection</h2>
      <blockquote>
        <p>
          Clarity comes from choosing what matters and giving it room to
          breathe.
        </p>
        <cite>Editorial principles</cite>
      </blockquote>
      <p>
        Use <strong>strong emphasis</strong> for importance and{" "}
        <em>emphasis</em> for stress. A <mark>relevant passage</mark> can be
        highlighted.
      </p>
    </Prose>
  );
}
