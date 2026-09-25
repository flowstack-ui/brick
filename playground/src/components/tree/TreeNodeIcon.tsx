import { Icon, useTreeItemContext } from "@flowstack-ui/brick";
import { File, Folder, FolderOpen } from "lucide-react";

/** File-explorer artwork, separate from the disclosure indicator and tree behavior. */
export function TreeNodeIcon() {
  const { expandable, expanded } = useTreeItemContext();
  const Artwork = expandable ? (expanded ? FolderOpen : Folder) : File;
  return <Icon asChild size="xs"><Artwork aria-hidden="true" /></Icon>;
}
