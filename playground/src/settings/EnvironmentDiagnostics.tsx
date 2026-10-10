import { useEffect, useState } from "react";
import { Text } from "@flowstack-ui/brick";

export function EnvironmentDiagnostics() {
  const [description, setDescription] = useState("");
  useEffect(() => {
    const media = [matchMedia("(prefers-color-scheme: dark)"), matchMedia("(prefers-reduced-motion: reduce)"), matchMedia("(forced-colors: active)"), matchMedia("(pointer: coarse)")];
    const update = () => setDescription(`Browser reports: ${media[0].matches ? "dark" : "light"} system appearance; ${media[1].matches ? "reduced" : "ordinary"} motion; forced colors ${media[2].matches ? "on" : "off"}; ${media[3].matches ? "coarse" : "fine or unavailable"} primary pointer.`);
    update();
    media.forEach(query => query.addEventListener("change", update));
    return () => media.forEach(query => query.removeEventListener("change", update));
  }, []);
  return <Text variant="body-sm" tone="secondary">{description} These are browser preferences, not simulated switches.</Text>;
}
