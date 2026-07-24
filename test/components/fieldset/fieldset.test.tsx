import { createRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CheckboxGroup } from "@flowstack-ui/atom/checkbox-group";
import {
  Fieldset,
  FieldsetDescription,
  FieldsetError,
  FieldsetLegend,
  FieldsetRoot,
} from "../../../src/fieldset.js";

describe("Fieldset", () => {
  it("owns the exact frozen namespace", () => {
    expect(Object.keys(Fieldset)).toEqual([
      "Root",
      "Legend",
      "Description",
      "Error",
    ]);
    expect(Object.isFrozen(Fieldset)).toBe(true);
    expect(Fieldset.Root).toBe(FieldsetRoot);
    expect(Fieldset.Legend).toBe(FieldsetLegend);
    expect(Fieldset.Description).toBe(FieldsetDescription);
    expect(Fieldset.Error).toBe(FieldsetError);
  });

  it("owns native semantics, relationships, indicators, and group state", () => {
    render(
      <Fieldset.Root id="topics" disabled invalid required>
        <Fieldset.Legend>Topics</Fieldset.Legend>
        <Fieldset.Description>Choose at least one.</Fieldset.Description>
        <CheckboxGroup.Root name="topics">
          <CheckboxGroup.Item value="news">News</CheckboxGroup.Item>
        </CheckboxGroup.Root>
        <Fieldset.Error>Choose a topic.</Fieldset.Error>
      </Fieldset.Root>,
    );
    const root = document.querySelector("#topics") as HTMLFieldSetElement;
    const group = document.querySelector('[data-slot="checkbox-group"]');
    expect(root.tagName).toBe("FIELDSET");
    expect(root).toHaveClass("brick-fieldset");
    expect(root).toBeDisabled();
    expect(root).toHaveAttribute("aria-invalid", "true");
    expect(root).toHaveAttribute(
      "aria-describedby",
      "topics-description topics-error",
    );
    expect(group).toHaveAttribute("aria-labelledby", "topics-legend");
    expect(group).toHaveAttribute(
      "aria-describedby",
      "topics-description topics-error",
    );
  });

  it("preserves relationships in asChild server markup", () => {
    const html = renderToStaticMarkup(
      <Fieldset.Root asChild id="methods" invalid>
        <fieldset>
          <Fieldset.Legend>Methods</Fieldset.Legend>
          <Fieldset.Description>Choose one.</Fieldset.Description>
          <CheckboxGroup.Root name="methods">
            <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Fieldset.Error>Selection required.</Fieldset.Error>
        </fieldset>
      </Fieldset.Root>,
    );
    expect(html).toContain('class="brick-fieldset"');
    expect(html).toContain('id="methods-legend"');
    expect(html).toContain(
      'aria-describedby="methods-description methods-error"',
    );
  });

  it("forwards native hooks and every part composition path", () => {
    const ref = createRef<HTMLFieldSetElement>();
    const onClick = vi.fn();
    render(
      <Fieldset.Root className="consumer-fieldset" data-slot="preferences" id="preferences" invalid onClick={onClick} ref={ref} render={<fieldset data-adapter="fieldset" />}>
        <Fieldset.Legend asChild><legend>Preferences</legend></Fieldset.Legend>
        <Fieldset.Description render={<div />}>Help</Fieldset.Description>
        <Fieldset.Error asChild><div>Error</div></Fieldset.Error>
      </Fieldset.Root>,
    );
    expect(ref.current).toHaveClass("brick-fieldset", "consumer-fieldset");
    expect(ref.current).toHaveAttribute("data-slot", "preferences");
    expect(ref.current).toHaveAttribute("data-adapter", "fieldset");
    expect(screen.getByText(/Preferences/)).toHaveClass("brick-fieldset-legend");
    expect(screen.getByText("Help")).toHaveClass("brick-fieldset-description");
    expect(screen.getByText("Error")).toHaveClass("brick-fieldset-error");
    fireEvent.click(ref.current!);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
