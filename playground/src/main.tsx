import { StrictMode, useState, type CSSProperties, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  Button,
  Badge,
  Avatar,
  Card,
  Dialog,
  Drawer,
  AlertDialog,
  NotificationBadge,
  IconButton,
  AppBar,
  Toggle,
  ToggleGroup,
  type AlertDialogSize,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
  type BadgeShape,
  type BadgeSize,
  type BadgeTone,
  type BadgeVariant,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
  type CardSize,
  type CardVariant,
  type DialogSize,
  type DrawerPlacement,
  type DrawerSize,
  type NotificationBadgePlacement,
  type IconButtonShape,
  type IconButtonSize,
  type IconButtonTone,
  type IconButtonVariant,
  type AppBarVariant,
  type ToggleShape,
  type ToggleSize,
  type ToggleVariant,
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
const drawerPlacements: DrawerPlacement[] = ["start", "end", "top", "bottom"];
const drawerSizes: DrawerSize[] = ["sm", "md", "lg", "full"];
const badgeVariants: BadgeVariant[] = ["soft", "solid", "outline"];
const badgeTones: BadgeTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const badgeSizes: BadgeSize[] = ["sm", "md", "lg"];
const badgeShapes: BadgeShape[] = ["rounded", "pill"];
const notificationPlacements: NotificationBadgePlacement[] = ["top-start", "top-end", "bottom-start", "bottom-end"];
const avatarSizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const avatarShapes: AvatarShape[] = ["circle", "rounded"];
const avatarStatuses: AvatarStatus[] = ["online", "away", "busy", "offline"];
const toggleVariants: ToggleVariant[] = ["soft", "outline", "ghost"];
const toggleSizes: ToggleSize[] = ["sm", "md", "lg"];
const toggleShapes: ToggleShape[] = ["rounded", "pill"];
const iconButtonVariants: IconButtonVariant[] = ["solid", "soft", "outline", "ghost"];
const iconButtonTones: IconButtonTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const iconButtonSizes: IconButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const iconButtonShapes: IconButtonShape[] = ["rounded", "circle"];
const appBarVariants: AppBarVariant[] = ["solid", "surface", "transparent"];
const avatarStatusLabels: Record<AvatarStatus, string> = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
};
const avatarImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cdefs%3E%3ClinearGradient id='g' x2='1' y2='1'%3E%3Cstop stop-color='%236d5ce7'/%3E%3Cstop offset='1' stop-color='%23e58a5f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='96' height='96' fill='url(%23g)'/%3E%3Ccircle cx='48' cy='36' r='17' fill='%23fff' fill-opacity='.88'/%3E%3Cpath d='M17 91c3-23 15-35 31-35s28 12 31 35' fill='%23fff' fill-opacity='.88'/%3E%3C/svg%3E";

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

function MenuIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 20 20"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" /></svg>;
}

function SearchIcon() {
  return <svg aria-hidden="true" fill="none" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.75" /><path d="m12.25 12.25 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" /></svg>;
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

function DrawerDemo({
  body = "Application-owned controls remain explicit while Atom owns the modal layer.",
  dir,
  label,
  placement = "end",
  size = "md",
}: {
  body?: ReactNode;
  dir?: "ltr" | "rtl";
  label: string;
  placement?: DrawerPlacement;
  size?: DrawerSize;
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline">{label}</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content dir={dir} placement={placement} size={size}>
          <Drawer.Header>
            <Drawer.Title>{label}</Drawer.Title>
            <Drawer.Description>
              Edge-attached presentation composed directly on Atom modal behavior.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>{body}</Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button tone="neutral" variant="outline">Cancel</Button>
            </Drawer.Close>
            <Drawer.Close asChild>
              <Button>Apply changes</Button>
            </Drawer.Close>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function DrawerPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [eventLog, setEventLog] = useState("No drawer event yet");

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
          <h1>Drawer workbench</h1>
          <p>Logical edge placement, distinct mobile sizes, bounded scrolling, modal cleanup, and public composition.</p>
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

      <main data-testid="drawer-workbench">
        <Scenario description="The shortest finished Drawer uses the logical end edge and medium size." title="Overview">
          <div className="drawer-stage" data-testid="drawer-overview">
            <DrawerDemo label="Filter projects" />
          </div>
        </Scenario>

        <Scenario description="Start and end mirror through document direction; top and bottom remain block edges." title="Placements">
          <div className="drawer-launch-grid" data-testid="drawer-placements">
            {drawerPlacements.map((placement) => (
              <DrawerDemo key={placement} label={`Open ${placement} drawer`} placement={placement} size="sm" />
            ))}
          </div>
        </Scenario>

        <Scenario description="Every size stays available and visibly distinct on mobile; only full occupies the viewport." title="Sizes">
          <div className="drawer-launch-grid" data-testid="drawer-sizes">
            {drawerSizes.map((size) => (
              <DrawerDemo key={size} label={`Open ${size} drawer`} size={size} />
            ))}
          </div>
        </Scenario>

        <Scenario description="Header, independently scrollable Body, Footer, and visible Close paths are public regions." title="Anatomy">
          <div className="drawer-stage" data-testid="drawer-anatomy">
            <DrawerDemo
              body={<form className="drawer-filter-form"><label><input defaultChecked type="checkbox" /> Active projects</label><label><input type="checkbox" /> Archived projects</label><label>Owner<select defaultValue="any"><option value="any">Any owner</option><option>Ada</option></select></label></form>}
              label="Inspect drawer anatomy"
              size="lg"
            />
          </div>
        </Scenario>

        <Scenario description="Escape, exact-overlay clicks, disabled dismissal, and disabled opening preserve Atom policy." title="States and dismissal">
          <div className="drawer-stage" data-testid="drawer-states">
            <Drawer.Root onOpenChange={(open, reason) => setEventLog(open ? "Opened" : `Closed: ${reason ?? "controlled"}`)}>
              <Drawer.Trigger asChild><Button>Open event drawer</Button></Drawer.Trigger>
              <Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Header><Drawer.Title>Dismissal evidence</Drawer.Title><Drawer.Description>Try Escape, the scrim, or Close.</Drawer.Description></Drawer.Header><Drawer.Body>Only the active top layer responds.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Close event drawer</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal>
            </Drawer.Root>
            <output aria-live="polite" className="dialog-event-log">{eventLog}</output>
            <Drawer.Root disabled><Drawer.Trigger asChild><Button>Unavailable drawer</Button></Drawer.Trigger></Drawer.Root>
            <Drawer.Root closeOnBackdropClick={false} closeOnEscape={false}>
              <Drawer.Trigger asChild><Button variant="outline">Open dismissal-disabled drawer</Button></Drawer.Trigger>
              <Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Header><Drawer.Title>Explicit close required</Drawer.Title><Drawer.Description>Escape and the scrim are disabled.</Drawer.Description></Drawer.Header><Drawer.Body>Use the visible close control.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Close persistent drawer</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal>
            </Drawer.Root>
          </div>
        </Scenario>

        <Scenario description="A child Dialog takes top-layer ownership and closing both layers restores the application." title="Nested modal">
          <div className="drawer-stage" data-testid="drawer-nested">
            <Drawer.Root>
              <Drawer.Trigger asChild><Button variant="outline">Open parent drawer</Button></Drawer.Trigger>
              <Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Header><Drawer.Title>Parent filters</Drawer.Title><Drawer.Description>A Dialog may open above this Drawer.</Drawer.Description></Drawer.Header><Drawer.Body><Dialog.Root><Dialog.Trigger asChild><Button>Open nested dialog from drawer</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content size="sm"><Dialog.Header><Dialog.Title>Save filter preset?</Dialog.Title><Dialog.Description>The Drawer remains beneath this layer.</Dialog.Description></Dialog.Header><Dialog.Footer><Dialog.Close asChild><Button>Done with nested dialog</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root></Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button tone="neutral" variant="outline">Close parent drawer</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal>
            </Drawer.Root>
          </div>
        </Scenario>

        <Scenario description="Branch registers a portalled composite surface as part of the active Drawer layer." title="Portals and Branch">
          <div className="drawer-stage" data-testid="drawer-branch">
            <Drawer.Root>
              <Drawer.Trigger asChild><Button variant="outline">Open branch drawer</Button></Drawer.Trigger>
              <Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Header><Drawer.Title>Branch composition</Drawer.Title><Drawer.Description>Portalled composite content remains owned by this modal.</Drawer.Description></Drawer.Header><Drawer.Body>The action below is rendered through a separate document-body portal.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Close branch drawer</Button></Drawer.Close></Drawer.Footer>{createPortal(<Drawer.Branch className="drawer-branch-demo" render={<aside aria-label="Owned branch surface" />}><Button variant="soft">Branch action</Button></Drawer.Branch>, document.body)}</Drawer.Content></Drawer.Portal>
            </Drawer.Root>
          </div>
        </Scenario>

        <Scenario description="Public tokens, class, style, slot, and inline Portal scope customize presentation without behavior." title="Appearance and customization">
          <div className="drawer-scope-grid" data-testid="drawer-appearance">
            <div data-brick-appearance="light"><Drawer.Root><Drawer.Trigger asChild><Button>Light scoped Drawer</Button></Drawer.Trigger><Drawer.Portal disabled><Drawer.Overlay /><Drawer.Content size="sm"><Drawer.Header><Drawer.Title>Light scope</Drawer.Title></Drawer.Header><Drawer.Body>Inline Portal inherits this scope.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Close</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal></Drawer.Root></div>
            <div data-brick-appearance="dark"><Drawer.Root><Drawer.Trigger asChild><Button>Dark scoped Drawer</Button></Drawer.Trigger><Drawer.Portal disabled><Drawer.Overlay /><Drawer.Content size="sm"><Drawer.Header><Drawer.Title>Dark scope</Drawer.Title></Drawer.Header><Drawer.Body>Inline Portal inherits this scope.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Close</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal></Drawer.Root></div>
          </div>
          <Drawer.Root><Drawer.Trigger asChild><Button variant="outline">Open customized drawer</Button></Drawer.Trigger><Drawer.Portal><Drawer.Overlay /><Drawer.Content className="drawer-customized" data-slot="account-drawer" style={{ "--brick-drawer-radius": "0.35rem", "--brick-drawer-space": "2rem" } as CSSProperties}><Drawer.Header data-slot="account-drawer-header"><Drawer.Title>Customized Drawer</Drawer.Title><Drawer.Description>Public hooks remain local and inspectable.</Drawer.Description></Drawer.Header><Drawer.Body>Behavior still comes from Atom.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Close</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal></Drawer.Root>
        </Scenario>

        <Scenario description="Long content scrolls inside Body while mobile geometry, RTL direction, and visible actions remain reachable." title="Mobile, stress, and RTL">
          <div className="drawer-stage" dir="rtl" data-testid="drawer-stress">
            <DrawerDemo dir="rtl" label="فتح مرشحات مساحة العمل المفصلة" placement="start" size="lg" body={<div className="dialog-long-copy">{Array.from({ length: 14 }, (_, index) => <p key={index}>القسم {index + 1}: يبقى المحتوى الطويل داخل منطقة قابلة للتمرير مع مرجع ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.</p>)}</div>} />
          </div>
        </Scenario>
      </main>
    </div>
  );
}

function BadgePlayground() {
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
          <h1>Badge family workbench</h1>
          <p>Passive inline labels and visual notification counts with explicit accessible context.</p>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>
              {value}
            </Button>
          ))}
        </fieldset>
      </header>

      <main data-testid="badge-workbench">
        <Scenario description="Badge is ordinary inline content; visible words carry the meaning and tone reinforces it." title="Overview">
          <div className="badge-hero" data-testid="badge-overview">
            <div><span>Release status</span><Badge tone="success">Published</Badge></div>
            <p>Open issues <Badge>12</Badge></p>
            <p>Category <Badge shape="pill" tone="accent">Design system</Badge></p>
          </div>
        </Scenario>

        <Scenario description="Three paint recipes share six semantic tones without changing content semantics." title="Variants and tones">
          <div className="badge-matrix" data-testid="badge-recipes">
            {badgeVariants.flatMap((variant) => badgeTones.map((tone) => (
              <div className="badge-cell" key={`${variant}-${tone}`}><code>{variant} · {tone}</code><Badge tone={tone} variant={variant}>{tone}</Badge></div>
            )))}
          </div>
        </Scenario>

        <Scenario description="All sizes remain readable. Rounded is the default; pill is intentional for passive tags." title="Sizes, shapes, and tags">
          <div className="badge-section-stack" data-testid="badge-sizes-shapes">
            <div className="badge-inline-row">{badgeSizes.map((size) => <Badge key={size} size={size}>{size} status</Badge>)}</div>
            <div className="badge-inline-row">
              {badgeShapes.map((shape) => <Badge key={shape} shape={shape} tone="info">{shape}</Badge>)}
              <Badge shape="pill">TypeScript</Badge>
              <Button shape="pill" size="sm" tone="neutral" variant="outline">Clear filters</Button>
            </div>
          </div>
        </Scenario>

        <Scenario description="Counts stay in normal reading order and need enough nearby context; Badge adds no role or live region." title="Semantic contexts">
          <div className="badge-context-grid" data-testid="badge-contexts">
            <h3>Deployments <Badge tone="success">Healthy</Badge></h3>
            <p>Pending reviews <Badge tone="warning">4</Badge></p>
            <p>Environment <Badge shape="pill">Staging</Badge></p>
          </div>
        </Scenario>

        <Scenario description="NotificationBadge attaches a visual-only count or dot while the owning control supplies the complete accessible name." title="Notification counts and dots">
          <div className="notification-grid" data-testid="notification-counts">
            {[1, 9, 12, 125].map((count) => <NotificationBadge count={count} key={count}><button aria-label={`Inbox, ${count} unread messages`} className="badge-icon-button" type="button">✉</button></NotificationBadge>)}
            <NotificationBadge count={0} showZero><button aria-label="Tasks, no tasks ready" className="badge-icon-button" type="button">✓</button></NotificationBadge>
            <NotificationBadge dot tone="success"><span aria-label="Ada Lovelace, online" className="badge-avatar" role="img">AL</span></NotificationBadge>
          </div>
        </Scenario>

        <Scenario description="Logical start/end placement mirrors in RTL; circular overlap follows Avatar geometry." title="Placement and overlap">
          <div className="notification-placement-grid" data-testid="notification-placements">
            {notificationPlacements.map((placement) => <div key={placement}><code>{placement}</code><NotificationBadge count={4} placement={placement}><button aria-label={`${placement}, 4 notifications`} className="badge-icon-button" type="button">◆</button></NotificationBadge></div>)}
            <div><code>circular</code><NotificationBadge count={8} overlap="circular"><span aria-label="Grace Hopper, 8 updates" className="badge-avatar" role="img">GH</span></NotificationBadge></div>
            <div dir="rtl"><code>RTL top-start</code><NotificationBadge count={3} placement="top-start"><button aria-label="صندوق الوارد، 3 رسائل" className="badge-icon-button" type="button">✉</button></NotificationBadge></div>
          </div>
        </Scenario>

        <Scenario description="Light and dark scopes plus public tokens, class, style, and slot hooks remain local and inspectable." title="Appearance and customization">
          <div className="badge-appearance-grid" data-testid="badge-appearance">
            <div data-brick-appearance="light"><Badge tone="danger">Light error</Badge><NotificationBadge count={7}><button aria-label="Light inbox, 7 unread" className="badge-icon-button" type="button">✉</button></NotificationBadge></div>
            <div data-brick-appearance="dark"><Badge tone="danger">Dark error</Badge><NotificationBadge count={7}><button aria-label="Dark inbox, 7 unread" className="badge-icon-button" type="button">✉</button></NotificationBadge></div>
          </div>
          <div className="badge-inline-row"><Badge className="badge-customized" data-slot="custom-status" style={{ "--brick-badge-radius": "0.2rem" } as CSSProperties} tone="accent">Custom hooks</Badge></div>
        </Scenario>

        <Scenario description="Long localization, mixed direction, constrained width, and unbroken content wrap without clipping." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="badge-stress">
            <div className="phone-frame"><p>Localized status</p><Badge size="lg" tone="warning">Awaiting detailed workspace verification</Badge><Badge>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ</Badge></div>
            <div className="phone-frame" dir="rtl"><p>محتوى من اليمين إلى اليسار</p><Badge shape="pill" tone="info">قيد مراجعة إعداد مساحة العمل</Badge><p>Open issues <Badge>12</Badge></p></div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

function AvatarPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [sourceMode, setSourceMode] = useState<"loaded" | "broken" | "missing">("loaded");

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  const interactiveSource = sourceMode === "loaded" ? avatarImage : sourceMode === "broken" ? "/__broken-avatar-image__.png" : undefined;

  return (
    <div className="playground-shell">
      <header className="playground-header">
        <div>
          <p className="playground-kicker">@flowstack-ui/brick</p>
          <h1>Avatar workbench</h1>
          <p>Explicit identity fallback, Atom-owned image loading, shape-following status rings, and external notification composition.</p>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>
              {value}
            </Button>
          ))}
        </fieldset>
      </header>

      <main data-testid="avatar-workbench">
        <Scenario description="The direct API keeps identity text visible while one source drives Atom Image and Fallback." title="Overview">
          <div className="avatar-hero" data-testid="avatar-overview">
            <Avatar alt="" fallback="AL" size="xl" src={avatarImage} status="online" />
            <div><h2>Ada Lovelace</h2><p>Online · Design systems</p></div>
          </div>
        </Scenario>

        <Scenario description="Five fixed frames remain square; fallback typography scales without becoming interactive." title="Sizes">
          <div className="avatar-row" data-testid="avatar-sizes">
            {avatarSizes.map((size) => <div key={size}><Avatar alt={`${size} Ada avatar`} fallback="AL" size={size} /><code>{size}</code></div>)}
          </div>
        </Scenario>

        <Scenario description="Circle and rounded share one frame contract for loaded images and explicit fallbacks." title="Shapes">
          <div className="avatar-row" data-testid="avatar-shapes">
            {avatarShapes.flatMap((shape) => [
              <div key={`${shape}-image`}><Avatar alt={`${shape} loaded avatar`} fallback="AL" shape={shape} src={avatarImage} size="lg" /><code>{shape} image</code></div>,
              <div key={`${shape}-fallback`}><Avatar alt={`${shape} fallback avatar`} fallback="FS" shape={shape} size="lg" /><code>{shape} fallback</code></div>,
            ])}
          </div>
        </Scenario>

        <Scenario description="Online, away, busy, and offline rings inherit both geometries; visible text preserves meaning beyond color." title="Status rings">
          <div className="avatar-status-grid" data-testid="avatar-statuses">
            {avatarStatuses.flatMap((status) => avatarShapes.map((shape) => (
              <div key={`${status}-${shape}`}>
                <Avatar alt="" fallback={avatarStatusLabels[status].slice(0, 1)} shape={shape} size="lg" status={status} />
                <span>{avatarStatusLabels[status]}</span>
                <code>{shape}</code>
              </div>
            )))}
            <div><Avatar alt="" fallback="N" size="lg" /><span>No status</span><code>circle</code></div>
          </div>
        </Scenario>

        <Scenario description="Missing, loaded, and failed sources preserve one frame and the same informative fallback name." title="Image and fallback states">
          <div className="avatar-state-panel" data-testid="avatar-states">
            <div className="avatar-state-controls" role="group" aria-label="Avatar source state">
              {(["loaded", "broken", "missing"] as const).map((mode) => <Button aria-pressed={sourceMode === mode} key={mode} onPress={() => setSourceMode(mode)} size="sm" variant={sourceMode === mode ? "soft" : "outline"}>{mode}</Button>)}
            </div>
            <div className="avatar-person-row">
              <Avatar alt="Ada Lovelace" fallback="AL" fallbackDelayMs={150} size="xl" src={interactiveSource} />
              <div><strong>Ada Lovelace</strong><span>Current source: {sourceMode}</span></div>
            </div>
          </div>
        </Scenario>

        <Scenario description="Informative fallback keeps a full name; decorative image/fallback stays silent beside one visible name." title="Accessibility contexts">
          <div className="avatar-context-grid" data-testid="avatar-contexts">
            <div><Avatar alt="Grace Hopper" fallback="GH" /><span>No repeated visible name</span></div>
            <div><Avatar alt="" fallback="AL" /><span>Ada Lovelace</span></div>
            <Button aria-label="Open Katherine Johnson profile" startIcon={<Avatar alt="" fallback="KJ" size="sm" />}>Profile</Button>
          </div>
        </Scenario>

        <Scenario description="NotificationBadge positions count/dot indicators around Avatar or another single element; a distinct status ring may coexist." title="Notification composition">
          <div className="avatar-notification-grid" data-testid="avatar-notifications">
            <div><NotificationBadge count={3} overlap="circular"><Avatar alt="" fallback="AL" size="lg" status="online" /></NotificationBadge><span>Online · 3 updates</span></div>
            <div><NotificationBadge dot overlap="rectangular" tone="warning"><img alt="Flowstack workspace" className="avatar-native-image" src={avatarImage} /></NotificationBadge><span>Workspace attention</span></div>
          </div>
        </Scenario>

        <Scenario description="Light/dark scopes and public root/token hooks customize presentation without changing Atom behavior." title="Appearance and customization">
          <div className="avatar-appearance-grid" data-testid="avatar-appearance">
            <div data-brick-appearance="light"><Avatar alt="Light identity" fallback="LI" size="lg" status="away" /><span>Light · Away</span></div>
            <div data-brick-appearance="dark"><Avatar alt="Dark identity" fallback="DI" size="lg" status="busy" /><span>Dark · Busy</span></div>
          </div>
          <div className="avatar-row"><Avatar alt="Customized identity" className="avatar-customized" data-slot="workspace-avatar" fallback="CX" shape="rounded" size="lg" status="online" style={{ "--brick-avatar-radius": "0.25rem", "--brick-avatar-status-ring-width": "0.2rem" } as CSSProperties} /><code>custom hooks</code></div>
        </Scenario>

        <Scenario description="Non-Latin fallback, long stress content, constrained width, and RTL preserve the square frame and adjacent reflow." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="avatar-stress">
            <div className="phone-frame"><div className="avatar-person-row"><Avatar alt="" fallback="李" shape="rounded" size="xl" status="offline" /><div><strong>李小龍</strong><span>Offline · ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</span></div></div></div>
            <div className="phone-frame" dir="rtl"><div className="avatar-person-row"><Avatar alt="" fallback="ن" size="xl" status="away" /><div><strong>نور</strong><span>بعيد · حالة محلية طويلة لمساحة العمل</span></div></div></div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

function IconButtonPlayground() {
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
        <div><p className="playground-kicker">@flowstack-ui/brick</p><h1>IconButton workbench</h1><p>Named compact actions and genuine links using Atom Button behavior.</p></div>
        <fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset>
      </header>
      <main data-testid="icon-button-workbench">
        <Scenario description="The icon is visual while the owning button supplies one concise action name." title="Overview">
          <div className="icon-button-hero" data-testid="icon-button-overview"><IconButton aria-label="Search workspace" onPress={() => setPressCount((count) => count + 1)} shape="circle" size="lg" tone="accent" variant="solid"><SearchIcon /></IconButton><div><h2>Search workspace</h2><p aria-live="polite">Activated {pressCount} times</p></div></div>
        </Scenario>
        <Scenario description="Four visual hierarchies share the same Atom action contract." title="Variants">
          <div className="icon-button-row" data-testid="icon-button-variants">{iconButtonVariants.map((variant) => <div key={variant}><IconButton aria-label={`${variant} menu`} variant={variant}><MenuIcon /></IconButton><code>{variant}</code></div>)}</div>
        </Scenario>
        <Scenario description="Semantic tones are available without generating or interpreting the icon." title="Tones">
          <div className="icon-button-row" data-testid="icon-button-tones">{iconButtonTones.map((tone) => <div key={tone}><IconButton aria-label={`${tone} action`} tone={tone} variant="soft"><SearchIcon /></IconButton><code>{tone}</code></div>)}</div>
        </Scenario>
        <Scenario description="Five square sizes and two intentional geometries align with the Button system." title="Sizes and shapes">
          <div className="icon-button-stack" data-testid="icon-button-sizes"> <div className="icon-button-row">{iconButtonSizes.map((size) => <IconButton aria-label={`${size} action`} key={size} size={size}><MenuIcon /></IconButton>)}</div><div className="icon-button-row">{iconButtonShapes.map((shape) => <IconButton aria-label={`${shape} action`} key={shape} shape={shape} variant="outline"><SearchIcon /></IconButton>)}</div></div>
        </Scenario>
        <Scenario description="Disabled and loading actions remain distinct; href renders a genuine anchor." title="State and link semantics">
          <div className="icon-button-row" data-testid="icon-button-states"><IconButton aria-label="Disabled search" disabled><SearchIcon /></IconButton><IconButton aria-label="Loading search" loading tone="accent" variant="solid"><SearchIcon /></IconButton><IconButton aria-label="Read documentation" href="#icon-button-docs" target="_blank" variant="outline"><ArrowIcon /></IconButton></div>
        </Scenario>
        <Scenario description="Long context, constrained width, RTL, dark appearance, and forced colors remain inspectable." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="icon-button-stress"><div className="phone-frame"><p>Dense application actions</p><div className="icon-button-row"><IconButton aria-label="Open a very detailed workspace navigation menu"><MenuIcon /></IconButton><IconButton aria-label="Search all localized workspace content"><SearchIcon /></IconButton></div></div><div className="phone-frame" dir="rtl"><p>إجراءات مساحة العمل</p><div className="icon-button-row"><IconButton aria-label="فتح القائمة"><MenuIcon /></IconButton><IconButton aria-label="البحث"><SearchIcon /></IconButton></div></div></div>
        </Scenario>
      </main>
    </div>
  );
}

function AppBarExample({ navigationLabel, position = "static", variant = "surface", ...props }: { navigationLabel: string; position?: "static" | "absolute" | "sticky" | "fixed"; variant?: AppBarVariant; bordered?: boolean; elevated?: boolean; blurred?: boolean }) {
  return <AppBar.Root aria-label={`${position} ${variant} example`} position={position} variant={variant} {...props}><AppBar.Toolbar><AppBar.Start><IconButton aria-label="Open menu" size="sm"><MenuIcon /></IconButton><strong>Flowstack</strong></AppBar.Start><AppBar.Center><nav aria-label={navigationLabel}><a href="#overview">Overview</a><a href="#activity">Activity</a></nav></AppBar.Center><AppBar.End><IconButton aria-label="Search" size="sm"><SearchIcon /></IconButton><Avatar alt="" fallback="AL" size="sm" /></AppBar.End></AppBar.Toolbar></AppBar.Root>;
}

function AppBarPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  function selectAppearance(next: Appearance) { setAppearance(next); if (next === "system") document.documentElement.removeAttribute("data-brick-appearance"); else document.documentElement.dataset.brickAppearance = next; }
  return <div className="playground-shell app-bar-playground"><header className="playground-header"><div><p className="playground-kicker">@flowstack-ui/brick</p><h1>AppBar workbench</h1><p>Server-safe top surfaces with application-supplied content and policy.</p></div><fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset></header><main data-testid="app-bar-workbench">
    <Scenario description="Root, Toolbar, Start, Center, and End align real public Brick content without becoming a complete header product." title="Overview"><div className="app-bar-frame" data-testid="app-bar-overview"><AppBarExample navigationLabel="Overview example navigation" /></div></Scenario>
    <Scenario description="Solid, surface, and transparent treatments keep application content unchanged." title="Variants"><div className="app-bar-stack" data-testid="app-bar-variants">{appBarVariants.map((variant) => <div className="app-bar-frame" key={variant}><code>{variant}</code><AppBarExample navigationLabel={`${variant} variant navigation`} variant={variant} /></div>)}</div></Scenario>
    <Scenario description="Comfortable and compact alter only structural density; Toolbar is not an ARIA toolbar." title="Density"><div className="app-bar-stack" data-testid="app-bar-density"><div className="app-bar-frame"><AppBarExample navigationLabel="Comfortable density navigation" /></div><div className="app-bar-frame"><AppBar.Root aria-label="Compact example"><AppBar.Toolbar density="compact"><AppBar.Start>Compact</AppBar.Start><AppBar.End><IconButton aria-label="Search compact bar" size="xs"><SearchIcon /></IconButton></AppBar.End></AppBar.Toolbar></AppBar.Root></div></div></Scenario>
    <Scenario description="Border, static elevation, blur, and transparency are independent visual choices." title="Surface options"><div className="app-bar-stack" data-testid="app-bar-options"><div className="app-bar-frame"><AppBarExample elevated navigationLabel="Elevated option navigation" /></div><div className="app-bar-frame"><AppBarExample blurred navigationLabel="Blurred option navigation" variant="transparent" /></div><div className="app-bar-frame"><AppBarExample bordered={false} navigationLabel="Borderless option navigation" /></div></div></Scenario>
    <Scenario description="Static, absolute, sticky, and fixed are public modes; the application owns fixed/absolute page offsets." title="Positions"><div className="app-bar-position-grid" data-testid="app-bar-positions">{(["static", "absolute", "sticky", "fixed"] as const).map((position) => <div className="position-sample" key={position}><code>{position}</code><AppBar.Root aria-label={`${position} position sample`} position={position}><AppBar.Toolbar density="compact"><AppBar.Start>{position}</AppBar.Start><AppBar.End><IconButton aria-label={`Search ${position} bar`} size="xs"><SearchIcon /></IconButton></AppBar.End></AppBar.Toolbar></AppBar.Root></div>)}</div></Scenario>
    <Scenario description="The application hides optional navigation at narrow widths while AppBar preserves one logical row and RTL alignment." title="Mobile, stress, and RTL"><div className="stress-grid" data-testid="app-bar-stress"><div className="phone-frame"><AppBar.Root aria-label="Mobile bar"><AppBar.Toolbar density="compact"><AppBar.Start><IconButton aria-label="Open mobile menu" size="sm"><MenuIcon /></IconButton><strong>Very long workspace name</strong></AppBar.Start><AppBar.End><Avatar alt="" fallback="FS" size="sm" /></AppBar.End></AppBar.Toolbar></AppBar.Root></div><div className="phone-frame" dir="rtl"><AppBar.Root aria-label="شريط التطبيق"><AppBar.Toolbar density="compact"><AppBar.Start><IconButton aria-label="فتح القائمة" size="sm"><MenuIcon /></IconButton><strong>مساحة العمل</strong></AppBar.Start><AppBar.End><IconButton aria-label="البحث" size="sm"><SearchIcon /></IconButton></AppBar.End></AppBar.Toolbar></AppBar.Root></div></div></Scenario>
  </main></div>;
}

function ToggleFamilyPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [favorite, setFavorite] = useState(false);
  const [view, setView] = useState("cards");
  const [filters, setFilters] = useState<string[]>(["active"]);

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
          <h1>Toggle family workbench</h1>
          <p>Persistent pressed commands and related single- or multiple-selection groups, with Atom owning behavior.</p>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>
          ))}
        </fieldset>
      </header>

      <main data-testid="toggle-workbench">
        <Scenario description="A stable label describes one persistent on/off command while Atom supplies native button and pressed semantics." title="Overview">
          <div className="toggle-hero" data-testid="toggle-overview">
            <div><h2>Keep a project close</h2><p>Favorite remains the same command whether it is on or off.</p></div>
            <Toggle onPressedChange={setFavorite} pressed={favorite}>★ Favorite</Toggle>
            <span aria-live="polite">Favorite is {favorite ? "on" : "off"}</span>
          </div>
        </Scenario>

        <Scenario description="Soft, outline, and ghost share a neutral rest and unmistakable accent selected state." title="Variants and states">
          <div className="toggle-matrix" data-testid="toggle-recipes">
            {toggleVariants.flatMap((variant) => [
              <div className="toggle-cell" key={`${variant}-off`}><code>{variant} · off</code><Toggle variant={variant}>Preview</Toggle></div>,
              <div className="toggle-cell" key={`${variant}-on`}><code>{variant} · on</code><Toggle defaultPressed variant={variant}>Preview</Toggle></div>,
              <div className="toggle-cell" key={`${variant}-disabled`}><code>{variant} · disabled</code><Toggle disabled variant={variant}>Preview</Toggle></div>,
            ])}
          </div>
        </Scenario>

        <Scenario description="All sizes support text and accessible icon-only content; rounded and pill are intentional geometries." title="Sizes, shapes, and icons">
          <div className="toggle-stack" data-testid="toggle-sizes-shapes">
            <div className="toggle-row">{toggleSizes.map((size) => <Toggle key={size} size={size}>{size} toggle</Toggle>)}</div>
            <div className="toggle-row">{toggleShapes.map((shape) => <Toggle defaultPressed key={shape} shape={shape}>{shape}</Toggle>)}<Toggle ariaLabel="Pin project" iconOnly>◆</Toggle></div>
          </div>
        </Scenario>

        <Scenario description="A controlled attached single group behaves like a compact view chooser; the application rejects an empty view." title="Attached single group">
          <div className="toggle-stack" data-testid="toggle-single-group">
            <ToggleGroup.Root ariaLabel="Project view" attached fullWidth onValueChange={(next) => { if (next) setView(next); }} type="single" value={view} variant="outline">
              <ToggleGroup.Item value="cards">Cards</ToggleGroup.Item>
              <ToggleGroup.Item value="list">List</ToggleGroup.Item>
              <ToggleGroup.Item value="timeline">Timeline</ToggleGroup.Item>
            </ToggleGroup.Root>
            <span aria-live="polite">Current view: {view}</span>
          </div>
        </Scenario>

        <Scenario description="Separated pill items wrap naturally and allow several independent filters to remain selected." title="Separated multiple group">
          <div className="toggle-stack" data-testid="toggle-multiple-group">
            <ToggleGroup.Root ariaLabel="Project filters" onValueChange={setFilters} shape="pill" type="multiple" value={filters}>
              <ToggleGroup.Item value="active">Active</ToggleGroup.Item>
              <ToggleGroup.Item value="owned">Owned by me</ToggleGroup.Item>
              <ToggleGroup.Item value="shared">Shared</ToggleGroup.Item>
              <ToggleGroup.Item disabled value="archived">Archived</ToggleGroup.Item>
            </ToggleGroup.Root>
            <span>Selected filters: {filters.length ? filters.join(", ") : "none"}</span>
          </div>
        </Scenario>

        <Scenario description="Vertical orientation, group disabled state, public root hooks, and full-width distribution remain explicit." title="Orientation and customization">
          <div className="toggle-layout-grid" data-testid="toggle-orientation">
            <ToggleGroup.Root ariaLabel="Text alignment" className="toggle-customized" defaultValue="start" orientation="vertical" style={{ "--brick-toggle-group-gap": "0.25rem" } as CSSProperties}>
              <ToggleGroup.Item value="start">Start</ToggleGroup.Item><ToggleGroup.Item value="center">Center</ToggleGroup.Item><ToggleGroup.Item value="end">End</ToggleGroup.Item>
            </ToggleGroup.Root>
            <ToggleGroup.Root ariaLabel="Disabled modes" defaultValue="one" disabled><ToggleGroup.Item value="one">One</ToggleGroup.Item><ToggleGroup.Item value="two">Two</ToggleGroup.Item></ToggleGroup.Root>
          </div>
        </Scenario>

        <Scenario description="Long localization, mixed direction, narrow width, and attached logical corners remain contained." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="toggle-stress">
            <div className="phone-frame"><Toggle shape="pill">Awaiting detailed workspace verification</Toggle><ToggleGroup.Root ariaLabel="Localized filters" defaultValue={["long"]} type="multiple"><ToggleGroup.Item value="long">ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</ToggleGroup.Item><ToggleGroup.Item value="short">Ready</ToggleGroup.Item></ToggleGroup.Root></div>
            <div className="phone-frame" dir="rtl"><Toggle defaultPressed>إظهار المشاريع المكتملة</Toggle><ToggleGroup.Root ariaLabel="طريقة عرض المشروع" attached defaultValue="cards"><ToggleGroup.Item value="cards">بطاقات</ToggleGroup.Item><ToggleGroup.Item value="list">قائمة</ToggleGroup.Item></ToggleGroup.Root></div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.location.pathname.startsWith("/app-bar") ? (
      <AppBarPlayground />
    ) : window.location.pathname.startsWith("/icon-button") ? (
      <IconButtonPlayground />
    ) : window.location.pathname.startsWith("/toggle") ? (
      <ToggleFamilyPlayground />
    ) : window.location.pathname.startsWith("/avatar") ? (
      <AvatarPlayground />
    ) : window.location.pathname.startsWith("/badge") ? (
      <BadgePlayground />
    ) : window.location.pathname.startsWith("/drawer") ? (
      <DrawerPlayground />
    ) : window.location.pathname.startsWith("/alert-dialog") ? (
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
