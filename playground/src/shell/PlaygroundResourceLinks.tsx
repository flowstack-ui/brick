import { HStack, Icon, Link, Text } from "@flowstack-ui/brick";
import { ArrowUpRight } from "lucide-react";
import { GitHubMark } from "./branding/GitHubMark.js";
import { StorybookMark } from "./branding/StorybookMark.js";

export function PlaygroundResourceLinks({ componentId }: { componentId: string }) {
  return (
    <HStack gap="4" aria-label="Component resources">
      <Link
        href={`https://github.com/flowstack-ui/brick/tree/main/src/components/${componentId}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Source (opens in a new tab)"
        size="sm"
        tone="neutral"
        variant="underline"
        startIcon={<Icon size="xs"><GitHubMark /></Icon>}
        endIcon={<Icon size="xs"><ArrowUpRight /></Icon>}
      >
        Source
      </Link>
      <Text
        role="link"
        aria-disabled="true"
        aria-label="Storybook — not available yet"
        title="Storybook is not available yet"
        tone="muted"
        variant="body-sm"
      >
        <HStack as="span" gap="2">
          <Icon size="xs" tone="inherit"><StorybookMark /></Icon>
          Storybook
          <Icon size="xs" tone="inherit"><ArrowUpRight /></Icon>
        </HStack>
      </Text>
    </HStack>
  );
}
