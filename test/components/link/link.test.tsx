import { createRef, forwardRef, type AnchorHTMLAttributes } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Link,
  type LinkSize,
  type LinkTone,
  type LinkVariant,
} from "../../../src/link.js";

describe("Link", () => {
  it("renders the adopted native default and forwards the anchor ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<Link href="/guides" ref={ref}>Read the guides</Link>);

    const link = screen.getByRole("link", { name: "Read the guides" });
    expect(link.tagName).toBe("A");
    expect(link).toBe(ref.current);
    expect(link).toHaveAttribute("href", "/guides");
    expect(link).toHaveClass("brick-link");
    expect(link).toHaveAttribute("data-slot", "link");
    expect(link).toHaveAttribute("data-variant", "underline");
    expect(link).toHaveAttribute("data-tone", "accent");
    expect(link).toHaveAttribute("data-size", "inherit");
    expect(link).not.toHaveAttribute("role");
    expect(link).not.toHaveAttribute("aria-disabled");
    expect(link.querySelector(".brick-link__content")).toHaveTextContent(
      "Read the guides",
    );
  });

  it("exposes every closed visual recipe without leaking visual props", () => {
    const variants: LinkVariant[] = ["underline", "plain"];
    const tones: LinkTone[] = ["accent", "neutral", "inherit"];
    const sizes: LinkSize[] = ["inherit", "sm", "md", "lg"];
    const { rerender } = render(<Link href="/reference">Reference</Link>);

    for (const variant of variants) {
      rerender(<Link href="/reference" variant={variant}>Reference</Link>);
      expect(screen.getByRole("link")).toHaveAttribute("data-variant", variant);
    }
    for (const tone of tones) {
      rerender(<Link href="/reference" tone={tone}>Reference</Link>);
      expect(screen.getByRole("link")).toHaveAttribute("data-tone", tone);
    }
    for (const size of sizes) {
      rerender(<Link href="/reference" size={size}>Reference</Link>);
      expect(screen.getByRole("link")).toHaveAttribute("data-size", size);
    }

    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("variant");
    expect(link).not.toHaveAttribute("tone");
    expect(link).not.toHaveAttribute("size");
    expect(link).not.toHaveAttribute("starticon");
    expect(link).not.toHaveAttribute("endicon");
  });

  it("renders decorative icons in stable logical order", () => {
    render(
      <Link
        href="/next"
        startIcon={<svg data-testid="start" />}
        endIcon={<svg data-testid="end" />}
      >
        Continue reading
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Continue reading" });
    const parts = Array.from(link.children);

    expect(parts).toHaveLength(3);
    expect(parts[0]).toHaveClass("brick-link__icon");
    expect(parts[0]).toHaveAttribute("data-position", "start");
    expect(parts[0]).toHaveAttribute("aria-hidden", "true");
    expect(parts[1]).toHaveClass("brick-link__content");
    expect(parts[2]).toHaveAttribute("data-position", "end");
    expect(screen.getByTestId("start")).toBeInTheDocument();
    expect(screen.getByTestId("end")).toBeInTheDocument();
  });

  it("passes native anchor attributes, events, current state, and hooks", () => {
    const onClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(
      <Link
        aria-current="page"
        className="consumer-link"
        data-evidence="native"
        download="guide.pdf"
        href="/guide.pdf"
        hrefLang="en"
        onClick={onClick}
        rel="help"
        data-slot="guide-link"
        style={{ textUnderlineOffset: "0.25em" }}
        target="_blank"
      >
        Download the guide
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Download the guide" });
    fireEvent.click(link);

    expect(onClick).toHaveBeenCalledOnce();
    expect(link).toHaveClass("brick-link", "consumer-link");
    expect(link).toHaveAttribute("data-slot", "guide-link");
    expect(link).toHaveAttribute("data-evidence", "native");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("download", "guide.pdf");
    expect(link).toHaveAttribute("hreflang", "en");
    expect(link).toHaveAttribute("rel", "help");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveStyle({ textUnderlineOffset: "0.25em" });
  });

  it("composes router-shaped anchors through asChild without extra anatomy", () => {
    const RouterLink = forwardRef<
      HTMLAnchorElement,
      AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(function RouterLink({ to, ...props }, ref) {
      return <a {...props} href={to} ref={ref} />;
    });
    const ref = createRef<HTMLAnchorElement>();
    render(
      <Link asChild ref={ref} tone="neutral">
        <RouterLink to="/account">Account settings</RouterLink>
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Account settings" });

    expect(link).toBe(ref.current);
    expect(link).toHaveAttribute("href", "/account");
    expect(link).toHaveClass("brick-link");
    expect(link).toHaveAttribute("data-tone", "neutral");
    expect(link.querySelector(".brick-link__content")).toBeNull();
  });

  it("composes through render while retaining Brick-owned normal anatomy", () => {
    render(
      <Link
        href="/reports"
        render={(props) => <a {...props} data-router="render" />}
      >
        View reports
      </Link>,
    );
    const link = screen.getByRole("link", { name: "View reports" });
    expect(link).toHaveAttribute("href", "/reports");
    expect(link).toHaveAttribute("data-router", "render");
    expect(link.querySelector(".brick-link__content")).toHaveTextContent(
      "View reports",
    );
  });
});
