import { Editable, For, VStack } from "@flowstack-ui/brick";
export function EditableSubmit() {
  return (
    <VStack gap="4">
      <For each={["both", "enter", "blur", "none"] as const}>
        {(mode) => (
          <Editable.Root key={mode} defaultValue={mode} submitMode={mode}>
            <Editable.Area>
              <Editable.Preview />
              <Editable.Input aria-label={mode} />
            </Editable.Area>
            <Editable.Control>
              <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
              <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
            </Editable.Control>
          </Editable.Root>
        )}
      </For>
    </VStack>
  );
}
