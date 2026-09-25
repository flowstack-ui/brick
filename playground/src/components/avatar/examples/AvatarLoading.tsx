import { useState } from "react";
import { Avatar, Button, HStack, Text, VStack } from "@flowstack-ui/brick";

export function AvatarLoading() {
  const [src, setSrc] = useState<string>();
  const [status, setStatus] = useState("idle");
  return (
    <VStack gap="4">
      <HStack gap="3">
        <Avatar
          alt="Brick workspace"
          src={src}
          fallback="B"
          onLoadingStatusChange={setStatus}
        />
        <Text tone="secondary">{status}</Text>
      </HStack>
      <HStack gap="3" wrap="wrap">
        <Button
          variant="outline"
          onClick={() => setSrc("/assets/icon-button/brick-image.png")}
        >
          Load image
        </Button>
        <Button
          variant="outline"
          onClick={() => setSrc("/assets/avatar-missing.png")}
        >
          Fail image
        </Button>
        <Button variant="ghost" onClick={() => setSrc(undefined)}>
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}
