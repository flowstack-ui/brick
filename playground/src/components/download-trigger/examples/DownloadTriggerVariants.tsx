import {
  DownloadTrigger,
  For,
  HStack,
  type ButtonVariant,
} from "@flowstack-ui/brick";
const variants: ButtonVariant[] = [
  "solid",
  "soft",
  "subtle",
  "surface",
  "outline",
  "ghost",
  "plain",
];
export function DownloadTriggerVariants() {
  return (
    <HStack gap={3} wrap="wrap">
      <For each={variants}>
        {(variant) => (
          <DownloadTrigger
            key={variant}
            variant={variant}
            data="Notes"
            fileName="notes.txt"
            mimeType="text/plain"
          >
            {variant}
          </DownloadTrigger>
        )}
      </For>
    </HStack>
  );
}
