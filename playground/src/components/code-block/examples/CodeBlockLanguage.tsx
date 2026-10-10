import { useState } from "react";
import { CodeBlock, NativeSelect, VStack } from "@flowstack-ui/brick";
export function CodeBlockLanguage() {
  const [language, setLanguage] = useState("javascript");
  return (
    <VStack gap="4">
      <NativeSelect.Root>
        <NativeSelect.Field
          aria-label="Code language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <CodeBlock.Root
        language={language}
        value={
          language === "python" ? 'print("Hello")' : 'console.log("Hello");'
        }
      >
        <CodeBlock.Content aria-label="Selected language source" />
      </CodeBlock.Root>
    </VStack>
  );
}
