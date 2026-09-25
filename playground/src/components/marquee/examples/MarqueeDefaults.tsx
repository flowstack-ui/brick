import { Marquee, Text, VStack } from "@flowstack-ui/brick";
export function MarqueeDefaults() {
  return (
    <Marquee.PropsProvider
      value={{ unstyled: true, spacing: { initial: 2, md: 4 } }}
    >
      <Marquee.Root aria-label="Stationary original content">
        <Marquee.Viewport>
          <Marquee.Content>
            <VStack gap={2}>
              <Text>Design systems</Text>
              <Text>Product engineering</Text>
              <Text>Community</Text>
            </VStack>
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Marquee.PropsProvider>
  );
}
