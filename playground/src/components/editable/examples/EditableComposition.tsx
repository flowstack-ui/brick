import { Editable } from "@flowstack-ui/brick";
export function EditableComposition() {
  return (
    <Editable.Root defaultValue="Live custom preview" asChild>
      <section aria-label="Rename project">
        <Editable.Area>
          <Editable.Context>
            {({ valueText }) => (
              <Editable.Preview asChild>
                <span>{valueText}</span>
              </Editable.Preview>
            )}
          </Editable.Context>
          <Editable.Input aria-label="Project name" />
        </Editable.Area>
      </section>
    </Editable.Root>
  );
}
