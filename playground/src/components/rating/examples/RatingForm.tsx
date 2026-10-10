import { useState } from "react";
import { Rating, Button, HStack, VStack, Text } from "@flowstack-ui/brick";
export function RatingForm() {
  const [result, setResult] = useState("No submission");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setResult(
          "Submitted rating: " + new FormData(event.currentTarget).get("score"),
        );
      }}
    >
      <VStack gap="4">
        <Rating.Root name="score" required validationBehavior="inline">
          <Rating.Label>Service rating</Rating.Label>
          <Rating.Control />
        </Rating.Root>
        <HStack gap="3">
          <Button type="submit">Submit</Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </HStack>
        <Text>{result}</Text>
      </VStack>
    </form>
  );
}
