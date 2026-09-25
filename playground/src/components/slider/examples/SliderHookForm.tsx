import { Button, Form, Slider, Text, VStack } from "@flowstack-ui/brick";
import { Controller, useForm } from "react-hook-form";

export function SliderHookForm() {
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: { score: 40 },
  });
  return (
    <Form
      aria-label="Score form"
      preventDefaultOnSubmit
      onSubmit={handleSubmit(() => undefined)}
    >
      <VStack align="stretch" gap="3">
        <Controller
          control={control}
          name="score"
          rules={{ min: { value: 50, message: "Choose 50 or more." } }}
          render={({ field, fieldState }) => (
            <Slider.Root
              aria-describedby={fieldState.invalid ? "score-error" : undefined}
              hiddenInputMode="explicit"
              invalid={fieldState.invalid}
              name={field.name}
              onValueChange={(value) =>
                field.onChange(Array.isArray(value) ? value[0] : value)
              }
              value={field.value}
            >
              <Slider.Label>Score</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb onBlur={field.onBlur} />
                <Slider.HiddenInput ref={field.ref} />
              </Slider.Control>
            </Slider.Root>
          )}
        />
        {formState.errors.score ? (
          <Text id="score-error" tone="danger">
            {formState.errors.score.message}
          </Text>
        ) : null}
        <Button type="submit">Save</Button>
        <Button
          onClick={() => reset()}
          tone="neutral"
          type="button"
          variant="outline"
        >
          Reset
        </Button>
      </VStack>
    </Form>
  );
}
