import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Field,
  Frame,
  HStack,
  TagsInput,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function TagsInputHookForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { topics: [] as string[] } });
  return (
    <Frame maxInlineSize="28rem">
      <form onSubmit={handleSubmit(() => undefined)} noValidate>
        <VStack gap="4">
          <Controller
            name="topics"
            control={control}
            rules={{
              validate: (values) => values.length > 0 || "Add a topic.",
            }}
            render={({ field, fieldState }) => (
              <Field.Root invalid={!!fieldState.error} required>
                <Field.Label>Topics</Field.Label>
                <TagsInput.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                >
                  <TagsInput.Control>
                    <TagsInput.Items />
                    <TagsInput.Input
                      ref={field.ref}
                      onBlur={field.onBlur}
                      placeholder="Add a topic…"
                    />
                  </TagsInput.Control>
                  <TagsInput.HiddenInput />
                </TagsInput.Root>
                <Field.Error>{fieldState.error?.message}</Field.Error>
              </Field.Root>
            )}
          />
          <HStack gap="2">
            <Button type="submit">Save topics</Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </HStack>
          <Text role="status">{isSubmitSuccessful ? "Topics saved." : ""}</Text>
        </VStack>
      </form>
    </Frame>
  );
}
