import { Button, Card, Field, Frame, Input } from "@flowstack-ui/brick";
export function CardForm() {
  return (
    <Frame maxInlineSize={400}>
      <Card.Root asChild>
        <form
          onSubmit={(event) => event.preventDefault()}
          aria-label="Create a project"
        >
          <Card.Header>
            <Card.Title>Create a project</Card.Title>
            <Card.Description>Give your next idea a home.</Card.Description>
          </Card.Header>
          <Card.Content gap={4}>
            <Field.Root>
              <Field.Label>Project name</Field.Label>
              <Input name="project" placeholder="Website redesign" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Team</Field.Label>
              <Input name="team" placeholder="Design" />
            </Field.Root>
          </Card.Content>
          <Card.Footer justify="end">
            <Button type="reset" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Frame>
  );
}
