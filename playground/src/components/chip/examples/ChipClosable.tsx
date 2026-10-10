import { useRef, useState } from "react";
import { Chip, Button, HStack } from "@flowstack-ui/brick";
export function ChipClosable() {
  const [values, setValues] = useState(["Design", "Research"]);
  const restore = useRef<HTMLElement>(null);
  const controls = useRef(new Map<string, HTMLElement>());
  function remove(value: string) {
    const index = values.indexOf(value);
    const next = values[index + 1] ?? values[index - 1];
    (next ? controls.current.get(next) : restore.current)?.focus();
    setValues(values.filter((item) => item !== value));
  }
  return (
    <HStack gap={3} wrap="wrap">
      {values.map((value) => (
        <Chip.Root radius="control" key={value}>
          <Chip.Label>{value}</Chip.Label>
          <Chip.RemoveTrigger
            ref={(node) => {
              if (node) controls.current.set(value, node);
              else controls.current.delete(value);
            }}
            ariaLabel={`Remove ${value}`}
            onPress={() => remove(value)}
          />
        </Chip.Root>
      ))}
      <Button
        ref={restore}
        size="sm"
        variant="outline"
        onPress={() => setValues(["Design", "Research"])}
      >
        Restore filters
      </Button>
    </HStack>
  );
}
