import { Divider, Icon, Link, Text, VStack } from "@flowstack-ui/brick";
import { ArrowUpRight } from "lucide-react";
import { GitHubMark } from "../shell/branding/GitHubMark.js";

export function DocsEditLink({ href }: { href: string }) {
  return (
    <VStack gap={4} startSpacing={6}>
      <Divider />
      <Text tone="secondary" variant="body-sm">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Edit page on GitHub (opens in a new tab)"
          tone="inherit"
          variant="subtle"
          startIcon={<Icon size="xs"><GitHubMark /></Icon>}
          endIcon={<Icon size="xs"><ArrowUpRight /></Icon>}
        >
          Edit page on GitHub
        </Link>
      </Text>
    </VStack>
  );
}
