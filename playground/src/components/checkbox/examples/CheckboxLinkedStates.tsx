import { Checkbox, For, Link, VStack } from "@flowstack-ui/brick";

export function CheckboxLinkedStates() {
  return (
    <VStack gap="4">
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Checkbox.Root key={size} size={size}>
            <Checkbox.Control />
            <Checkbox.Label>
              {size}: Receive account updates and review the{" "}
              <Link href="#consent-terms">notification policy</Link>, including
              the details that may wrap onto additional lines on smaller
              screens.
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      </For>
      <Checkbox.Root disabled>
        <Checkbox.Control defaultChecked name="disabled-consent" />
        <Checkbox.Label>
          Disabled choice; <Link href="#consent-terms">read the terms</Link>.
        </Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root readOnly>
        <Checkbox.Control defaultChecked />
        <Checkbox.Label>
          Read-only choice; <Link href="#consent-terms">read the policy</Link>.
        </Checkbox.Label>
      </Checkbox.Root>
      <Checkbox.Root>
        <Checkbox.Control defaultChecked="indeterminate" />
        <Checkbox.Label>
          Mixed choice; <Link href="#consent-terms">review details</Link>.
        </Checkbox.Label>
      </Checkbox.Root>
    </VStack>
  );
}
