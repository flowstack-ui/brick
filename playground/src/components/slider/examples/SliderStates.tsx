import { Field, Slider, Text, VStack } from "@flowstack-ui/brick";

function StateSlider({
  state,
}: {
  state: "disabled" | "readOnly" | "invalid";
}) {
  const props = { [state]: true };
  return (
    <Field.Root invalid={state === "invalid"}>
      <Slider.Root defaultValue={40} {...props}>
        <Slider.Label>{state}</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </Slider.Control>
      </Slider.Root>
      {state === "invalid" ? (
        <Text tone="danger">Choose at least 50.</Text>
      ) : (
        <Text tone="secondary">Current value is 40.</Text>
      )}
    </Field.Root>
  );
}
export function SliderStates() {
  return (
    <VStack gap="4">
      {(["disabled", "readOnly", "invalid"] as const).map((state) => (
        <StateSlider key={state} state={state} />
      ))}
    </VStack>
  );
}
