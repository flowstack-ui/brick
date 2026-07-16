import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import * as Brick from "@flowstack-ui/brick";
import "@flowstack-ui/brick/styles.css";
import "./playground.css";

void Brick;

type Appearance = "system" | "light" | "dark";

function setDocumentAppearance(appearance: Appearance) {
  if (appearance === "system") {
    document.documentElement.removeAttribute("data-brick-appearance");
  } else {
    document.documentElement.dataset.brickAppearance = appearance;
  }
}

function Playground() {
  const [appearance, setAppearance] = useState<Appearance>("system");

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    setDocumentAppearance(next);
  }

  return (
    <div className="playground-shell">
      <header className="playground-header">
        <div>
          <p className="playground-kicker">@flowstack-ui/brick</p>
          <h1>Component playground</h1>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <button
              aria-pressed={appearance === value}
              key={value}
              onClick={() => selectAppearance(value)}
              type="button"
            >
              {value}
            </button>
          ))}
        </fieldset>
      </header>

      <main>
        <section aria-labelledby="foundation-title" className="playground-canvas" data-testid="foundation-canvas">
          <p className="playground-status">Foundation checkpoint</p>
          <h2 id="foundation-title">The public package is ready for component design.</h2>
          <p>
            This temporary workbench uses semantic HTML and playground-only CSS.
            Its controls and surfaces will be replaced with public Brick components
            as each reference component becomes package-complete.
          </p>

          <div aria-label="Semantic color tokens" className="playground-swatches">
            {[
              ["Accent", "accent"],
              ["Info", "info"],
              ["Success", "success"],
              ["Warning", "warning"],
              ["Danger", "danger"],
            ].map(([label, tone]) => (
              <div className="playground-swatch" data-tone={tone} key={tone}>
                <span aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
