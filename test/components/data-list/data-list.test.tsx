import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataList } from "../../../src/data-list.js";

describe("DataList", () => {
  it("inherits recipe defaults while explicit false and sparse maps remain independent", () => {
    render(
      <DataList.PropsProvider
        value={{
          size: "lg",
          variant: "bold",
          orientation: "horizontal",
          divide: true,
        }}
      >
        <DataList.Root aria-label="Inherited" />
        <DataList.Root
          aria-label="Override"
          divide={false}
          size={{ md: "sm" }}
          orientation={{ lg: "horizontal" }}
          variant={{ md: "bold" }}
          labelWidth={{ sm: "lg" }}
        />
      </DataList.PropsProvider>,
    );
    const inherited = screen.getByLabelText("Inherited");
    expect(inherited).toHaveAttribute("data-size", "lg");
    expect(inherited).toHaveAttribute("data-variant", "bold");
    expect(inherited).toHaveAttribute("data-divide");
    const override = screen.getByLabelText("Override");
    expect(override).not.toHaveAttribute("data-divide");
    expect(override).toHaveAttribute("data-size", "md");
    expect(override).toHaveAttribute("data-size-md", "sm");
    expect(override).toHaveAttribute("data-orientation", "vertical");
    expect(override).toHaveAttribute("data-variant", "subtle");
    expect(override).toHaveAttribute("data-label-width", "auto");
  });
  it("preserves native grouped terms, all part refs and style forwarding", () => {
    const item = createRef<HTMLDivElement>(),
      label = createRef<HTMLElement>(),
      value = createRef<HTMLElement>();
    render(
      <DataList.Root>
        <DataList.Item ref={item} title="group">
          <DataList.Label ref={label} style={{ color: "red" }}>
            Author
          </DataList.Label>
          <DataList.Label>Editor</DataList.Label>
          <DataList.Value ref={value}>Jordan</DataList.Value>
          <DataList.Value>Sam</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    expect(item.current?.tagName).toBe("DIV");
    expect(label.current?.tagName).toBe("DT");
    expect(value.current?.tagName).toBe("DD");
    expect(label.current).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(Array.from(item.current!.children).map((n) => n.tagName)).toEqual([
      "DT",
      "DT",
      "DD",
      "DD",
    ]);
  });
  it("renders native description-list semantics with adopted defaults", () => {
    const ref = createRef<HTMLDListElement>();
    render(
      <DataList.Root data-testid="facts" ref={ref}>
        <DataList.Item>
          <DataList.Label>Email</DataList.Label>
          <DataList.Value>ada@example.com</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    const root = screen.getByTestId("facts");
    expect(root).toBe(ref.current);
    expect(root.tagName).toBe("DL");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root).toHaveAttribute("data-label-width", "auto");
    expect(root).toHaveAttribute("data-size", "md");
    expect(root).not.toHaveAttribute("data-divide");
    expect(root.querySelector("dt")).toHaveTextContent("Email");
    expect(root.querySelector("dd")).toHaveTextContent("ada@example.com");
  });

  it("exposes responsive orientation, separators, label measure, slots, and native props", () => {
    render(
      <DataList.Root
        aria-label="Profile facts"
        divide
        labelWidth="md"
        orientation={{ initial: "vertical", md: "horizontal" }}
        size="sm"
        slot="profile-facts"
      >
        <DataList.Item slot="profile-fact">
          <DataList.Label slot="profile-label">Role</DataList.Label>
          <DataList.Value slot="profile-value">Designer</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    const root = screen.getByLabelText("Profile facts");
    expect(root).toHaveAttribute("data-divide", "");
    expect(root).toHaveAttribute("data-orientation", "vertical");
    expect(root).toHaveAttribute("data-orientation-md", "horizontal");
    expect(root).toHaveAttribute("data-label-width", "md");
    expect(root).toHaveAttribute("data-size", "sm");
    expect(root).toHaveAttribute("data-slot", "profile-facts");
    expect(root.querySelector("[data-slot='profile-fact']")).not.toBeNull();
    expect(root.querySelector("[data-slot='profile-label']")?.tagName).toBe(
      "DT",
    );
    expect(root.querySelector("[data-slot='profile-value']")?.tagName).toBe(
      "DD",
    );
  });
});
