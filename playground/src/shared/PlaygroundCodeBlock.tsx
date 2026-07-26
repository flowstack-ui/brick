import { CodeBlock, type CodeBlockContentProps } from "@flowstack-ui/brick";
import { useId, type ReactNode } from "react";

export interface PlaygroundCodeBlockProps
  extends Omit<CodeBlockContentProps, "children"> {
  children: ReactNode;
}

function plainText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}

/** Playground-only shorthand for a source specimen without optional chrome. */
export function PlaygroundCodeBlock({
  children,
  focusable,
  tabIndex: _legacyTabIndex,
  ...contentProps
}: PlaygroundCodeBlockProps) {
  const generatedId = useId();
  const generatedLabel = `Code example ${generatedId.replace(/:/g, "")}`;
  return (
    <CodeBlock.Root value={plainText(children)} variant="bordered">
      <CodeBlock.Content
        aria-label={contentProps["aria-labelledby"] ? undefined : contentProps["aria-label"] ?? generatedLabel}
        {...contentProps}
        focusable={focusable ?? true}
      >
        {children}
      </CodeBlock.Content>
    </CodeBlock.Root>
  );
}
