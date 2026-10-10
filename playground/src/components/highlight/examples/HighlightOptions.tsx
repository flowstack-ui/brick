import { For, Highlight, Paragraph, VStack } from "@flowstack-ui/brick";
const options = [
  { label: "Case sensitive", ignoreCase: false },
  { label: "First match", matchAll: false },
  { label: "Whole words", exactMatch: true },
];
export function HighlightOptionsExample() {
  return (
    <VStack gap="4">
      <For each={options}>
        {({ label, ...settings }) => (
          <Paragraph key={label}>
            {label}:{" "}
            <Highlight
              text="Design design designer design."
              query="design"
              {...settings}
            />
          </Paragraph>
        )}
      </For>
    </VStack>
  );
}
