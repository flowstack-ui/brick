import { TreeNodeIcon } from "../TreeNodeIcon.js";
import { useRef, useState } from "react";
import { Button, Input, Link, Text, Tree } from "@flowstack-ui/brick";
export function TreeActions() {
  const [name, setName] = useState("Project");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const finish = (commit: boolean) => {
    if (commit && !draft.trim()) {
      setError("Enter a project name.");
      return;
    }
    if (commit) setName(draft.trim());
    root.current?.focus();
    setEditing(false);
    setError("");
  };
  return (
    <Tree.Root ref={root} aria-label="Project actions" selectionMode="none">
      <Tree.Item value="project" interactive>
        <Tree.ItemContent>
          <TreeNodeIcon />
          <Tree.ItemText>{name}</Tree.ItemText>
          {editing ? (
            <Input
              autoFocus
              aria-label="Project name"
              aria-invalid={!!error}
              size="sm"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return;
                if (event.key === "Enter" || event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  finish(event.key === "Enter");
                }
              }}
            />
          ) : null}
          <Button
            size="xs"
            variant="ghost"
            onClick={() => {
              if (editing) finish(true);
              else {
                setDraft(name);
                setEditing(true);
              }
            }}
          >
            {editing ? "Save" : "Rename"}
          </Button>
          {editing ? (
            <Button size="xs" variant="ghost" onClick={() => finish(false)}>
              Cancel
            </Button>
          ) : null}
          {error ? <Text role="alert">{error}</Text> : null}
          <Link href="#usage">Open documentation</Link>
        </Tree.ItemContent>
      </Tree.Item>
    </Tree.Root>
  );
}
