import { useEffect, useState } from "react";
import {
  CodeBlock,
  Paragraph,
  VStack,
  createShikiAdapter,
  type CodeBlockAdapter,
} from "@flowstack-ui/brick";
// Application setup owns loading and lifetime, not CodeBlock render.
let shared: Promise<CodeBlockAdapter> | undefined;
function loadAdapter() {
  return (shared ??= createShikiAdapter({
    load: async () => {
      const { createHighlighter } = await import("shiki");
      return createHighlighter({
        langs: ["typescript"],
        themes: ["github-light", "github-dark"],
      });
    },
    themes: { light: "github-light", dark: "github-dark" },
  }).catch((error) => {
    shared = undefined;
    throw error;
  }));
}
export function CodeBlockShiki() {
  const [adapter, setAdapter] = useState<CodeBlockAdapter>();
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    loadAdapter().then(
      (value) => {
        if (active) setAdapter(() => value);
      },
      () => {
        if (active) setError(true);
      },
    );
    return () => {
      active = false;
    };
  }, []);
  return (
    <VStack gap="4">
      {!adapter && (
        <Paragraph tone="secondary" variant="body-sm">
          {error
            ? "Highlighting unavailable. Plain source remains readable."
            : "Loading syntax highlighting…"}
        </Paragraph>
      )}
      <CodeBlock.Root
        adapter={adapter}
        colorScheme="dark"
        language="typescript"
        value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
        meta={{ showLineNumbers: true }}
      >
        <CodeBlock.Content aria-label="Shiki highlighted source" />
      </CodeBlock.Root>
      <CodeBlock.Root
        adapter={adapter}
        colorScheme="light"
        language="typescript"
        value={'const greeting = "Hello, world!";\nconsole.log(greeting);'}
        meta={{ showLineNumbers: true }}
      >
        <CodeBlock.Content aria-label="Shiki light source" />
      </CodeBlock.Root>
    </VStack>
  );
}
