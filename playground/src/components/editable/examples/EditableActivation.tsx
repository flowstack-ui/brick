import { Editable, For, VStack } from "@flowstack-ui/brick";
export function EditableActivation() {
  return (
    <VStack gap="4">
      <For each={["focus", "click", "dblclick", "none"] as const}>
        {(mode) => (
          <Editable.Root key={mode} defaultValue={mode} activationMode={mode}>
            <Editable.Area>
              <Editable.Preview />
              <Editable.Input aria-label={mode} />
            </Editable.Area>
            <Editable.EditTrigger>Edit</Editable.EditTrigger>
          </Editable.Root>
        )}
      </For>
    </VStack>
  );
}
