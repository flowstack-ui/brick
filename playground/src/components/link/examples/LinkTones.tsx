import { For, HStack, Link } from "@flowstack-ui/brick";

export function LinkTones() {
  return (
    <HStack gap="6" wrap="wrap">
      <For each={["accent", "neutral", "inherit"] as const}>
        {(tone) => (
          <Link key={tone} href="#tones" tone={tone}>
            {tone}
          </Link>
        )}
      </For>
    </HStack>
  );
}
