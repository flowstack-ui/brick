import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Chip,
  ChipLabel,
  ChipRemoveTrigger,
  ChipRoot,
} from "../../../src/chip.js";

describe("Chip", () => {
  it("renders the three-part default value-token contract", () => {
    render(
      <Chip.Root data-testid="chip">
        <Chip.Label>Riley Chen</Chip.Label>
        <Chip.RemoveTrigger ariaLabel="Remove Riley Chen" />
      </Chip.Root>,
    );

    const root = screen.getByTestId("chip");
    expect(root.tagName).toBe("SPAN");
    expect(root).toHaveClass("brick-chip");
    expect(root).toHaveAttribute("data-slot", "badge");
    expect(root).toHaveAttribute("data-variant", "soft");
    expect(root).toHaveAttribute("data-tone", "neutral");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-shape", "pill");
    expect(root).not.toHaveAttribute("role");
    expect(root).not.toHaveAttribute("tabindex");

    expect(screen.getByText("Riley Chen")).toHaveClass("brick-chip__label");
    const remove = screen.getByRole("button", { name: "Remove Riley Chen" });
    expect(remove).toHaveClass("brick-chip__remove-trigger");
    expect(remove).toHaveAttribute("type", "button");
    expect(remove.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies closed recipes without leaking visual props", () => {
    render(
      <Chip.Root
        data-testid="chip"
        shape="rounded"
        size="lg"
        tone="accent"
        variant="outline"
      >
        <Chip.Label>Priority customer</Chip.Label>
      </Chip.Root>,
    );
    const root = screen.getByTestId("chip");
    expect(root).toHaveAttribute("data-shape", "rounded");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-tone", "accent");
    expect(root).toHaveAttribute("data-variant", "outline");
    expect(root).not.toHaveAttribute("shape");
    expect(root).not.toHaveAttribute("size");
    expect(root).not.toHaveAttribute("tone");
    expect(root).not.toHaveAttribute("variant");
  });

  it("requests removal exactly once through Atom Button", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Chip.Root>
        <Chip.Label>Design</Chip.Label>
        <Chip.RemoveTrigger ariaLabel="Remove Design" onPress={onPress} />
      </Chip.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Remove Design" }));
    expect(onPress).toHaveBeenCalledOnce();
  });

  it("preserves disabled behavior and custom trigger content", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();
    render(
      <Chip.Root>
        <Chip.Label>Locked</Chip.Label>
        <Chip.RemoveTrigger ariaLabel="Remove Locked" disabled onPress={onPress}>
          <span aria-hidden="true">×</span>
        </Chip.RemoveTrigger>
      </Chip.Root>,
    );

    const trigger = screen.getByRole("button", { name: "Remove Locked" });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("data-disabled");
    expect(trigger).toHaveTextContent("×");
    await user.click(trigger);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("preserves native props, refs, slots, classes, and styles", () => {
    const rootRef = createRef<HTMLSpanElement>();
    const labelRef = createRef<HTMLSpanElement>();
    const triggerRef = createRef<HTMLElement>();
    render(
      <ChipRoot
        aria-label="Assigned reviewer"
        className="consumer-root"
        data-evidence="native"
        ref={rootRef}
        style={{ maxWidth: 180 }}
      >
        <ChipLabel className="consumer-label" ref={labelRef}>Morgan Lee</ChipLabel>
        <ChipRemoveTrigger
          ariaLabel="Remove Morgan Lee"
          className="consumer-trigger"
          data-slot="custom-remove"
          ref={triggerRef}
        />
      </ChipRoot>,
    );

    expect(rootRef.current).toHaveClass("brick-chip", "consumer-root");
    expect(rootRef.current).toHaveAttribute("aria-label", "Assigned reviewer");
    expect(rootRef.current).toHaveAttribute("data-evidence", "native");
    expect(rootRef.current).toHaveStyle({ maxWidth: "180px" });
    expect(labelRef.current).toHaveClass("brick-chip__label", "consumer-label");
    expect(triggerRef.current).toHaveClass("brick-chip__remove-trigger", "consumer-trigger");
    expect(triggerRef.current).toHaveAttribute("data-slot", "custom-remove");
  });

  it("keeps namespace and named exports identical", () => {
    expect(Chip.Root).toBe(ChipRoot);
    expect(Chip.Label).toBe(ChipLabel);
    expect(Chip.RemoveTrigger).toBe(ChipRemoveTrigger);
  });
});
