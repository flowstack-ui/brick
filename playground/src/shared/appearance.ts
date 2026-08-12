import { useEffect, useState } from "react";

export type Appearance = "system" | "light" | "dark";
export type Direction = "ltr" | "rtl";
export type Theme = "brick" | "qualification";

function initialTheme(): Theme {
  return document.documentElement.dataset.flowstackTheme === "qualification"
    ? "qualification"
    : "brick";
}

export function useReviewEnvironment() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [direction, setDirection] = useState<Direction>("ltr");
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    if (appearance === "system") {
      document.documentElement.removeAttribute("data-brick-appearance");
    } else {
      document.documentElement.dataset.brickAppearance = appearance;
    }
  }, [appearance]);

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (theme === "qualification") {
      document.documentElement.dataset.flowstackTheme = theme;
      url.searchParams.set("theme", theme);
    } else {
      document.documentElement.removeAttribute("data-flowstack-theme");
      url.searchParams.delete("theme");
    }
    window.history.replaceState(window.history.state, "", url);
  }, [theme]);

  return {
    appearance,
    direction,
    theme,
    setAppearance,
    setDirection,
    setTheme,
  };
}
