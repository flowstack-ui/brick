import { StrictMode, useState, type CSSProperties, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Card,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
  type CardSize,
  type CardVariant,
} from "@flowstack-ui/brick";
import "@flowstack-ui/brick/styles.css";
import "./playground.css";

type Appearance = "system" | "light" | "dark";

const variants: ButtonVariant[] = ["solid", "soft", "outline", "ghost"];
const tones: ButtonTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: ButtonShape[] = ["sharp", "rounded", "pill"];
const cardVariants: CardVariant[] = ["outline", "elevated", "subtle"];
const cardSizes: CardSize[] = ["sm", "md", "lg"];

function ArrowIcon({ direction = "end" }: { direction?: "start" | "end" }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path
        d={direction === "start" ? "m12.5 4.5-5.5 5.5 5.5 5.5" : "m7.5 4.5 5.5 5.5-5.5 5.5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function Scenario({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  const id = `scenario-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className="scenario">
      <div className="scenario-heading">
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function ButtonPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [pressCount, setPressCount] = useState(0);

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  return (
    <div className="playground-shell">
      <header className="playground-header">
        <div>
          <p className="playground-kicker">@flowstack-ui/brick</p>
          <h1>Button workbench</h1>
          <p>First implementation review: API, visual recipes, responsive behavior, and Atom composition.</p>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <Button
              aria-pressed={appearance === value}
              key={value}
              onPress={() => selectAppearance(value)}
              size="sm"
              tone="neutral"
              variant={appearance === value ? "soft" : "ghost"}
            >
              {value}
            </Button>
          ))}
        </fieldset>
      </header>

      <main data-testid="button-workbench">
        <Scenario
          description="The shortest finished action uses the solid accent, medium size, and rounded shape defaults."
          title="Overview"
        >
          <div className="scenario-canvas scenario-canvas--hero" data-testid="button-overview">
            <div>
              <p className="scenario-eyebrow">Ready to publish</p>
              <h2>Make the next action obvious.</h2>
              <p>Button supplies a complete visual treatment while Atom keeps native interaction and semantics.</p>
            </div>
            <Button endIcon={<ArrowIcon />} onPress={() => setPressCount((value) => value + 1)}>
              Publish project
            </Button>
            <span aria-atomic="true" className="press-status" role="status">
              Pressed {pressCount} {pressCount === 1 ? "time" : "times"}
            </span>
          </div>
        </Scenario>

        <Scenario
          description="Variant communicates hierarchy. Tone communicates semantic meaning."
          title="Variants"
        >
          <div className="recipe-grid recipe-grid--cells" data-testid="button-variants">
            {variants.map((variant) => (
              <div className="recipe-cell" key={variant}>
                <code>{variant}</code>
                <Button variant={variant}>{variant}</Button>
              </div>
            ))}
          </div>
        </Scenario>

        <Scenario
          description="Accent is the normal product action. Status tones are reserved for actions with real status meaning."
          title="Tones"
        >
          <div className="recipe-grid recipe-grid--cells" data-testid="button-tones">
            {tones.map((tone) => (
              <div className="recipe-cell" key={tone}>
                <code>{tone}</code>
                <Button tone={tone}>{tone}</Button>
              </div>
            ))}
          </div>
          <div className="recipe-grid recipe-grid--soft">
            {tones.map((tone) => (
              <Button key={tone} tone={tone} variant="soft">
                {tone} soft
              </Button>
            ))}
          </div>
        </Scenario>

        <Scenario
          description="The scale runs from dense expert interfaces to deliberately prominent calls to action; md is the mobile-first default."
          title="Sizes"
        >
          <div className="inline-demo inline-demo--baseline" data-testid="button-sizes">
            {sizes.map((size) => (
              <Button key={size} size={size} variant="outline">
                {size} button
              </Button>
            ))}
          </div>
        </Scenario>

        <Scenario
          description="Shape is a closed recipe. Full width is explicit and breakpoint-dependent width stays in application CSS."
          title="Shape and width"
        >
          <div className="recipe-grid shape-demo" data-testid="button-shapes">
            {shapes.map((shape) => (
              <Button key={shape} shape={shape} variant="soft">
                {shape === "pill" ? "Pill action" : shape}
              </Button>
            ))}
          </div>
          <div className="width-demo">
            <Button fullWidth>Explicit full width</Button>
            <Button className="playground-responsive-button" tone="neutral" variant="outline">
              Responsive through CSS
            </Button>
          </div>
        </Scenario>

        <Scenario
          description="Icons are decorative supplements. Loading preserves the accessible label and layout while Atom blocks activation."
          title="Content and states"
        >
          <div className="inline-demo" data-testid="button-states">
            <Button startIcon={<ArrowIcon direction="start" />} variant="outline">Back</Button>
            <Button endIcon={<ArrowIcon />}>Continue</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Saving changes</Button>
          </div>
          <form
            className="form-demo"
            onSubmit={(event) => {
              event.preventDefault();
              setPressCount((value) => value + 1);
            }}
          >
            <label>
              Project name
              <input defaultValue="Mobile storefront" name="project" />
            </label>
            <Button type="submit">Save form</Button>
            <Button tone="neutral" type="reset" variant="ghost">Reset</Button>
          </form>
        </Scenario>

        <Scenario
          description="Button renders native links and forwards Atom’s asChild and render composition paths without changing their semantics."
          title="Links and composition"
        >
          <div className="inline-demo" id="composition">
            <Button href="#composition" variant="outline">Native anchor</Button>
            <Button asChild tone="info" variant="soft">
              <a href="#composition">Composed anchor</a>
            </Button>
            <Button render={<a href="#composition" />} tone="neutral" variant="ghost">
              Rendered anchor
            </Button>
            <Button disabled href="#composition" tone="danger" variant="outline">
              Inactive anchor
            </Button>
          </div>
        </Scenario>

        <Scenario
          description="Scoped appearance and public Button tokens customize a local region without changing the component API."
          title="Appearance and customization"
        >
          <div className="appearance-grid">
            <div className="appearance-panel" data-brick-appearance="light">
              <span>Light scope</span>
              <Button>Light action</Button>
            </div>
            <div className="appearance-panel" data-brick-appearance="dark">
              <span>Dark scope</span>
              <Button>Dark action</Button>
            </div>
          </div>
          <div className="inline-demo">
            <Button
              style={{
                "--brick-button-background": "#6b2f88",
                "--brick-button-background-hover": "#7d3b9c",
                "--brick-button-background-pressed": "#58266f",
                "--brick-button-foreground": "#ffffff",
              } as CSSProperties}
            >
              Component tokens
            </Button>
            <Button className="playground-dashed-button" data-slot="custom-action" tone="neutral" variant="outline">
              Class, style, and slot
            </Button>
          </div>
        </Scenario>

        <Scenario
          description="Labels wrap and controls grow instead of clipping in constrained, localized, zoomed, or RTL layouts."
          title="Mobile and stress"
        >
          <div className="stress-grid" data-testid="button-stress">
            <div className="phone-frame">
              <p>20rem constrained canvas</p>
              <Button fullWidth>Continue with the carefully selected delivery preferences</Button>
            </div>
            <div className="phone-frame" dir="rtl">
              <p>Right-to-left content</p>
              <Button endIcon={<ArrowIcon direction="start" />} fullWidth tone="info" variant="soft">
                متابعة إعداد مساحة العمل
              </Button>
            </div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

function CardPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  return (
    <div className="playground-shell">
      <header className="playground-header">
        <div>
          <p className="playground-kicker">@flowstack-ui/brick</p>
          <h1>Card workbench</h1>
          <p>Static compound anatomy, neutral surface hierarchy, semantic composition, and resilient content.</p>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <Button
              aria-pressed={appearance === value}
              key={value}
              onPress={() => selectAppearance(value)}
              size="sm"
              tone="neutral"
              variant={appearance === value ? "soft" : "ghost"}
            >
              {value}
            </Button>
          ))}
        </fieldset>
      </header>

      <main data-testid="card-workbench">
        <Scenario
          description="The default Card is a neutral outlined surface. Its visible subject and actions remain explicit parts."
          title="Overview"
        >
          <div className="card-stage card-stage--hero" data-testid="card-overview">
            <Card.Root as="article" aria-labelledby="quarterly-report-title">
              <Card.Header>
                <Card.Title as="h2" id="quarterly-report-title">Quarterly report</Card.Title>
                <Card.Description>Performance snapshot · updated five minutes ago</Card.Description>
                <Card.Action>
                  <Button size="sm" tone="neutral" variant="ghost">More</Button>
                </Card.Action>
              </Card.Header>
              <Card.Content>
                <p className="card-metric">24.8%</p>
                <p>Conversion improved across every mobile checkout step.</p>
              </Card.Content>
              <Card.Footer>
                <Button size="sm">Open report</Button>
                <Button size="sm" tone="neutral" variant="outline">Export</Button>
              </Card.Footer>
            </Card.Root>
          </div>
        </Scenario>

        <Scenario
          description="Variant changes surface prominence without changing Card semantics or interaction."
          title="Variants"
        >
          <div className="card-grid" data-testid="card-variants">
            {cardVariants.map((variant) => (
              <Card.Root key={variant} variant={variant}>
                <Card.Header>
                  <Card.Title>{variant}</Card.Title>
                  <Card.Description>{variant === "outline" ? "Clear boundary" : variant === "elevated" ? "Raised prominence" : "Quiet grouping"}</Card.Description>
                </Card.Header>
                <Card.Content>One subject, the same anatomy, and a different place in the visual hierarchy.</Card.Content>
              </Card.Root>
            ))}
          </div>
        </Scenario>

        <Scenario
          description="Size coordinates section inset, region spacing, and title scale; it never sets width or height."
          title="Sizes"
        >
          <div className="card-grid card-grid--sizes" data-testid="card-sizes">
            {cardSizes.map((size) => (
              <Card.Root key={size} size={size}>
                <Card.Header>
                  <Card.Title>{size} Card</Card.Title>
                  <Card.Description>Complete {size} density recipe</Card.Description>
                </Card.Header>
                <Card.Content>Content remains readable and wraps naturally.</Card.Content>
                <Card.Footer><Button size="sm" variant="outline">Review</Button></Card.Footer>
              </Card.Root>
            ))}
          </div>
        </Scenario>

        <Scenario
          description="Every region is optional. Card does not generate titles, controls, separators, or action data."
          title="Anatomy"
        >
          <div className="card-grid card-grid--anatomy" data-testid="card-anatomy">
            <Card.Root>
              <Card.Content><strong>Content only</strong><p>No empty header or footer is rendered.</p></Card.Content>
            </Card.Root>
            <Card.Root variant="subtle">
              <Card.Header><Card.Title>Header only</Card.Title><Card.Description>Title and supporting copy</Card.Description></Card.Header>
            </Card.Root>
            <Card.Root>
              <Card.Footer><Button size="sm">Footer action</Button><span>Secondary metadata</span></Card.Footer>
            </Card.Root>
            <Card.Root>
              <Card.Header>
                <Card.Title>Trailing action</Card.Title>
                <Card.Description>Compact controls belong in Card.Action.</Card.Description>
                <Card.Action><Button size="sm" tone="neutral" variant="ghost">Edit</Button></Card.Action>
              </Card.Header>
            </Card.Root>
          </div>
        </Scenario>

        <Scenario
          description="Native images and real controls compose through children; Card owns neither media semantics nor press behavior."
          title="Composition"
        >
          <div className="card-grid card-grid--two" data-testid="card-composition">
            <Card.Root as="article">
              <div aria-hidden="true" className="card-media-demo" />
              <Card.Header><Card.Title as="h2">Coastal workspace</Card.Title><Card.Description>Media remains ordinary composed content.</Card.Description></Card.Header>
              <Card.Footer><Button size="sm">View workspace</Button></Card.Footer>
            </Card.Root>
            <a
              aria-labelledby="single-action-card-title"
              className="card-link"
              href="#single-action-card"
            >
              <Card.Root as="article" id="single-action-card" variant="subtle">
                <Card.Header><Card.Title as="h2" id="single-action-card-title">Single-action preview</Card.Title><Card.Description>A real link owns focus and navigation; this Card contains no nested controls.</Card.Description></Card.Header>
              </Card.Root>
            </a>
          </div>
        </Scenario>

        <Scenario
          description="Appearance scopes and the three public Card tokens customize material without changing anatomy."
          title="Appearance and customization"
        >
          <div className="card-appearance-grid" data-testid="card-appearance">
            <div data-brick-appearance="light"><Card.Root><Card.Header><Card.Title>Light scope</Card.Title></Card.Header><Card.Content>Finished light values.</Card.Content></Card.Root></div>
            <div data-brick-appearance="dark"><Card.Root><Card.Header><Card.Title>Dark scope</Card.Title></Card.Header><Card.Content>Finished dark values.</Card.Content></Card.Root></div>
          </div>
          <Card.Root
            className="card-customized"
            data-slot="project-summary"
            style={{
              "--brick-card-radius": "0.25rem",
              "--brick-card-shadow": "0 1rem 3rem rgb(53 46 91 / 25%)",
              "--brick-card-space": "2rem",
            } as CSSProperties}
            variant="elevated"
          >
            <Card.Header data-slot="project-summary-header"><Card.Title>Component tokens</Card.Title><Card.Description>Local spacing, radius, shadow, classes, styles, and slots.</Card.Description></Card.Header>
            <Card.Content>The supported recipe remains inspectable.</Card.Content>
          </Card.Root>
        </Scenario>

        <Scenario
          description="Logical properties, minimum-zero columns, wrapping footers, and application-owned grids protect narrow, zoomed, translated, and RTL layouts."
          title="Mobile and stress"
        >
          <div className="stress-grid" data-testid="card-stress">
            <div className="phone-frame">
              <Card.Root>
                <Card.Header><Card.Title>Extremely detailed delivery preferences and account verification</Card.Title><Card.Description>Unbroken reference: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ</Card.Description><Card.Action><Button size="sm" tone="neutral" variant="ghost">Edit</Button></Card.Action></Card.Header>
                <Card.Content>Long content wraps instead of expanding the page beyond its constrained canvas.</Card.Content>
                <Card.Footer><Button size="sm">Confirm preferences</Button><Button size="sm" tone="neutral" variant="outline">Review everything again</Button></Card.Footer>
              </Card.Root>
            </div>
            <div className="phone-frame" dir="rtl">
              <Card.Root variant="subtle">
                <Card.Header><Card.Title>إعداد مساحة العمل</Card.Title><Card.Description>يتكيف المحتوى من اليمين إلى اليسار دون تغيير ترتيب المصدر.</Card.Description><Card.Action><Button size="sm" tone="neutral" variant="ghost">تعديل</Button></Card.Action></Card.Header>
                <Card.Content>تظل البنية واضحة وقابلة للقراءة على الشاشات الضيقة.</Card.Content>
                <Card.Footer><Button size="sm">متابعة</Button><Button size="sm" tone="neutral" variant="outline">إلغاء</Button></Card.Footer>
              </Card.Root>
            </div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.location.pathname.startsWith("/card") ? <CardPlayground /> : <ButtonPlayground />}
  </StrictMode>,
);
