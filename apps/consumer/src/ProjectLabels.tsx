import { useState } from "react";
import { TagsInput } from "@flowstack-ui/brick/tags-input";
import { Card } from "@flowstack-ui/brick/card";
import { Form } from "@flowstack-ui/brick/form";
import { Button } from "@flowstack-ui/brick/button";
import { Text } from "@flowstack-ui/brick/text";
export function ProjectLabels() {
  const [saved, setSaved] = useState("");
  return (
    <Card.Root>
      <Card.Content>
        <Text as="h2" variant="title-lg">
          Project classification
        </Text>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(String(new FormData(event.currentTarget).get("labels")));
          }}
        >
          <TagsInput.Root
            name="labels"
            defaultValue={["Research"]}
            editable
            addOnPaste
          >
            <TagsInput.Label>Project labels</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items tone="accent" />
              <TagsInput.Input />
              <TagsInput.ClearTrigger />
            </TagsInput.Control>
            <TagsInput.HiddenInput />
          </TagsInput.Root>
          <Button type="submit">Save labels</Button>
          <Text role="status">Saved labels: {saved}</Text>
        </Form>
      </Card.Content>
    </Card.Root>
  );
}
