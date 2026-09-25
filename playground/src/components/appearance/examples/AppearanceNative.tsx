import { Appearance, For, Surface, Text, VStack } from "@flowstack-ui/brick";
export function AppearanceNative() {
  return (
    <VStack gap="4">
      <For each={["light", "dark"] as const}>
        {(value) => (
          <Appearance key={value} value={value}>
            <Surface level="canvas" inset="md">
              <Appearance value={value}>
                <section aria-label={`${value} native content`}>
                  <VStack gap="3">
                    <p>Native paragraph in {value} mode</p>
                    <Text>Brick primary text</Text>
                    <Text tone="secondary">
                      Brick secondary text stays secondary.
                    </Text>
                    <span
                      style={{
                        color: value === "dark" ? "#c4b5fd" : "rebeccapurple",
                      }}
                    >
                      An explicit author color stays explicit.
                    </span>
                  </VStack>
                </section>
              </Appearance>
            </Surface>
          </Appearance>
        )}
      </For>
    </VStack>
  );
}
