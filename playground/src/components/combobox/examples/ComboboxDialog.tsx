import {
  Combobox,
  Field,
  Dialog,
  Button,
  CloseButton,
} from "@flowstack-ui/brick";
export function ComboboxDialog() {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ];
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Choose in dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Project framework</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Field.Root>
              <Field.Label>Framework</Field.Label>
              <Combobox.Root options={options}>
                <Combobox.Control>
                  <Combobox.Input placeholder="Search frameworks" />
                  <Combobox.Trigger />
                </Combobox.Control>
                <Combobox.Content strategy="fixed" hideWhenDetached>
                  <Combobox.Listbox>
                    {options.map((option) => (
                      <Combobox.Item key={option.value} value={option.value}>
                        {option.label}
                      </Combobox.Item>
                    ))}
                  </Combobox.Listbox>
                </Combobox.Content>
              </Combobox.Root>
            </Field.Root>
          </Dialog.Body>
          <Dialog.Close placement="corner" asChild>
            <CloseButton />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
