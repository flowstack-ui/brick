import { useEffect, useState } from "react";
import { Button, HStack, Text, TreeGrid, VStack } from "@flowstack-ui/brick";
type RecordRow = {
  id: string;
  name: string;
  parent?: string;
  level: number;
  index: number;
};
export function TreeGridRemote() {
  const [page, setPage] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  const [rows, setRows] = useState<RecordRow[]>([]);
  useEffect(() => {
    const abort = new AbortController();
    setState("loading");
    setRows([]);
    const timer = setTimeout(() => {
      if (abort.signal.aborted) return;
      if (!attempt) {
        setState("error");
        return;
      }
      setRows(
        page === 2
          ? []
          : [
              {
                id: `folder-${page}`,
                name: `Project ${page + 1}`,
                level: 1,
                index: page * 2 + 1,
              },
              {
                id: `file-${page}`,
                name: "README.md",
                parent: `folder-${page}`,
                level: 2,
                index: page * 2 + 2,
              },
            ],
      );
      setState("ready");
    }, 300);
    return () => {
      abort.abort();
      clearTimeout(timer);
    };
  }, [page, attempt]);
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((value) => value - 1)}
        >
          Previous page
        </Button>
        <Text>Page {page + 1}</Text>
        <Button
          size="sm"
          variant="outline"
          disabled={page === 2}
          onClick={() => setPage((value) => value + 1)}
        >
          Next page
        </Button>
      </HStack>
      {state === "loading" ? (
        <Text role="status">Loading projects…</Text>
      ) : null}
      {state === "error" ? (
        <HStack gap={2}>
          <Text role="alert">Could not load projects.</Text>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Retry projects
          </Button>
        </HStack>
      ) : null}
      {state === "ready" && rows.length === 0 ? (
        <Text role="status">No more projects</Text>
      ) : null}
      {rows.length ? (
        <TreeGrid.Root
          aria-label="Remote projects"
          rowCount={4}
          columnCount={2}
          defaultExpandedValue={["folder-0", "folder-1"]}
        >
          <TreeGrid.Body>
            {rows.map((row) => (
              <TreeGrid.Row
                key={row.id}
                value={row.id}
                parentValue={row.parent}
                level={row.level}
                expandable={row.level === 1}
                rowIndex={row.index}
              >
                <TreeGrid.RowHeader columnIndex={1}>
                  {row.name}
                </TreeGrid.RowHeader>
                <TreeGrid.Cell columnIndex={2}>
                  {row.parent ? "File" : "Folder"}
                </TreeGrid.Cell>
              </TreeGrid.Row>
            ))}
          </TreeGrid.Body>
        </TreeGrid.Root>
      ) : null}
    </VStack>
  );
}
