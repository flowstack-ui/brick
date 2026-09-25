import { Blockquote } from "@flowstack-ui/brick";
export function BlockquoteComposition() {
  return (
    <Blockquote.Root asChild>
      <figure>
        <Blockquote.Content
          asChild
          cite="https://example.com/designing-systems"
        >
          <blockquote>
            Good design makes the right choice easier to discover, understand,
            and repeat.
          </blockquote>
        </Blockquote.Content>
        <Blockquote.Caption asChild>
          <figcaption>
            — Morgan Lee,{" "}
            <Blockquote.Cite asChild>
              <cite>Designing Systems</cite>
            </Blockquote.Cite>
          </figcaption>
        </Blockquote.Caption>
      </figure>
    </Blockquote.Root>
  );
}
