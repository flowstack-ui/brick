import { useRef } from "react";
import { Button, HStack } from "@flowstack-ui/brick";
export function ButtonLinks() {
  const ref = useRef<HTMLElement>(null);
  return (
    <HStack gap="3" wrap="wrap">
      <Button href="#usage" ref={ref}>
        Usage
      </Button>
      <Button asChild variant="outline">
        <a href="#props">Props</a>
      </Button>
    </HStack>
  );
}
