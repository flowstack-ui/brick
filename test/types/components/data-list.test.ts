import { createElement, createRef } from "react";
import { DataList, type DataListLabelWidth, type DataListOrientation, type DataListRootProps, type DataListSize } from "../../../src/data-list.js";
import { DataList as RootDataList } from "../../../src/index.js";

const sizes: DataListSize[] = ["sm", "md", "lg"];
const orientations: DataListOrientation[] = ["vertical", "horizontal"];
const widths: DataListLabelWidth[] = ["auto", "sm", "md", "lg"];
const props: DataListRootProps = {
  divide: true,
  labelWidth: "md",
  orientation: { initial: "vertical", md: "horizontal" },
  size: "sm",
};
createElement(DataList.Root, { ...props, ref: createRef<HTMLDListElement>() }, createElement(DataList.Item, null, createElement(DataList.Label, null, "Role"), createElement(DataList.Value, null, "Designer")));
createElement(RootDataList.Root, null);
// @ts-expect-error closed size
createElement(DataList.Root, { size: "xl" });
// @ts-expect-error closed orientation
createElement(DataList.Root, { orientation: "inline" });
// @ts-expect-error closed label width
createElement(DataList.Root, { labelWidth: "wide" });
void sizes; void orientations; void widths;
