import {
  Button,
  Form,
  HStack,
  Slider,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { useState } from "react";

export function SliderNativeForm() {
  const [result, setResult] = useState("No submission yet");
  const [externalResult, setExternalResult] = useState(
    "No external submission yet",
  );
  return (
    <VStack align="stretch" gap="6">
      <Form
        aria-label="Budget form"
        preventDefaultOnSubmit
        onSubmit={(event) =>
          setResult(
            `Submitted: ${new FormData(event.currentTarget).get("budget[0]")}–${new FormData(event.currentTarget).get("budget[1]")}`,
          )
        }
        onReset={() => setResult("Form reset")}
      >
        <VStack align="stretch" gap="3">
          <Slider.Root defaultValue={[25, 75]} name="budget">
            <Slider.Label>Budget</Slider.Label>
            <Slider.Control>
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
          <HStack gap="2">
            <Button type="submit">Submit</Button>
            <Button tone="neutral" type="reset" variant="outline">
              Reset
            </Button>
          </HStack>
          <Text role="status">{result}</Text>
        </VStack>
      </Form>
      <VStack align="stretch" gap="3">
        <Slider.Root
          defaultValue={60}
          form="external-slider-form"
          name="externalScore"
        >
          <Slider.Label>Externally associated score</Slider.Label>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb aria-label="External score" />
          </Slider.Control>
        </Slider.Root>
        <Form
          aria-label="External score form"
          id="external-slider-form"
          preventDefaultOnSubmit
          onSubmit={(event) =>
            setExternalResult(
              `External submitted: ${new FormData(event.currentTarget).get("externalScore")}`,
            )
          }
        >
          <Button type="submit">Submit</Button>
        </Form>
        <Text role="status">{externalResult}</Text>
      </VStack>
    </VStack>
  );
}
