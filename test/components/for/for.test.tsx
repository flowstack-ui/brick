import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { For } from "../../../src/for.js";
import { Select } from "../../../src/select.js";

describe("For", () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders typed items and indices without a wrapper", () => {
    const { container } = render(<ul><For each={["One", "Two"]}>{(item, index) => <li key={item}>{index}:{item}</li>}</For></ul>);
    expect(screen.getByText("0:One")).toBeVisible();
    expect(screen.getByText("1:Two")).toBeVisible();
    expect(container.querySelectorAll("ul > li")).toHaveLength(2);
  });

  it("renders fallback for empty or missing data", () => {
    const { rerender } = render(<For each={[] as string[]} fallback={<p>Empty</p>}>{item => <span>{item}</span>}</For>);
    expect(screen.getByText("Empty")).toBeVisible();
    rerender(<For<readonly string[] | undefined> each={undefined} fallback={<p>Missing</p>}>{item => <span>{item}</span>}</For>);
    expect(screen.getByText("Missing")).toBeVisible();
  });

  it("preserves its render child across parent state updates", async () => {
    const user = userEvent.setup();
    function Fixture() {
      const [suffix, setSuffix] = useState("one");
      return (
        <div>
          <button onClick={() => setSuffix("two")}>Update</button>
          <For each={["Item"]}>{(item) => <span key={item}>{item} {suffix}</span>}</For>
        </div>
      );
    }

    render(<Fixture />);
    await user.click(screen.getByRole("button", { name: "Update" }));
    expect(screen.getByText("Item two")).toBeVisible();
  });

  it("renders collection items through Select state updates", () => {
    render(
      <Select.Root defaultOpen defaultValue="one">
        <Select.Trigger aria-label="Value"><Select.Value /></Select.Trigger>
        <Select.Content disablePortal>
          <Select.Viewport>
            <For each={["one", "two"]}>{(value) => (
              <Select.Item key={value} value={value}>
                <Select.ItemText>{value}</Select.ItemText>
              </Select.Item>
            )}</For>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>,
    );
    fireEvent.click(screen.getByRole("option", { name: "two" }));
    expect(screen.getByRole("combobox", { name: "Value" })).toHaveTextContent("two");
  });
});
