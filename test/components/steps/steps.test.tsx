import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Steps } from "../../../src/steps.js";
import { Button } from "../../../src/button.js";
import { LocaleProvider } from "../../../src/locale-provider.js";

function Stage({ index, title }: { index: number; title: string }) {
  return <Steps.Item index={index}><Steps.Trigger><Steps.Indicator /><Steps.Title>{title}</Steps.Title></Steps.Trigger><Steps.Separator /></Steps.Item>;
}
describe("Steps", () => {
  it("isolates nested workflows and normalizes count changes", () => {
    const complete = vi.fn();
    const { rerender } = render(<Steps.Root count={2} step={1} onStepComplete={complete}>
      <Steps.Context>{state => <output data-testid="outer-step">{state.step}</output>}</Steps.Context>
      <Steps.Root count={2}><Steps.NextTrigger>Inner next</Steps.NextTrigger><Steps.Context>{state => <output data-testid="inner-step">{state.step}</output>}</Steps.Context></Steps.Root>
    </Steps.Root>);
    fireEvent.click(screen.getByRole("button", { name: "Inner next" }));
    expect(screen.getByTestId("inner-step")).toHaveTextContent("1");
    expect(screen.getByTestId("outer-step")).toHaveTextContent("1");
    expect(complete).not.toHaveBeenCalled();
    rerender(<Steps.Root count={1} step={1} onStepComplete={complete}><Steps.CompletedContent aria-label="Complete">Done</Steps.CompletedContent></Steps.Root>);
    expect(complete).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("group", { name: "Complete" })).toBeVisible();
  });
  it("localizes indicator numbers and does not report rejected controlled completion", () => {
    const complete = vi.fn(); const change = vi.fn();
    const { container, rerender } = render(<LocaleProvider locale="ar-EG"><Steps.Root count={1} step={0} onStepChange={change} onStepComplete={complete}><Steps.List><Stage index={0} title="Account" /></Steps.List><Steps.NextTrigger>Next</Steps.NextTrigger></Steps.Root></LocaleProvider>);
    expect(container.querySelector(".brick-steps-indicator")).toHaveTextContent(new Intl.NumberFormat("ar-EG").format(1));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(change).toHaveBeenCalledWith(1); expect(complete).not.toHaveBeenCalled();
    rerender(<Steps.Root count={1} step={1} onStepComplete={complete} />);
    expect(complete).not.toHaveBeenCalled();
  });
  it("delegates workflow state and composes Button without nested buttons", () => {
    const ref = createRef<HTMLDivElement>(); const complete = vi.fn();
    const { container } = render(<Steps.Root ref={ref} count={2} onStepComplete={complete}>
      <Steps.List><Stage index={0} title="Account" /><Stage index={1} title="Review" /></Steps.List>
      <Steps.Content index={0}>Account content</Steps.Content><Steps.Content index={1}>Review content</Steps.Content>
      <Steps.CompletedContent aria-label="Complete">Done</Steps.CompletedContent>
      <Steps.NextTrigger asChild><Button>Next</Button></Steps.NextTrigger>
    </Steps.Root>);
    expect(ref.current).toHaveClass("brick-steps");
    expect(ref.current).toHaveAttribute("data-size", "md");
    expect(screen.getByRole("group", { name: "Account" })).toBeVisible();
    expect(container.querySelector("button button")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("group", { name: "Review" })).toBeVisible();
    expect(container.querySelector(".brick-steps-check")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("group", { name: "Complete" })).toBeVisible();
    expect(complete).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });
  it("supports custom indicators, recipes, and guarded controlled requests", () => {
    const change = vi.fn(); const invalid = vi.fn();
    render(<Steps.Root count={2} step={0} onStepChange={change} linear isStepValid={() => false} onStepInvalid={invalid} size="sm" variant="subtle" tone="neutral">
      <Steps.List><Steps.Item index={0}><Steps.Indicator asChild><span data-testid="custom">A</span></Steps.Indicator><Steps.Title>First</Steps.Title></Steps.Item><Stage index={1} title="Last" /></Steps.List>
    </Steps.Root>);
    expect(screen.getByTestId("custom")).toHaveClass("brick-steps-indicator");
    fireEvent.click(screen.getByRole("button", { name: "Last" }));
    expect(change).not.toHaveBeenCalled(); expect(invalid).toHaveBeenCalledWith({ step: 0, targetStep: 1 });
  });
});
