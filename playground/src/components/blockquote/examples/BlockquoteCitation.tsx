import { Blockquote, Link } from "@flowstack-ui/brick";
export function BlockquoteCitation() {
  return (
    <Blockquote.Root>
      <Blockquote.Content cite="https://example.com/designing-systems">
        Good design makes the right choice easier to discover, understand, and
        repeat.
      </Blockquote.Content>
      <Blockquote.Caption>
        — Morgan Lee,{" "}
        <Blockquote.Cite>
          <Link href="https://example.com/designing-systems">
            Designing Systems
          </Link>
        </Blockquote.Cite>
      </Blockquote.Caption>
    </Blockquote.Root>
  );
}
