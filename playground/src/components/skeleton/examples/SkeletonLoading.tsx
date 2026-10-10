import { useState } from "react";
import {
  Button,
  Frame,
  Skeleton,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function SkeletonLoading() {
  const [loading, setLoading] = useState(true);
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4" align="start">
        <Skeleton asChild loading={loading}>
          <Surface inset="md" bordered>
            <Text>Your workspace is ready.</Text>
          </Surface>
        </Skeleton>
        <Button variant="outline" onPress={() => setLoading(!loading)}>
          {loading ? "Show content" : "Show skeleton"}
        </Button>
      </VStack>
    </Frame>
  );
}
