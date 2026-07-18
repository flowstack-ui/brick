import { StrictMode, useState, type CSSProperties, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Card,
  Dialog,
  AlertDialog,
  type AlertDialogSize,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
  type CardSize,
  type CardVariant,
  type DialogSize,
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
const dialogSizes: DialogSize[] = ["sm", "md", "lg"];
const alertDialogSizes: AlertDialogSize[] = ["sm", "md"];

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

function DialogDemo({
  body = "A focused task stays explicit while the page behind it is unavailable.",
  dir,
  label,
  size = "md",
}: {
  body?: ReactNode;
  dir?: "ltr" | "rtl";
  label: string;
  size?: DialogSize;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">{label}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content dir={dir} size={size}>
          <Dialog.Header>
            <Dialog.Title>{label}</Dialog.Title>
            <Dialog.Description>Brick presentation composed directly on Atom modal behavior.</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>{body}</Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button tone="neutral" variant="outline">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button>Save changes</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function DialogPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [eventLog, setEventLog] = useState("No dialog event yet");

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
          <h1>Dialog workbench</h1>
          <p>Modal anatomy, responsive surfaces, bounded body scrolling, focus, dismissal, and composition.</p>
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

      <main data-testid="dialog-workbench">
        <Scenario description="The shortest finished modal keeps every behavioral and semantic choice visible." title="Overview">
          <div className="dialog-stage" data-testid="dialog-overview">
            <DialogDemo label="Edit profile" />
          </div>
        </Scenario>

        <Scenario description="Small, medium, and large change only the preferred maximum inline measure." title="Sizes">
          <div className="dialog-launch-grid" data-testid="dialog-sizes">
            {dialogSizes.map((size) => <DialogDemo key={size} label={`Open ${size} dialog`} size={size} />)}
          </div>
        </Scenario>

        <Scenario description="Header, scrollable Body, and Footer remain separate public regions." title="Anatomy">
          <div className="dialog-stage" data-testid="dialog-anatomy">
            <DialogDemo
              body={<form className="dialog-form"><label>Display name<input defaultValue="Ada Lovelace" /></label><label>Team role<input defaultValue="Product engineer" /></label></form>}
              label="Inspect dialog anatomy"
            />
          </div>
        </Scenario>

        <Scenario description="Escape, exact-overlay clicks, and explicit Close preserve Atom close reasons." title="States and dismissal">
          <div className="dialog-stage">
            <Dialog.Root onOpenChange={(open, reason) => setEventLog(open ? "Opened" : `Closed: ${reason ?? "controlled"}`)}>
              <Dialog.Trigger asChild><Button>Open event dialog</Button></Dialog.Trigger>
              <Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Header><Dialog.Title>Dismissal evidence</Dialog.Title><Dialog.Description>Try Escape, the scrim, Cancel, or Save.</Dialog.Description></Dialog.Header><Dialog.Body>Only the top active modal responds.</Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button tone="neutral" variant="outline">Cancel</Button></Dialog.Close><Dialog.Close asChild><Button>Save</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal>
            </Dialog.Root>
            <output aria-live="polite" className="dialog-event-log">{eventLog}</output>
            <Dialog.Root disabled>
              <Dialog.Trigger asChild><Button>Unavailable dialog</Button></Dialog.Trigger>
              <Dialog.Portal><Dialog.Overlay /><Dialog.Content aria-label="Unavailable content">Unavailable content</Dialog.Content></Dialog.Portal>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild><Button variant="outline">Open overlay-disabled dialog</Button></Dialog.Trigger>
              <Dialog.Portal><Dialog.Overlay disabled /><Dialog.Content><Dialog.Header><Dialog.Title>Overlay dismissal disabled</Dialog.Title><Dialog.Description>The scrim cannot dismiss this dialog.</Dialog.Description></Dialog.Header><Dialog.Body>Use the explicit close control to leave.</Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button>Close persistent dialog</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal>
            </Dialog.Root>
          </div>
        </Scenario>

        <Scenario description="A nested modal takes top-layer focus and dismissal ownership, then returns to its parent." title="Nested dialog">
          <div className="dialog-stage" data-testid="dialog-nested">
            <Dialog.Root>
              <Dialog.Trigger asChild><Button variant="outline">Open parent dialog</Button></Dialog.Trigger>
              <Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Header><Dialog.Title>Parent settings</Dialog.Title><Dialog.Description>The child dialog is a separate modal layer.</Dialog.Description></Dialog.Header><Dialog.Body><Dialog.Root><Dialog.Trigger asChild><Button>Open nested dialog</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content size="sm"><Dialog.Header><Dialog.Title>Nested confirmation</Dialog.Title><Dialog.Description>Escape closes this layer first.</Dialog.Description></Dialog.Header><Dialog.Body>Parent focus remains owned but inactive.</Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button>Done</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root></Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button tone="neutral" variant="outline">Close parent</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal>
            </Dialog.Root>
          </div>
        </Scenario>

        <Scenario description="Inline Portal preserves a scoped appearance; custom containers use the same inheritance rule." title="Appearance and scope">
          <div className="dialog-scope-grid" data-testid="dialog-appearance">
            <div data-brick-appearance="light"><Dialog.Root><Dialog.Trigger asChild><Button>Light scoped dialog</Button></Dialog.Trigger><Dialog.Portal disabled><Dialog.Overlay /><Dialog.Content size="sm"><Dialog.Header><Dialog.Title>Light scope</Dialog.Title></Dialog.Header><Dialog.Body>Inline portal inherits this scope.</Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button>Close</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root></div>
            <div data-brick-appearance="dark"><Dialog.Root><Dialog.Trigger asChild><Button>Dark scoped dialog</Button></Dialog.Trigger><Dialog.Portal disabled><Dialog.Overlay /><Dialog.Content size="sm"><Dialog.Header><Dialog.Title>Dark scope</Dialog.Title></Dialog.Header><Dialog.Body>Inline portal inherits this scope.</Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button>Close</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root></div>
          </div>
        </Scenario>

        <Scenario description="Public component tokens, classes, styles, and slots customize one surface without changing behavior." title="Customization">
          <div className="dialog-stage">
            <Dialog.Root><Dialog.Trigger asChild><Button variant="outline">Open customized dialog</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content className="dialog-customized" data-slot="account-dialog" style={{ "--brick-dialog-radius": "0.35rem", "--brick-dialog-space": "2rem" } as CSSProperties}><Dialog.Header data-slot="account-dialog-header"><Dialog.Title>Customized surface</Dialog.Title><Dialog.Description>Public hooks remain local and inspectable.</Dialog.Description></Dialog.Header><Dialog.Body>Behavior still comes directly from Atom.</Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button>Close</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root>
          </div>
        </Scenario>

        <Scenario description="Long content scrolls only in Body while the title and critical actions remain reachable." title="Long content and mobile">
          <div className="dialog-stage" data-testid="dialog-long-content">
            <DialogDemo label="Open long mobile dialog" body={<div className="dialog-long-copy">{Array.from({ length: 12 }, (_, index) => <p key={index}>Section {index + 1}: realistic content remains readable, wraps naturally, and stays inside the bounded body region.</p>)}</div>} />
          </div>
        </Scenario>

        <Scenario description="Logical layout tolerates RTL, long translation, unbroken content, zoom, and constrained height." title="Stress and RTL">
          <div className="dialog-stage" dir="rtl" data-testid="dialog-stress">
            <DialogDemo dir="rtl" label="فتح إعدادات مساحة العمل المفصلة" body="مرجع طويل غير منقطع: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
          </div>
        </Scenario>
      </main>
    </div>
  );
}

function AlertDialogDemo({
  body,
  dir,
  label,
  size = "md",
}: {
  body?: ReactNode;
  dir?: "ltr" | "rtl";
  label: string;
  size?: AlertDialogSize;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button tone="danger" variant="outline">{label}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content dir={dir} size={size}>
          <AlertDialog.Header>
            <AlertDialog.Title>{label}</AlertDialog.Title>
            <AlertDialog.Description>
              This permanently removes the selected project and cannot be undone.
            </AlertDialog.Description>
          </AlertDialog.Header>
          {body !== undefined ? <AlertDialog.Body>{body}</AlertDialog.Body> : null}
          <AlertDialog.Footer>
            <AlertDialog.Cancel asChild>
              <Button tone="neutral" variant="outline">Keep project</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button tone="danger">Delete project</Button>
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function AlertDialogPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [decisionLog, setDecisionLog] = useState("No decision yet");

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
          <h1>AlertDialog workbench</h1>
          <p>Urgent decision semantics, safe initial focus, explicit outcomes, responsive containment, and Atom modal ownership.</p>
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

      <main data-testid="alert-dialog-workbench">
        <Scenario description="The shortest destructive decision keeps the alert message and both responses explicit." title="Overview">
          <div className="alert-dialog-stage" data-testid="alert-dialog-overview">
            <AlertDialogDemo label="Delete project?" />
          </div>
        </Scenario>

        <Scenario description="Small and medium remain intentionally narrower than ordinary Dialog." title="Sizes">
          <div className="alert-dialog-launch-grid" data-testid="alert-dialog-sizes">
            {alertDialogSizes.map((size) => (
              <AlertDialogDemo key={size} label={`Open ${size} decision`} size={size} />
            ))}
          </div>
        </Scenario>

        <Scenario description="Header, required Description, optional Body, Footer, Cancel, and Action remain visible public parts." title="Anatomy">
          <div className="alert-dialog-stage" data-testid="alert-dialog-anatomy">
            <AlertDialogDemo
              body={<strong>Project: Mobile checkout refresh</strong>}
              label="Inspect decision anatomy"
            />
          </div>
        </Scenario>

        <Scenario description="Cancel, Action, Escape policy, prevented async closure, and disabled opening remain inspectable." title="Decisions and state">
          <div className="alert-dialog-stage" data-testid="alert-dialog-decisions">
            <AlertDialog.Root onOpenChange={(open, reason) => {
              if (!open) setDecisionLog(`Closed: ${reason ?? "controlled"}`);
            }}>
              <AlertDialog.Trigger asChild><Button tone="danger">Open tracked decision</Button></AlertDialog.Trigger>
              <AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content><AlertDialog.Header><AlertDialog.Title>Remove tracked project?</AlertDialog.Title><AlertDialog.Description>This action records the exact decision reason.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Cancel tracked decision</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button tone="danger">Confirm tracked decision</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal>
            </AlertDialog.Root>
            <AlertDialog.Root closeOnEscape={false}>
              <AlertDialog.Trigger asChild><Button variant="outline">Open Escape-disabled decision</Button></AlertDialog.Trigger>
              <AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content><AlertDialog.Header><AlertDialog.Title>Explicit response required</AlertDialog.Title><AlertDialog.Description>Escape and the scrim cannot close this decision.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Close explicit decision</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button>Continue explicitly</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal>
            </AlertDialog.Root>
            <AlertDialog.Root disabled>
              <AlertDialog.Trigger asChild><Button>Unavailable decision</Button></AlertDialog.Trigger>
            </AlertDialog.Root>
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild><Button variant="outline">Open pending decision</Button></AlertDialog.Trigger>
              <AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content><AlertDialog.Header><AlertDialog.Title>Start asynchronous removal?</AlertDialog.Title><AlertDialog.Description>The Action prevents automatic closure while application work is pending.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Cancel pending decision</Button></AlertDialog.Cancel><AlertDialog.Action className="brick-button" data-shape="rounded" data-size="md" data-tone="danger" data-variant="solid" onClick={(event) => { event.preventDefault(); setDecisionLog("Pending action kept open"); }}>Start pending action</AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal>
            </AlertDialog.Root>
            <output aria-live="polite" className="dialog-event-log">{decisionLog}</output>
          </div>
        </Scenario>

        <Scenario description="A child confirmation becomes the only active modal, then returns focus and control to its parent Dialog." title="Nested workflow">
          <div className="alert-dialog-stage" data-testid="alert-dialog-nested">
            <Dialog.Root>
              <Dialog.Trigger asChild><Button variant="outline">Edit draft project</Button></Dialog.Trigger>
              <Dialog.Portal><Dialog.Overlay /><Dialog.Content><Dialog.Header><Dialog.Title>Edit draft project</Dialog.Title><Dialog.Description>Closing with unsaved work requires a separate decision.</Dialog.Description></Dialog.Header><Dialog.Body><AlertDialog.Root><AlertDialog.Trigger asChild><Button tone="danger" variant="outline">Discard draft</Button></AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content size="sm"><AlertDialog.Header><AlertDialog.Title>Discard draft?</AlertDialog.Title><AlertDialog.Description>Unsaved project changes will be lost.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Keep editing draft</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button tone="danger">Discard draft changes</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root></Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button>Finish editing</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal>
            </Dialog.Root>
          </div>
        </Scenario>

        <Scenario description="Inline portals inherit scoped appearance while preserving the same alert semantics." title="Appearance and scope">
          <div className="alert-dialog-scope-grid" data-testid="alert-dialog-appearance">
            <div data-brick-appearance="light"><AlertDialog.Root><AlertDialog.Trigger asChild><Button tone="danger" variant="outline">Light decision</Button></AlertDialog.Trigger><AlertDialog.Portal disabled><AlertDialog.Overlay /><AlertDialog.Content size="sm"><AlertDialog.Header><AlertDialog.Title>Light scoped decision</AlertDialog.Title><AlertDialog.Description>The inline surface inherits light tokens.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Cancel light decision</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button tone="danger">Confirm light decision</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root></div>
            <div data-brick-appearance="dark"><AlertDialog.Root><AlertDialog.Trigger asChild><Button tone="danger" variant="outline">Dark decision</Button></AlertDialog.Trigger><AlertDialog.Portal disabled><AlertDialog.Overlay /><AlertDialog.Content size="sm"><AlertDialog.Header><AlertDialog.Title>Dark scoped decision</AlertDialog.Title><AlertDialog.Description>The inline surface inherits dark tokens.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Cancel dark decision</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button tone="danger">Confirm dark decision</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root></div>
          </div>
        </Scenario>

        <Scenario description="Public tokens, classes, style, slots, and explicit Button tone customize presentation without changing behavior." title="Customization">
          <div className="alert-dialog-stage">
            <AlertDialog.Root><AlertDialog.Trigger asChild><Button variant="outline">Open customized decision</Button></AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content className="alert-dialog-customized" data-slot="account-removal-alert" style={{ "--brick-alert-dialog-radius": "0.35rem", "--brick-alert-dialog-space": "2rem" } as CSSProperties}><AlertDialog.Header data-slot="account-removal-header"><AlertDialog.Title>Customized decision</AlertDialog.Title><AlertDialog.Description>Public visual hooks remain local and inspectable.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Keep account</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button tone="danger">Remove account</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root>
          </div>
        </Scenario>

        <Scenario description="A bounded Body scrolls while the required message and critical actions remain reachable." title="Responsive and long detail">
          <div className="alert-dialog-stage" data-testid="alert-dialog-long-content">
            <AlertDialogDemo label="Open long decision" body={<div className="dialog-long-copy">{Array.from({ length: 12 }, (_, index) => <p key={index}>Consequence {index + 1}: supplemental detail remains readable and contained without replacing the concise alert message.</p>)}</div>} />
          </div>
        </Scenario>

        <Scenario description="Long localization, RTL, unbroken names, zoom, and constrained height preserve logical order and containment." title="Stress and RTL">
          <div className="alert-dialog-stage" dir="rtl" data-testid="alert-dialog-stress">
            <AlertDialogDemo dir="rtl" label="حذف مشروع مساحة العمل بالتأكيد؟" body="مرجع غير منقطع: ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
          </div>
        </Scenario>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.location.pathname.startsWith("/alert-dialog") ? (
      <AlertDialogPlayground />
    ) : window.location.pathname.startsWith("/dialog") ? (
      <DialogPlayground />
    ) : window.location.pathname.startsWith("/card") ? (
      <CardPlayground />
    ) : (
      <ButtonPlayground />
    )}
  </StrictMode>,
);
