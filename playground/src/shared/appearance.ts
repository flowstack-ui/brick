import { useEffect, useState } from "react";

export type Appearance = "system" | "light" | "dark";
export type Direction = "ltr" | "rtl";

export function useReviewEnvironment() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [direction, setDirection] = useState<Direction>("ltr");

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

  return {
    appearance,
    direction,
    setAppearance,
    setDirection,
  };
}
