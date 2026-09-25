import { useState } from "react";
import { Rating, VStack, Text } from "@flowstack-ui/brick";
export function RatingControlled() {
  const [value, setValue] = useState(3);
  return (
    <VStack gap="3">
      <Rating.Root
        aria-label="Experience"
        value={value}
        onValueChange={setValue}
      />
      <Text>Rating: {value}</Text>
    </VStack>
  );
}
