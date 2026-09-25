import { Rating, HStack, VStack, Field } from "@flowstack-ui/brick";
export function RatingStates() {
  return (
    <VStack gap="6">
      <HStack gap="8" wrap="wrap">
        <Rating.Root defaultValue={3} disabled>
          <Rating.Label>Disabled</Rating.Label>
          <Rating.Control />
        </Rating.Root>
        <Rating.Root defaultValue={3} readOnly>
          <Rating.Label>Read only</Rating.Label>
          <Rating.Control />
        </Rating.Root>
      </HStack>
      <Field.Root invalid required>
        <Field.Label>Experience</Field.Label>
        <Rating.Root />
        <Field.Error>Choose a rating before continuing.</Field.Error>
      </Field.Root>
    </VStack>
  );
}
