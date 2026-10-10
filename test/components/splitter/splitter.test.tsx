import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import { describe, it, expect } from "vitest";
import { Splitter } from "../../../src/splitter.js";
describe("Splitter", () => {
  it("adds only styled anatomy and delegates keyboard sizing", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<Splitter.Root ref={ref} panels={[{ id: "a" }, { id: "b" }]}>
      <Splitter.Panel panelId="a">Files</Splitter.Panel><Splitter.ResizeTrigger before="a" after="b" aria-label="Files width" /><Splitter.Panel panelId="b">Editor</Splitter.Panel>
    </Splitter.Root>);
    expect(ref.current).toHaveClass("brick-splitter");
    expect(container.querySelectorAll(".brick-splitter-indicator")).toHaveLength(1);
    expect(container.querySelectorAll(".brick-splitter-separator")).toHaveLength(1);
    const trigger = screen.getByRole("separator"); fireEvent.keyDown(trigger, { key: "ArrowRight" });
    expect(trigger).toHaveAttribute("aria-valuenow", "51");
  });
  it("supports line-only customization and native refs/classes", () => {
    const { container } = render(<Splitter.Root panels={[{ id: "a" }, { id: "b" }]}>
      <Splitter.Panel panelId="a" /><Splitter.ResizeTrigger before="a" after="b" aria-label="Resize" className="custom"><Splitter.ResizeTriggerSeparator /></Splitter.ResizeTrigger><Splitter.Panel panelId="b" />
    </Splitter.Root>);
    expect(screen.getByRole("separator")).toHaveClass("custom"); expect(container.querySelector(".brick-splitter-indicator")).toBeNull();
  });
});
