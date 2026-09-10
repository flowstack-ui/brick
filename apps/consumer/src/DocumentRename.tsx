import { useState } from "react";
import { Card } from "@flowstack-ui/brick/card";
import { Editable } from "@flowstack-ui/brick/editable";
import { Text } from "@flowstack-ui/brick/text";

export function DocumentRename() {
  const [saved, setSaved] = useState("Project notes");
  return (
    <Card.Root>
      <Card.Content>
        <Text as="h2" variant="title-lg">
          Document settings
        </Text>
        <Editable.Root
          defaultValue={saved}
          onValueCommit={({ value }) => setSaved(value)}
        >
          <Editable.Label>Document title</Editable.Label>
          <Editable.Area>
            <Editable.Preview />
            <Editable.Input name="documentTitle" />
          </Editable.Area>
          <Editable.Control>
            <Editable.EditTrigger>Edit title</Editable.EditTrigger>
            <Editable.SubmitTrigger>Save title</Editable.SubmitTrigger>
            <Editable.CancelTrigger>Cancel rename</Editable.CancelTrigger>
          </Editable.Control>
        </Editable.Root>
        <Text role="status">Saved document: {saved}</Text>
      </Card.Content>
    </Card.Root>
  );
}
