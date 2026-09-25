import {
  findHighlightSegments,
  For,
  Mark,
  Paragraph,
} from "@flowstack-ui/brick";
export function HighlightComposition() {
  const segments = findHighlightSegments(
    "A durable system starts with clear foundations.",
    { query: ["durable", "clear"] },
  );
  return (
    <Paragraph>
      <For each={segments}>
        {(segment) =>
          segment.match ? (
            <Mark
              key={segment.start}
              tone={segment.query === "durable" ? "info" : "success"}
            >
              {segment.text}
            </Mark>
          ) : (
            segment.text
          )
        }
      </For>
    </Paragraph>
  );
}
