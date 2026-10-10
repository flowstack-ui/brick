import { useState } from "react";
import {
  Button,
  For,
  HStack,
  Input,
  Steps,
  Text,
  VStack,
} from "../../../../src/index.js";
import type { StepsRootProps } from "../../../../src/steps.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const stepsScenarios = [
  {
    id: "steps.workflow",
    number: 1,
    title: "Workflow",
    description:
      "Native ordered progress, retained form state, and completion.",
  },
  {
    id: "steps.recipes",
    number: 2,
    title: "Sizes and recipes",
    description:
      "Four fixed marker sizes with solid and subtle semantic paint.",
  },
  {
    id: "steps.vertical",
    number: 3,
    title: "Vertical and RTL",
    description:
      "Logical connectors and wrapping labels preserve marker geometry.",
  },
  {
    id: "steps.validation",
    number: 4,
    title: "Controlled validation",
    description:
      "The application supplies validity; Atom guards forward progress.",
  },
  {
    id: "steps.variants",
    number: 5,
    title: "Variants and tones",
    description:
      "The same progress with each independent visual recipe and semantic tone.",
  },
  {
    id: "steps.content",
    number: 6,
    title: "Vertical content",
    description:
      "Progress beside its content, wrapping intrinsically when space is constrained.",
  },
  {
    id: "steps.states",
    number: 7,
    title: "Custom indicators and states",
    description:
      "Authored indicators, disabled navigation and initially completed workflows.",
  },
] as const;

const stages = ["Account", "Details", "Review"] as const;
function Progress({ interactive = true }: { interactive?: boolean }) {
  return (
    <Steps.List aria-label="Setup progress">
      <For each={stages}>
        {(title, index) => (
          <Steps.Item key={title} index={index}>
            {interactive ? (
              <Steps.Trigger>
                <Steps.Indicator />
                <Steps.Title>{title}</Steps.Title>
              </Steps.Trigger>
            ) : (
              <>
                <Steps.Indicator />
                <Steps.Title>{title}</Steps.Title>
              </>
            )}
            <Steps.Separator />
          </Steps.Item>
        )}
      </For>
    </Steps.List>
  );
}
function Recipe(props: StepsRootProps) {
  return (
    <Steps.Root {...props}>
      <Progress interactive={false} />
    </Steps.Root>
  );
}
export function StepsEvidence() {
  const [step, setStep] = useState(0);
  const [valid, setValid] = useState(false);
  const [blocked, setBlocked] = useState(false);
  return (
    <VStack data-component-page="steps" gap="6">
      <Scenario {...stepsScenarios[0]}>
        <Specimen label="Interactive setup">
          <Steps.Root count={3} data-testid="steps-workflow">
            <Progress />
            <Steps.Content index={0}>
              <Input aria-label="Account name" placeholder="Your name" />
            </Steps.Content>
            <Steps.Content index={1}>
              <Text>Enter your details.</Text>
            </Steps.Content>
            <Steps.Content index={2}>
              <Text>Review your account.</Text>
            </Steps.Content>
            <Steps.CompletedContent aria-label="Setup complete">
              <Text>Setup complete.</Text>
            </Steps.CompletedContent>
            <HStack gap="2" wrap>
              <Steps.PrevTrigger asChild>
                <Button variant="outline">Back</Button>
              </Steps.PrevTrigger>
              <Steps.NextTrigger asChild>
                <Button>Continue</Button>
              </Steps.NextTrigger>
            </HStack>
            <Steps.Context>
              {(state) => (
                <Button variant="ghost" onClick={state.resetStep}>
                  Reset
                </Button>
              )}
            </Steps.Context>
          </Steps.Root>
        </Specimen>
      </Scenario>
      <Scenario {...stepsScenarios[1]}>
        <VStack gap="5" data-testid="steps-recipes">
          <For each={["xs", "sm", "md", "lg"] as const}>
            {(size) => (
              <Specimen key={size} label={size}>
                <VStack gap="4">
                  <Recipe count={3} defaultStep={1} size={size} />
                </VStack>
              </Specimen>
            )}
          </For>
        </VStack>
      </Scenario>
      <Scenario {...stepsScenarios[2]}>
        <Specimen label="Vertical RTL">
          <Steps.Root
            count={3}
            defaultStep={1}
            orientation="vertical"
            dir="rtl"
            data-testid="steps-vertical"
          >
            <Steps.List aria-label="مراحل الإعداد">
              <For
                each={[
                  "الحساب",
                  "تفاصيل الحساب والمعلومات المطلوبة",
                  "المراجعة",
                ]}
              >
                {(title, index) => (
                  <Steps.Item key={title} index={index}>
                    <Steps.Trigger>
                      <Steps.Indicator />
                      <VStack align="start" gap="1">
                        <Steps.Title>{title}</Steps.Title>
                        <Steps.Description>وصف المرحلة</Steps.Description>
                      </VStack>
                    </Steps.Trigger>
                    <Steps.Separator />
                  </Steps.Item>
                )}
              </For>
            </Steps.List>
          </Steps.Root>
        </Specimen>
      </Scenario>
      <Scenario {...stepsScenarios[3]}>
        <Specimen label="Validation guard">
          <Steps.Root
            count={3}
            step={step}
            onStepChange={setStep}
            linear
            isStepValid={() => valid}
            onStepInvalid={() => setBlocked(true)}
            data-testid="steps-validation"
          >
            <Progress />
            <Steps.NextTrigger asChild>
              <Button>Next stage</Button>
            </Steps.NextTrigger>
            <Button
              variant="outline"
              onClick={() => {
                setValid(true);
                setBlocked(false);
              }}
            >
              Allow progress
            </Button>
            <Text role="status">
              {blocked
                ? "Complete the current stage first."
                : `Stage ${step + 1}`}
            </Text>
          </Steps.Root>
        </Specimen>
      </Scenario>
      <Scenario {...stepsScenarios[4]}>
        <VStack gap="4">
          <For each={["solid", "subtle"] as const}>
            {(variant) => (
              <For key={variant} each={["accent", "neutral"] as const}>
                {(tone) => (
                  <Specimen key={tone} label={`${variant} / ${tone}`}>
                    <Recipe
                      count={3}
                      defaultStep={1}
                      variant={variant}
                      tone={tone}
                    />
                  </Specimen>
                )}
              </For>
            )}
          </For>
        </VStack>
      </Scenario>
      <Scenario {...stepsScenarios[5]}>
        <Specimen label="Vertical editor">
          <Steps.Root
            count={3}
            orientation="vertical"
            data-testid="steps-vertical-content"
          >
            <Progress />
            <VStack gap="4">
              <Steps.Content index={0}>
                <Input
                  aria-label="Vertical account name"
                  placeholder="Account name"
                />
              </Steps.Content>
              <Steps.Content index={1} keepMounted={false}>
                <Text>Details are mounted only while this step is active.</Text>
              </Steps.Content>
              <Steps.Content index={2}>
                <Text>Review the saved account.</Text>
              </Steps.Content>
              <Steps.CompletedContent>
                <Text>Account ready.</Text>
              </Steps.CompletedContent>
              <HStack gap="2" wrap>
                <Steps.PrevTrigger asChild>
                  <Button variant="outline">Previous section</Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <Button>Next section</Button>
                </Steps.NextTrigger>
              </HStack>
            </VStack>
          </Steps.Root>
        </Specimen>
      </Scenario>
      <Scenario {...stepsScenarios[6]}>
        <VStack gap="4">
          <Specimen label="Custom indicators">
            <Steps.Root count={3} defaultStep={1}>
              <Steps.List aria-label="Document stages">
                <For each={["A", "B", "C"]}>
                  {(label, index) => (
                    <Steps.Item key={label} index={index}>
                      <Steps.Trigger>
                        <Steps.Indicator>{label}</Steps.Indicator>
                        <VStack gap="1" align="start">
                          <Steps.Title>{stages[index]}</Steps.Title>
                          <Steps.Description>
                            Document stage {index + 1}
                          </Steps.Description>
                        </VStack>
                      </Steps.Trigger>
                      <Steps.Separator />
                    </Steps.Item>
                  )}
                </For>
              </Steps.List>
            </Steps.Root>
          </Specimen>
          <Specimen label="Disabled">
            <Steps.Root count={3} disabled>
              <Progress />
            </Steps.Root>
          </Specimen>
          <Specimen label="Completed">
            <Steps.Root count={3} defaultStep={3}>
              <Progress interactive={false} />
              <Steps.CompletedContent>
                <Text>All stages are complete.</Text>
              </Steps.CompletedContent>
            </Steps.Root>
          </Specimen>
        </VStack>
      </Scenario>
    </VStack>
  );
}
