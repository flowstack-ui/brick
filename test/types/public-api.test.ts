import * as Brick from "@flowstack-ui/brick";

const exports: string[] = Object.keys(Brick);
void exports;

// @ts-expect-error Components are added only through approved public workstreams.
Brick.Button;
