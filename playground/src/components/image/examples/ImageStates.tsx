import { useState } from "react";
import { Button, Frame, HStack, Image, VStack } from "@flowstack-ui/brick";
export function ImageStates() {
  const [src, setSrc] = useState<string | undefined>(
    "/assets/image/studio.webp",
  );
  return (
    <VStack gap={4}>
      <HStack gap={2} wrap>
        <Button onPress={() => setSrc("/assets/image/studio.webp")}>
          Restore
        </Button>
        <Button onPress={() => setSrc("/assets/image/unavailable.webp")}>
          Break source
        </Button>
        <Button onPress={() => setSrc(undefined)}>Clear source</Button>
      </HStack>
      <Frame maxInlineSize="100%" inlineSize="28rem">
        <Image.Root src={src} ratio={3 / 2}>
          <Image.Content
            alt="Sunlit creative studio"
            width={768}
            height={512}
          />
          <Image.Fallback when="loading">Loading studio</Image.Fallback>
          <Image.Fallback>Studio image unavailable</Image.Fallback>
        </Image.Root>
      </Frame>
    </VStack>
  );
}
