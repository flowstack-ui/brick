import { Button, Dialog, TagsInput } from "@flowstack-ui/brick";
export function TagsInputDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Edit project topics</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Project topics</Dialog.Title>
            <Dialog.Description>
              Add or edit the topics for this project.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <TagsInput.Root defaultValue={["Design"]} editable>
              <TagsInput.Label>Topics</TagsInput.Label>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input placeholder="Add a topic…" />
                <TagsInput.ClearTrigger />
              </TagsInput.Control>
            </TagsInput.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="outline">Done</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
