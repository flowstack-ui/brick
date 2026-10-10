import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionDelegate } from "../../src/action-delegate.js";
import { useSelection, useSelectionCheckbox } from "../../src/selection.js";
import { Checkbox } from "../../src/checkbox.js";
import { Table } from "../../src/table.js";

function Records() {
  const selection = useSelection({ orderedKeys: ["a"] });
  const checkbox = useSelectionCheckbox({ selection, value: "a" });
  const [opened, setOpened] = useState(0);
  return <><output>{opened}</output><Table.Root><Table.Body><ActionDelegate targetId="open-a"><Table.Row selected={selection.isSelected("a")}><Table.Cell><Checkbox {...checkbox} aria-label="Select A" /></Table.Cell><Table.Cell data-testid="space">A</Table.Cell><Table.Cell><button id="open-a" onClick={() => setOpened(n => n + 1)}>Open A</button></Table.Cell></Table.Row></ActionDelegate></Table.Body></Table.Root></>;
}
describe("record composition", () => {
  it("keeps selection separate from delegated and direct activation", () => {
    const view = render(<Records />);
    fireEvent.click(view.getByRole("checkbox", { name: "Select A" }));
    expect(view.getByRole("row")).toHaveAttribute("data-selected", "");
    expect(view.getByRole("row")).not.toHaveAttribute("aria-selected");
    expect(view.getByRole("status")).toHaveTextContent("0");
    fireEvent.click(view.getByTestId("space"));
    expect(view.getByRole("status")).toHaveTextContent("1");
    fireEvent.click(view.getByRole("button", { name: "Open A" }));
    expect(view.getByRole("status")).toHaveTextContent("2");
    expect(view.getByRole("checkbox")).toBeChecked();
  });
});
