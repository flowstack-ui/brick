import { Prose, VStack } from "@flowstack-ui/brick";

export function ProseCode() {
  return (
    <VStack gap={8}>
      <Prose>
        <p>
          Press <kbd>Enter</kbd> to run <code>npm run build</code>.
        </p>
        <pre>
          <code>
            {
              "const message = 'Long source lines wrap within the available document width by default.';"
            }
          </code>
        </pre>
      </Prose>
      <Prose codeOverflow="scroll">
        <pre tabIndex={0} aria-label="Scrollable source example">
          <code>
            {
              "const message = 'Choose horizontal scrolling when preserving source layout matters more than wrapping a very long line.';"
            }
          </code>
        </pre>
      </Prose>
    </VStack>
  );
}
