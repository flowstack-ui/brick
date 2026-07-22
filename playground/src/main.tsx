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
  Tooltip,
  HoverCard,
  Popover,
  Field,
  Fieldset,
  Form,
  Checkbox,
  CheckboxGroup,
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
  type HoverCardSize,
  type PopoverSize,
  type CheckboxSize,
} from "@flowstack-ui/brick";
import { Input } from "@flowstack-ui/atom/input";
import { RadioGroup } from "@flowstack-ui/atom/radio-group";
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
const toggleVariants: ToggleVariant[] = ["solid", "soft", "outline", "ghost"];
const toggleSizes: ToggleSize[] = ["sm", "md", "lg"];
const toggleShapes: ToggleShape[] = ["rounded", "pill"];
const iconButtonVariants: IconButtonVariant[] = ["solid", "soft", "outline", "ghost"];
const iconButtonTones: IconButtonTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const iconButtonSizes: IconButtonSize[] = ["xs", "sm", "md", "lg", "xl"];
const iconButtonShapes: IconButtonShape[] = ["rounded", "circle"];
const appBarVariants: AppBarVariant[] = ["solid", "surface", "transparent"];
const hoverCardSizes: HoverCardSize[] = ["sm", "md", "lg"];
const popoverSizes: PopoverSize[] = ["sm", "md", "lg"];
const checkboxSizes: CheckboxSize[] = ["sm", "md", "lg"];
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
  const [notificationActivation, setNotificationActivation] = useState("None yet");

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
            <fieldset className="badge-example-group">
              <legend>Sizes</legend>
              <p>Compare the three fixed text and padding scales.</p>
              <div className="badge-matrix">
                {badgeSizes.map((size) => (
                  <div className="badge-cell" key={size}>
                    <code>{size}</code>
                    <Badge size={size}>{size} status</Badge>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="badge-example-group">
              <legend>Shapes</legend>
              <p>Compare the moderate default corner with the fully rounded tag shape.</p>
              <div className="badge-matrix">
                {badgeShapes.map((shape) => (
                  <div className="badge-cell" key={shape}>
                    <code>{shape}</code>
                    <Badge shape={shape} tone="info">{shape}</Badge>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset className="badge-example-group">
              <legend>Component routing</legend>
              <p>Use Badge for passive information and Button for a user command.</p>
              <div className="badge-matrix">
                <div className="badge-cell">
                  <code>Badge · passive tag</code>
                  <Badge shape="pill">TypeScript</Badge>
                </div>
                <div className="badge-cell">
                  <code>Button · interactive control</code>
                  <Button shape="pill" size="sm" tone="neutral" variant="outline">Clear filters</Button>
                </div>
              </div>
            </fieldset>
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
            {[1, 9, 12, 125].map((count) => <NotificationBadge count={count} key={count}><button aria-label={`Inbox, ${count} unread messages`} className="badge-icon-button" onClick={() => setNotificationActivation(`Inbox ${count}`)} type="button">✉</button></NotificationBadge>)}
            <NotificationBadge count={0} showZero><button aria-label="Tasks, no tasks ready" className="badge-icon-button" onClick={() => setNotificationActivation("Tasks 0")} type="button">✓</button></NotificationBadge>
            <NotificationBadge dot overlap="circular" tone="success"><span aria-label="Ada Lovelace, online" className="badge-avatar" role="img">AL</span></NotificationBadge>
            <p className="notification-activation">Last activation: <strong>{notificationActivation}</strong></p>
          </div>
        </Scenario>

        <Scenario description="Logical start/end placement mirrors in RTL; circular overlap follows Avatar geometry." title="Placement and overlap">
          <div className="notification-placement-grid" data-testid="notification-placements">
            {notificationPlacements.map((placement) => <div key={`ltr-${placement}`}><code>LTR {placement}</code><NotificationBadge count={4} placement={placement}><button aria-label={`LTR ${placement}, 4 notifications`} className="badge-icon-button" onClick={() => setNotificationActivation(`LTR ${placement}`)} type="button">◆</button></NotificationBadge></div>)}
            {notificationPlacements.map((placement) => <div dir="rtl" key={`rtl-${placement}`}><code>RTL {placement}</code><NotificationBadge count={3} placement={placement}><button aria-label={`RTL ${placement}, 3 notifications`} className="badge-icon-button" onClick={() => setNotificationActivation(`RTL ${placement}`)} type="button">◆</button></NotificationBadge></div>)}
            <div><code>circular</code><NotificationBadge count={8} overlap="circular"><span aria-label="Grace Hopper, 8 updates" className="badge-avatar" role="img">GH</span></NotificationBadge></div>
          </div>
          <p className="notification-activation">Last activation: <strong>{notificationActivation}</strong></p>
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
  const [avatarActivation, setAvatarActivation] = useState("None yet");

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
            <Button aria-label="Open Katherine Johnson profile" onPress={() => setAvatarActivation("Katherine Johnson profile")} startIcon={<Avatar alt="" fallback="KJ" size="sm" />}>Profile</Button>
            <p className="press-status">Last activation: <strong>{avatarActivation}</strong></p>
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

function AppBarExample({ navigationLabel, position = "static", tone = "neutral", variant = "surface", ...props }: { navigationLabel: string; position?: "static" | "absolute" | "sticky" | "fixed"; tone?: "neutral" | "accent"; variant?: AppBarVariant; bordered?: boolean; elevated?: boolean; blurred?: boolean }) {
  return <AppBar.Root aria-label={`${position} ${tone} ${variant} example`} position={position} tone={tone} variant={variant} {...props}><AppBar.Toolbar><AppBar.Start><IconButton aria-label="Open menu" size="sm"><MenuIcon /></IconButton><strong>Flowstack</strong></AppBar.Start><AppBar.Center><nav aria-label={navigationLabel}><a href="#overview">Overview</a><a href="#activity">Activity</a></nav></AppBar.Center><AppBar.End><IconButton aria-label="Search" size="sm"><SearchIcon /></IconButton><Avatar alt="" fallback="AL" size="sm" /></AppBar.End></AppBar.Toolbar></AppBar.Root>;
}

function AppBarPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  function selectAppearance(next: Appearance) { setAppearance(next); if (next === "system") document.documentElement.removeAttribute("data-brick-appearance"); else document.documentElement.dataset.brickAppearance = next; }
  return <div className="playground-shell app-bar-playground"><header className="playground-header"><div><p className="playground-kicker">@flowstack-ui/brick</p><h1>AppBar workbench</h1><p>Server-safe top surfaces with application-supplied content and policy.</p></div><fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset></header><main data-testid="app-bar-workbench">
    <Scenario description="Root, Toolbar, Start, Center, and End align real public Brick content without becoming a complete header product." title="Overview"><div className="app-bar-frame" data-testid="app-bar-overview"><AppBarExample navigationLabel="Overview example navigation" /></div></Scenario>
    <Scenario description="Neutral and accent tones combine with solid, surface, and transparent treatments." title="Tones and variants"><div className="app-bar-stack" data-testid="app-bar-variants">{(["neutral", "accent"] as const).flatMap((tone) => appBarVariants.map((variant) => <div className="app-bar-frame" key={`${tone}-${variant}`}><code>{tone} · {variant}</code><AppBarExample navigationLabel={`${tone} ${variant} navigation`} tone={tone} variant={variant} /></div>))}</div></Scenario>
    <Scenario description="Comfortable and compact alter only structural density; Toolbar is not an ARIA toolbar." title="Density"><div className="app-bar-stack" data-testid="app-bar-density"><div className="app-bar-frame"><AppBarExample navigationLabel="Comfortable density navigation" /></div><div className="app-bar-frame"><AppBar.Root aria-label="Compact example"><AppBar.Toolbar density="compact"><AppBar.Start>Compact</AppBar.Start><AppBar.End><IconButton aria-label="Search compact bar" size="xs"><SearchIcon /></IconButton></AppBar.End></AppBar.Toolbar></AppBar.Root></div></div></Scenario>
    <Scenario description="Border, static elevation, blur, and transparency are independent visual choices." title="Surface options"><div className="app-bar-stack" data-testid="app-bar-options"><div className="app-bar-frame app-bar-option"><code>Elevated surface</code><div className="app-bar-surface-stage app-bar-surface-stage--elevated"><AppBarExample elevated navigationLabel="Elevated option navigation" /></div></div><div className="app-bar-frame app-bar-option"><code>Transparent with backdrop blur</code><div className="app-bar-surface-stage app-bar-surface-stage--blur"><div aria-hidden="true" className="app-bar-blur-backdrop"><span /><span /><span /></div><AppBarExample blurred navigationLabel="Blurred option navigation" position="absolute" variant="transparent" /></div></div><div className="app-bar-frame app-bar-option"><code>Surface without separator</code><div className="app-bar-surface-stage"><AppBarExample bordered={false} navigationLabel="Borderless option navigation" /></div></div></div></Scenario>
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

        <Scenario description="Solid, soft, outline, and ghost share a neutral rest; selected state ranges from accent-solid to quieter accent-soft treatments." title="Variants and states">
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

function HoverCardPreview({
  align = "center",
  arrow = true,
  children,
  disabled = false,
  href,
  label,
  side = "bottom",
  size = "md",
}: {
  align?: "start" | "center" | "end";
  arrow?: boolean;
  children: ReactNode;
  disabled?: boolean;
  href: string;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  size?: HoverCardSize;
}) {
  return (
    <HoverCard.Root closeDelay={100} disabled={disabled} openDelay={0}>
      <HoverCard.Trigger asChild><a href={href}>{label}</a></HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content align={align} side={side} size={size}>
          {children}
          {arrow ? <HoverCard.Arrow /> : null}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

function ProfilePreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="hover-card-profile">
      <Avatar alt="" fallback="AL" size={compact ? "sm" : "md"} status="online" />
      <div><strong>Ada Lovelace</strong><p>Mathematician and early computing author.</p><Badge size="sm" tone="success">Available</Badge></div>
    </div>
  );
}

function HoverCardPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [controlledOpen, setControlledOpen] = useState(false);

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  return (
    <div className="playground-shell">
      <header className="playground-header">
        <div><p className="playground-kicker">@flowstack-ui/brick</p><h1>HoverCard workbench</h1><p>Non-interactive previews for genuine links, with Atom-owned hover, focus, timing, Escape, portal, and collision behavior.</p></div>
        <fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset>
      </header>
      <main data-testid="hover-card-workbench">
        <Scenario description="Focus or hover the named profile link. Activating it still follows the real destination; the preview is duplicate, nonessential information." title="Overview">
          <div className="hover-card-stage" data-testid="hover-card-overview"><HoverCardPreview href="/hover-card/destination?resource=ada-profile" label="Ada Lovelace"><ProfilePreview /></HoverCardPreview><p>Ada's complete profile remains available at the link destination.</p></div>
        </Scenario>

        <Scenario description="Size changes only the preferred maximum width; child typography and components retain their own scales." title="Sizes">
          <div className="hover-card-grid" data-testid="hover-card-sizes">{hoverCardSizes.map((size) => <HoverCardPreview href={`/hover-card/destination?resource=${size}-preview`} key={size} label={`${size} preview`} size={size}><div className="hover-card-document"><Badge size="sm">{size}</Badge><strong>Analytical Engine notes</strong><p>A concise document preview with a stable destination.</p></div></HoverCardPreview>)}</div>
        </Scenario>

        <Scenario description="The explicit shared Arrow follows Atom's collision-resolved side and alignment. The last preview intentionally omits it." title="Placement and Arrow">
          <div className="hover-card-grid" data-testid="hover-card-placement"><HoverCardPreview href="/hover-card/destination?resource=top-placement" label="Top" side="top"><ProfilePreview compact /></HoverCardPreview><HoverCardPreview href="/hover-card/destination?resource=right-placement" label="Right" side="right"><ProfilePreview compact /></HoverCardPreview><HoverCardPreview href="/hover-card/destination?resource=bottom-placement" label="Bottom" side="bottom"><ProfilePreview compact /></HoverCardPreview><HoverCardPreview arrow={false} href="/hover-card/destination?resource=left-placement" label="Left, no arrow" side="left"><ProfilePreview compact /></HoverCardPreview></div>
        </Scenario>

        <Scenario description="Controlled state, disabled blocking, and the released 700/300 millisecond defaults remain Atom behavior." title="State and timing">
          <div className="hover-card-grid" data-testid="hover-card-state"><HoverCard.Root onOpenChange={setControlledOpen} open={controlledOpen} openDelay={0}><HoverCard.Trigger asChild><a href="/hover-card/destination?resource=controlled-preview">Controlled preview</a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content><strong>Controlled resource</strong><p>State is owned by the application.</p><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root><HoverCardPreview disabled href="/hover-card/destination?resource=disabled-preview" label="Disabled preview"><p>This preview must not open.</p></HoverCardPreview><HoverCard.Root><HoverCard.Trigger asChild><a href="/hover-card/destination?resource=default-delay">Default delay preview</a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content><strong>Default timing</strong><p>700 ms open and 300 ms close.</p><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root></div>
        </Scenario>

        <Scenario description="Profile and document previews compose existing Brick primitives and semantic HTML, never controls or required instructions." title="Composition">
          <div className="hover-card-grid" data-testid="hover-card-composition"><HoverCardPreview href="/hover-card/destination?resource=grace-hopper" label="Grace Hopper"><div className="hover-card-profile"><Avatar alt="" fallback="GH" size="md" status="away" /><div><strong>Grace Hopper</strong><p>Computer scientist and compiler pioneer.</p><Badge size="sm" tone="warning">In a meeting</Badge></div></div></HoverCardPreview><HoverCardPreview href="/hover-card/destination?resource=compiler-project-notes" label="Compiler project notes" size="lg"><div className="hover-card-document"><Badge size="sm">Document</Badge><strong>Compiler project notes</strong><p>Updated July 18 · 12 minute read · Engineering workspace.</p></div></HoverCardPreview></div>
        </Scenario>

        <Scenario description="Long localization, 256 px containment, collision edges, and logical RTL layout remain inspectable without horizontal page overflow." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="hover-card-stress"><div className="phone-frame hover-card-edge"><HoverCardPreview align="start" href="/hover-card/destination?resource=localized-document" label="Very long localized document preview" size="lg"><div className="hover-card-document"><strong>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break</strong><p>A deliberately long localized description that wraps and remains within the dynamic viewport.</p></div></HoverCardPreview></div><div className="phone-frame hover-card-edge" dir="rtl"><HoverCardPreview align="end" href="/hover-card/destination?resource=ada-arabic" label="ملف آدا لوفلايس"><div className="hover-card-profile"><Avatar alt="" fallback="آل" size="sm" /><div><strong>آدا لوفلايس</strong><p>عالمة رياضيات وكاتبة في الحوسبة المبكرة.</p></div></div></HoverCardPreview></div></div>
        </Scenario>
      </main>
    </div>
  );
}

function HoverCardDestination() {
  const resource = new URLSearchParams(window.location.search).get("resource") ?? "preview";
  return (
    <main className="playground-shell" data-testid="hover-card-destination">
      <header className="playground-header">
        <div><p className="playground-kicker">HoverCard destination</p><h1>{resource.replace(/-/g, " ")}</h1><p>This route confirms that touch and activation preserve the Trigger link's native navigation.</p></div>
        <a href="/hover-card">Return to HoverCard workbench</a>
      </header>
    </main>
  );
}

function SettingsPopover({
  label,
  modal = false,
  side = "bottom",
  size = "md",
}: {
  label: string;
  modal?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  size?: PopoverSize;
}) {
  return (
    <Popover.Root modal={modal}>
      <Popover.Trigger asChild><Button tone="neutral" variant="outline">{label}</Button></Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side={side} size={size}>
          <Popover.Title>{label}</Popover.Title>
          <Popover.Description>Change compact workspace options without leaving this page.</Popover.Description>
          <Popover.Body>
            <label className="popover-field"><span>Project name</span><input defaultValue="Analytical Engine" /></label>
            <label className="popover-check"><input defaultChecked type="checkbox" /> Share activity updates</label>
          </Popover.Body>
          <Popover.Footer><Button tone="neutral" variant="outline">Reset</Button><Popover.Close asChild><Button>Done</Button></Popover.Close></Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function PopoverPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [controlledOpen, setControlledOpen] = useState(false);

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  return (
    <div className="playground-shell">
      <header className="playground-header">
        <div><p className="playground-kicker">@flowstack-ui/brick</p><h1>Popover workbench</h1><p>Intentionally opened compact interactive panels with Atom-owned semantics, focus, dismissal, nesting, portals, and collision behavior.</p></div>
        <fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset>
      </header>
      <main data-testid="popover-workbench">
        <Scenario description="Click, press, or use Enter/Space. The visible title and description are direct semantic parts so their generated relationships are server-stable." title="Overview">
          <div className="popover-stage" data-testid="popover-overview"><SettingsPopover label="Project settings" /></div>
        </Scenario>

        <Scenario description="Size changes the preferred maximum width; compact controls and action heights remain component-owned." title="Sizes">
          <div className="popover-grid" data-testid="popover-sizes">{popoverSizes.map((size) => <SettingsPopover key={size} label={`Open ${size} settings`} size={size} />)}</div>
        </Scenario>

        <Scenario description="Header is an optional presentational group. When it wraps semantic parts, explicit native relationships keep the server contract deterministic." title="Anatomy and customization">
          <div className="popover-stage" data-testid="popover-anatomy">
            <Popover.Root><Popover.Trigger asChild><Button variant="outline">Inspect anatomy</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-describedby="custom-popover-description" aria-labelledby="custom-popover-title" className="popover-customized" style={{ "--brick-popover-radius": "0.4rem", "--brick-popover-space": "1.25rem" } as CSSProperties}><Popover.Header><h3 data-slot="popover-title" id="custom-popover-title">Custom workspace panel</h3><p data-slot="popover-description" id="custom-popover-description">Explicit native ARIA supports native semantic text inside the visual Header.</p></Popover.Header><Popover.Body>Header, Body, and Footer remain presentational layout parts.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close anatomy</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root>
          </div>
        </Scenario>

        <Scenario description="Controlled and disabled state, modal focus containment, and explicit dismissal policy remain Atom behavior." title="State and policy">
          <div className="popover-grid" data-testid="popover-state">
            <Popover.Root onOpenChange={setControlledOpen} open={controlledOpen}><Popover.Trigger asChild><Button variant="outline">Controlled settings</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Controlled settings"><Popover.Body>Open state belongs to the application.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close controlled</Button></Popover.Close></Popover.Footer></Popover.Content></Popover.Portal></Popover.Root>
            <Popover.Root disabled><Popover.Trigger asChild><Button>Unavailable settings</Button></Popover.Trigger></Popover.Root>
            <SettingsPopover label="Open modal settings" modal />
            <Popover.Root closeOnEscape={false} closeOnInteractOutside={false}><Popover.Trigger asChild><Button variant="outline">Explicit close only</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Explicit close settings"><Popover.Body>Escape and outside interaction are disabled.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close explicitly</Button></Popover.Close></Popover.Footer></Popover.Content></Popover.Portal></Popover.Root>
          </div>
        </Scenario>

        <Scenario description="Anchor may differ from Trigger, all collision-aware sides remain available, and a nested Popover owns the top layer until it closes." title="Placement, Anchor, and nesting">
          <div className="popover-grid" data-testid="popover-placement">
            {(["top", "right", "bottom", "left"] as const).map((side) => <SettingsPopover key={side} label={`Open ${side}`} side={side} size="sm" />)}
            <Popover.Root><Popover.Anchor asChild><span className="popover-anchor-marker">Anchor target</span></Popover.Anchor><Popover.Trigger asChild><Button variant="outline">Open anchored panel</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Anchored panel" align="start"><Popover.Body>Position follows the separate marker.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Done</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root>
            <Popover.Root><Popover.Trigger asChild><Button variant="outline">Open parent panel</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Parent panel"><Popover.Body><Popover.Root><Popover.Trigger asChild><Button>Open nested panel</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Nested panel"><Popover.Body>Nested content is the active top layer.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close nested panel</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></Popover.Body><Popover.Footer><Popover.Close asChild><Button variant="outline">Close parent panel</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root>
          </div>
        </Scenario>

        <Scenario description="Long localization, 256 px containment, scrollable content, wrapping actions, and logical RTL layout remain inspectable." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="popover-stress">
            <div className="phone-frame popover-edge"><Popover.Root><Popover.Trigger asChild><Button variant="outline">Open long settings</Button></Popover.Trigger><Popover.Portal><Popover.Content align="start" size="lg"><Popover.Title>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break</Popover.Title><Popover.Description>A deliberately long localized description remains readable and contained.</Popover.Description><Popover.Body><div className="popover-long-copy">{Array.from({ length: 8 }, (_, index) => <p key={index}>Compact setting {index + 1} remains reachable at high zoom.</p>)}</div></Popover.Body><Popover.Footer><Button variant="outline">Reset all settings</Button><Popover.Close asChild><Button>Save workspace settings</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></div>
            <div className="phone-frame popover-edge" dir="rtl"><Popover.Root><Popover.Trigger asChild><Button variant="outline">فتح إعدادات المشروع</Button></Popover.Trigger><Popover.Portal><Popover.Content align="end"><Popover.Title>إعدادات المشروع</Popover.Title><Popover.Description>غيّر الخيارات المختصرة بدون مغادرة مساحة العمل.</Popover.Description><Popover.Body><label className="popover-check"><input defaultChecked type="checkbox" /> مشاركة تحديثات النشاط</label></Popover.Body><Popover.Footer><Popover.Close asChild><Button tone="neutral" variant="outline">تم</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

function TooltipPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  const hint = (label: string, side: "top" | "right" | "bottom" | "left" = "top", shape: "rounded" | "pill" = "rounded") => (
    <Tooltip.Root>
      <Tooltip.Trigger asChild><IconButton aria-label={label}><SearchIcon /></IconButton></Tooltip.Trigger>
      <Tooltip.Portal><Tooltip.Content shape={shape} side={side}>{label}<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal>
    </Tooltip.Root>
  );

  return (
    <Tooltip.Provider>
      <div className="playground-shell">
        <header className="playground-header">
          <div><p className="playground-kicker">@flowstack-ui/brick</p><h1>Tooltip workbench</h1><p>Brief supplemental descriptions with Atom-owned pointer, focus, touch, timing, and positioning behavior.</p></div>
          <fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset>
        </header>
        <main data-testid="tooltip-workbench">
          <Scenario description="Hover, focus, or use a deliberate touch hold. The trigger retains its complete accessible name." title="Overview"><div className="tooltip-stage" data-testid="tooltip-overview">{hint("Search workspace", "bottom")}<p>Search remains independently named; the Tooltip is supplemental.</p></div></Scenario>
          <Scenario description="The optional shared arrow follows all four collision-aware sides." title="Placement"><div className="tooltip-placement" data-testid="tooltip-placement">{hint("Above", "top")}{hint("To the right", "right")}{hint("Below", "bottom")}{hint("To the left", "left")}</div></Scenario>
          <Scenario description="Rounded is the readable default; pill is available for deliberately compact labels." title="Shapes"><div className="tooltip-placement" data-testid="tooltip-shapes">{hint("Rounded tooltip", "top", "rounded")}{hint("Pill tooltip", "top", "pill")}</div></Scenario>
          <Scenario description="Rich mode adds presentational title and description, while remaining short and non-interactive." title="Rich composition"><div className="tooltip-stage" data-testid="tooltip-rich"><Tooltip.Root variant="rich"><Tooltip.Trigger asChild><Button tone="neutral" variant="outline">Project status</Button></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content side="bottom"><Tooltip.Title>Ready for review</Tooltip.Title><Tooltip.Description>All required checks have passed.</Tooltip.Description><Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root></div></Scenario>
          <Scenario description="Long localized text, a narrow container, RTL, dark appearance, reduced motion, and forced colors remain inspectable." title="Mobile, stress, and RTL"><div className="stress-grid" data-testid="tooltip-stress"><div className="phone-frame">{hint("Search projects, files, and localized workspace commands", "bottom")}</div><div className="phone-frame" dir="rtl">{hint("البحث في المشاريع والملفات", "bottom")}</div></div></Scenario>
        </main>
      </div>
    </Tooltip.Provider>
  );
}

function CheckboxFamilyPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [controlled, setControlled] = useState<false | true | "indeterminate">("indeterminate");
  const [channels, setChannels] = useState(["email"]);
  const [status, setStatus] = useState("No form event yet");

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  return (
    <div className="playground-shell checkbox-workbench">
      <header className="playground-header">
        <div><p className="playground-kicker">@flowstack-ui/brick</p><h1>Checkbox family workbench</h1><p>Complete independent and grouped selection, Parent aggregation, native forms, structured item content, composition, responsive layout, and Atom 0.6.12 behavior.</p></div>
        <fieldset className="playground-appearance"><legend>Appearance</legend>{(["system", "light", "dark"] as const).map((value) => <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>)}</fieldset>
      </header>
      <main data-testid="checkbox-workbench">
        <Scenario description="Independent choices use Checkbox directly; related choices use the complete CheckboxGroup namespace and explicit allValues for Parent." title="Overview">
          <div className="checkbox-stage" data-testid="checkbox-overview">
            <Checkbox defaultChecked name="release-ready" value="yes">Ready to publish</Checkbox>
            <Checkbox checked={controlled} onCheckedChange={setControlled}>Controlled tri-state</Checkbox>
            <output aria-live="polite">Controlled state: {String(controlled)}</output>
            <CheckboxGroup.Root aria-label="Release channels" allValues={["email", "sms", "push"]} name="release-channels" value={channels} onValueChange={setChannels}>
              <CheckboxGroup.Parent>All release channels</CheckboxGroup.Parent>
              <CheckboxGroup.Item value="email"><CheckboxGroup.ItemLabel>Email</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>Delivery and account notices.</CheckboxGroup.ItemDescription></CheckboxGroup.Item>
              <CheckboxGroup.Item value="sms"><CheckboxGroup.ItemLabel>SMS</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>Urgent publishing failures only.</CheckboxGroup.ItemDescription></CheckboxGroup.Item>
              <CheckboxGroup.Item value="push">Push notifications</CheckboxGroup.Item>
            </CheckboxGroup.Root>
            <output aria-live="polite">Selected channels: {channels.join(", ") || "none"}</output>
          </div>
        </Scenario>

        <Scenario description="Small, medium, and large coordinate the full row target, visible control, check/dash artwork, gap, and text." title="Sizes and state">
          <div className="checkbox-matrix" data-testid="checkbox-sizes-states">
            {checkboxSizes.map((size) => <div className="checkbox-matrix-row" key={size}><strong>{size}</strong><Checkbox size={size}>Unchecked</Checkbox><Checkbox defaultChecked size={size}>Checked</Checkbox><Checkbox defaultChecked="indeterminate" size={size}>Mixed</Checkbox></div>)}
            <Checkbox disabled>Disabled</Checkbox><Checkbox disabled defaultChecked>Disabled checked</Checkbox><Checkbox readOnly defaultChecked>Read only</Checkbox><Checkbox invalid>Invalid</Checkbox><Checkbox required>Required</Checkbox>
          </div>
        </Scenario>

        <Scenario description="Field and Fieldset provide visible labels, shared instructions, required/invalid state, and errors without hidden automatic wrappers." title="Form, Fieldset, and native submission">
          <Form aria-label="Publishing preferences" className="checkbox-form" id="checkbox-preferences" onReset={() => setStatus("Preferences reset")} onSubmit={(event) => { const formData = new FormData(event.currentTarget); setStatus(`Submitted: ${formData.get("acknowledgement") ?? "no acknowledgement"}; ${formData.getAll("delivery").join(", ") || "no delivery"}`); }} preventDefaultOnSubmit>
            <Field.Root id="acknowledgement" required><Field.Label>Release acknowledgement</Field.Label><Checkbox name="acknowledgement" required value="accepted">I reviewed the release notes</Checkbox><Field.Description>This selection is submitted as a native checkbox value.</Field.Description><Field.Error>Review is required.</Field.Error></Field.Root>
            <Fieldset.Root id="delivery-methods" required><Fieldset.Legend>Delivery methods</Fieldset.Legend><Fieldset.Description>Choose one or more ways to receive publishing results.</Fieldset.Description><CheckboxGroup.Root allValues={["email", "push"]} name="delivery"><CheckboxGroup.Parent>Select every available method</CheckboxGroup.Parent><CheckboxGroup.Item value="email"><CheckboxGroup.ItemLabel>Email report</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>Includes build and package details.</CheckboxGroup.ItemDescription></CheckboxGroup.Item><CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item><CheckboxGroup.Item disabled value="sms">SMS unavailable</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>Choose at least one delivery method.</Fieldset.Error></Fieldset.Root>
            <div className="form-foundation-actions"><Button type="submit">Save preferences</Button><Button tone="neutral" type="reset" variant="outline">Reset</Button></div><output aria-live="polite" className="form-foundation-status">{status}</output>
          </Form>
          <Checkbox form="checkbox-preferences" name="external-consent" value="yes">Externally owned preference</Checkbox>
        </Scenario>

        <Scenario description="Horizontal groups wrap logically; mapped items, native props, custom classes/tokens, render, and asChild stay available." title="Orientation and composition">
          <div className="checkbox-composition" data-testid="checkbox-composition">
            <CheckboxGroup.Root aria-label="Mapped formats" allValues={["pdf", "csv", "json"]} orientation="horizontal" size="sm">{["pdf", "csv", "json"].map((value) => <CheckboxGroup.Item key={value} value={value}>{value.toUpperCase()}</CheckboxGroup.Item>)}</CheckboxGroup.Root>
            <Checkbox className="checkbox-custom" render={<button data-adapter="rendered-checkbox" />} style={{ "--brick-checkbox-control-checked-background": "#18794e" } as CSSProperties}>Rendered adapter</Checkbox>
            <Checkbox asChild><button data-adapter="composed-checkbox"><strong>Composed adapter</strong></button></Checkbox>
            <CheckboxGroup.Root asChild aria-label="Composed group"><section data-adapter="composed-group"><CheckboxGroup.Item asChild value="one"><button data-adapter="composed-item"><CheckboxGroup.ItemLabel asChild><strong>Composed item</strong></CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription render={<small data-adapter="rendered-description" />}>Description remains related.</CheckboxGroup.ItemDescription></button></CheckboxGroup.Item></section></CheckboxGroup.Root>
          </div>
        </Scenario>

        <Scenario description="Light/dark scopes, long unbroken copy, 256-pixel containment, RTL, zoom, reduced motion, and forced colors remain inspectable." title="Appearance, mobile, stress, and RTL">
          <div className="appearance-grid" data-testid="checkbox-appearance"><div data-brick-appearance="light"><Checkbox defaultChecked>Light checked</Checkbox></div><div data-brick-appearance="dark"><Checkbox defaultChecked="indeterminate">Dark mixed</Checkbox></div></div>
          <div className="stress-grid" data-testid="checkbox-stress"><div className="phone-frame"><CheckboxGroup.Root aria-label="Narrow localized choices" allValues={["long"]}><CheckboxGroup.Parent>Select every translated preference</CheckboxGroup.Parent><CheckboxGroup.Item value="long"><CheckboxGroup.ItemLabel>Extremely detailed localized publishing and emergency-notification preference</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break remains inside the available width.</CheckboxGroup.ItemDescription></CheckboxGroup.Item></CheckboxGroup.Root></div><div className="phone-frame" dir="rtl"><CheckboxGroup.Root aria-label="طرق الإشعار" allValues={["email", "phone"]}><CheckboxGroup.Parent>اختيار جميع طرق الإشعار</CheckboxGroup.Parent><CheckboxGroup.Item value="email"><CheckboxGroup.ItemLabel>البريد الإلكتروني</CheckboxGroup.ItemLabel><CheckboxGroup.ItemDescription>تقارير النشر الأسبوعية وتحديثات الحساب.</CheckboxGroup.ItemDescription></CheckboxGroup.Item><CheckboxGroup.Item value="phone">الهاتف</CheckboxGroup.Item></CheckboxGroup.Root></div></div>
        </Scenario>
      </main>
    </div>
  );
}

function FormFoundationPlayground() {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [status, setStatus] = useState("No form event yet");
  const path = window.location.pathname;
  const focus = path.startsWith("/fieldset")
    ? "Fieldset"
    : path.startsWith("/field")
      ? "Field"
      : path.startsWith("/form-foundation")
        ? "Form Foundation"
        : "Form";

  function selectAppearance(next: Appearance) {
    setAppearance(next);
    if (next === "system") document.documentElement.removeAttribute("data-brick-appearance");
    else document.documentElement.dataset.brickAppearance = next;
  }

  return (
    <div className="playground-shell form-foundation-workbench">
      <header className="playground-header">
        <div>
          <p className="playground-kicker">@flowstack-ui/brick</p>
          <h1>{focus} workbench</h1>
          <p>Complete native submission, one-control Field, related-control Fieldset, server-stable relationships, responsive layout, state, and composition.</p>
        </div>
        <fieldset className="playground-appearance">
          <legend>Appearance</legend>
          {(["system", "light", "dark"] as const).map((value) => (
            <Button aria-pressed={appearance === value} key={value} onPress={() => selectAppearance(value)} size="sm" tone="neutral" variant={appearance === value ? "soft" : "ghost"}>{value}</Button>
          ))}
        </fieldset>
      </header>

      <main data-testid="form-foundation-workbench">
        <section className="form-foundation-component-heading" data-component="integration">
          <p className="playground-kicker">Family integration</p>
          <h2>Form Foundation</h2>
          <p>Form, Field, and Fieldset compose here as one native workflow without losing their individual contracts.</p>
        </section>
        <Scenario description="The shortest finished workflow uses one native Form, one Field per value, one Fieldset per related choice, and explicit actions." title="Integration overview">
          <div className="form-foundation-stage" data-testid="form-foundation-overview">
            <Form
              aria-label="Create account"
              onReset={() => {
                setEmail("");
                setInvalid(false);
                setStatus("Form reset");
              }}
              onSubmit={async () => {
                await new Promise((resolve) => window.setTimeout(resolve, 350));
                setStatus("Account form submitted");
              }}
              preventDefaultOnSubmit
              validateOnSubmit={() => {
                const valid = email.includes("@");
                setInvalid(!valid);
                if (!valid) setStatus("Validation rejected the submission");
                return valid;
              }}
            >
              <Field.Root id="work-email" invalid={invalid} required>
                <Field.Label>Work email</Field.Label>
                <Input.Root className="form-foundation-control" name="email" onValueChange={setEmail} placeholder="name@example.com" value={email} />
                <Field.Description>We use this address for account notices.</Field.Description>
                <Field.Error>Enter a complete email address.</Field.Error>
              </Field.Root>
              <Fieldset.Root id="contact-method" required>
                <Fieldset.Legend>Preferred contact method</Fieldset.Legend>
                <Fieldset.Description>Choose the method you check most often.</Fieldset.Description>
                <RadioGroup.Root className="form-foundation-choice-group" defaultValue="email" name="contact-method">
                  <RadioGroup.Radio value="email">Email</RadioGroup.Radio>
                  <RadioGroup.Radio value="phone">Phone</RadioGroup.Radio>
                </RadioGroup.Root>
              </Fieldset.Root>
              <div className="form-foundation-actions">
                <Button type="submit">Create account</Button>
                <Button tone="neutral" type="reset" variant="outline">Reset</Button>
              </div>
              <output aria-live="polite" className="form-foundation-status">{status}</output>
            </Form>
          </div>
        </Scenario>

        <section className="form-foundation-component-heading" data-component="form">
          <p className="playground-kicker">Component</p>
          <h2>Form</h2>
          <p>Native submission, validation callbacks, pending state, completion, and reset behavior.</p>
        </section>
        <Scenario description="URL, callback, async callback, validation, function action, and reset remain native or Atom behavior rather than Brick policy." title="Submission models">
          <div className="form-foundation-grid" data-testid="form-submission-models">
            <Form action="#native-result" method="get">
              <Field.Root id="native-search"><Field.Label>Native URL search</Field.Label><Input.Root className="form-foundation-control" name="query" /></Field.Root>
              <Button size="sm" type="submit">Submit URL form</Button>
            </Form>
            <Form action={async (formData) => setStatus(`Function action: ${String(formData.get("project") ?? "empty")}`)}>
              <Field.Root id="function-project"><Field.Label>React function action</Field.Label><Input.Root className="form-foundation-control" defaultValue="Analytical Engine" name="project" /></Field.Root>
              <Button size="sm" type="submit">Run function action</Button>
            </Form>
            <Form onSubmit={() => setStatus("Synchronous callback submitted")} preventDefaultOnSubmit>
              <Field.Root id="callback-name"><Field.Label>Callback value</Field.Label><Input.Root className="form-foundation-control" name="callback" /></Field.Root>
              <Button size="sm" type="submit">Run callback</Button>
            </Form>
          </div>
        </Scenario>

        <section className="form-foundation-component-heading" data-component="field">
          <p className="playground-kicker">Component</p>
          <h2>Field</h2>
          <p>One-control naming, description, error, state, orientation, appearance, and responsive behavior.</p>
        </section>
        <Scenario description="Required, optional, disabled, read-only, invalid, forced server error, and invalid-without-message states use one coherent visual language." title="Field states">
          <div className="form-foundation-grid" data-testid="field-states">
            <Field.Root id="required-field" required><Field.Label>Required field</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Required state reaches a Field-aware control.</Field.Description></Field.Root>
            <Field.Root id="optional-field"><Field.Label>Optional field<Field.RequiredIndicator fallback=" (optional)" /></Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Optional metadata</Field.Description></Field.Root>
            <Field.Root disabled id="disabled-field"><Field.Label>Disabled field</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Metadata stays readable.</Field.Description></Field.Root>
            <Field.Root id="readonly-field" readOnly><Field.Label>Read-only field</Field.Label><Input.Root className="form-foundation-control" defaultValue="Fixed value" /></Field.Root>
            <Field.Root id="invalid-field" invalid><Field.Label>Invalid field</Field.Label><Input.Root className="form-foundation-control" /><Field.Error role="alert">A newly inserted error may opt into announcement.</Field.Error></Field.Root>
            <Field.Root id="forced-field"><Field.Label>Server response</Field.Label><Input.Root className="form-foundation-control" /><Field.Error forceMatch>That value is already in use.</Field.Error></Field.Root>
            <Field.Root id="invalid-without-error" invalid><Field.Label>Invalid without Error</Field.Label><Input.Root className="form-foundation-control" /></Field.Root>
          </div>
        </Scenario>

        <Scenario description="Horizontal Field uses intrinsic tracks at wide widths and returns to one column before labels or controls overflow." title="Responsive orientation">
          <div className="form-foundation-orientation" data-testid="field-orientation">
            <Field.Root id="horizontal-wide" orientation="horizontal"><Field.Label>Account recovery address</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Description and errors align to the final control column.</Field.Description></Field.Root>
            <div className="form-foundation-constrained">
              <Field.Root id="horizontal-narrow" orientation="horizontal" invalid><Field.Label>A deliberately long localized recovery-address label</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>This narrow fixture stacks intrinsically.</Field.Description><Field.Error>Correct the value without horizontal scrolling.</Field.Error></Field.Root>
            </div>
          </div>
        </Scenario>

        <section className="form-foundation-component-heading" data-component="fieldset">
          <p className="playground-kicker">Component</p>
          <h2>Fieldset</h2>
          <p>Native related-control grouping, Legend naming, shared descriptions, group errors, and disabled propagation.</p>
        </section>
        <Scenario description="Fieldset keeps native grouping plain while CheckboxGroup, RadioGroup, and nested Fields retain their own semantics and item state." title="Fieldset groups">
          <div className="form-foundation-grid" data-testid="fieldset-groups">
            <Fieldset.Root id="notification-methods" invalid required>
              <Fieldset.Legend>Notification methods</Fieldset.Legend>
              <Fieldset.Description>Select at least one method.</Fieldset.Description>
              <CheckboxGroup.Root className="form-foundation-choice-group" name="notifications">
                <CheckboxGroup.Item value="email">Email</CheckboxGroup.Item>
                <CheckboxGroup.Item value="push">Push notification</CheckboxGroup.Item>
              </CheckboxGroup.Root>
              <Fieldset.Error>Select at least one method.</Fieldset.Error>
            </Fieldset.Root>
            <Fieldset.Root disabled id="disabled-preferences">
              <Fieldset.Legend optionalIndicator=" (optional)">Disabled preferences</Fieldset.Legend>
              <Fieldset.Description>Native fieldset disabling reaches descendants.</Fieldset.Description>
              <RadioGroup.Root className="form-foundation-choice-group" defaultValue="daily" name="digest"><RadioGroup.Radio value="daily">Daily</RadioGroup.Radio><RadioGroup.Radio value="weekly">Weekly</RadioGroup.Radio></RadioGroup.Root>
            </Fieldset.Root>
            <Fieldset.Root id="address-group">
              <Fieldset.Legend>Address details</Fieldset.Legend>
              <Field.Root id="city"><Field.Label>City</Field.Label><Input.Root className="form-foundation-control" /></Field.Root>
              <Field.Root id="postal"><Field.Label>Postal code</Field.Label><Input.Root className="form-foundation-control" /></Field.Root>
            </Fieldset.Root>
          </div>
        </Scenario>

        <section className="form-foundation-component-heading" data-component="integration-evidence">
          <p className="playground-kicker">Family integration</p>
          <h2>Composition and stress</h2>
          <p>Cross-component composition, relationships, appearance scopes, localization, direction, and constrained layouts.</p>
        </section>
        <Scenario description="Default, render, and asChild paths preserve the selected semantic elements, classes, slots, refs, and generated relationships." title="Composition">
          <div className="form-foundation-grid" data-testid="form-foundation-composition">
            <Form render={<form data-adapter="rendered-form" />} onSubmit={() => setStatus("Rendered Form submitted")} preventDefaultOnSubmit><Field.Root render={<section data-adapter="rendered-field" />} id="rendered-field"><Field.Label asChild><label data-adapter="composed-label">Rendered Field</label></Field.Label><Input.Root className="form-foundation-control" /><Field.Description render={<div data-adapter="rendered-description" />}>Rendered description</Field.Description></Field.Root><Button size="sm" type="submit">Submit rendered Form</Button></Form>
            <Field.Root asChild id="composed-field" invalid><section data-adapter="composed-field"><Field.Label>Composed Field</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Server-stable composed description</Field.Description><Field.Error asChild><div data-adapter="composed-error">Composed error</div></Field.Error></section></Field.Root>
            <Fieldset.Root asChild id="composed-fieldset" invalid><fieldset data-adapter="composed-fieldset"><Fieldset.Legend asChild><legend>Composed Fieldset</legend></Fieldset.Legend><Fieldset.Description render={<div data-adapter="fieldset-description" />}>Composed group description</Fieldset.Description><Fieldset.Error>Composed group error</Fieldset.Error></fieldset></Fieldset.Root>
          </div>
        </Scenario>

        <Scenario description="Light and dark scopes plus public anatomy tokens customize a local foundation without replacing semantics or behavior." title="Appearance and tokens">
          <div className="appearance-grid" data-testid="form-foundation-appearance">
            <div data-brick-appearance="light"><Field.Root id="light-field" required><Field.Label>Light field</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Light appearance scope.</Field.Description></Field.Root></div>
            <div data-brick-appearance="dark"><Field.Root id="dark-field" invalid><Field.Label>Dark field</Field.Label><Input.Root className="form-foundation-control" /><Field.Error>Dark appearance error.</Field.Error></Field.Root></div>
          </div>
          <Field.Root className="form-foundation-custom" id="custom-field" style={{ "--brick-field-label-foreground": "#6b2f88", "--brick-field-row-gap": "1rem", "--brick-field-error-foreground": "#8a273d" } as CSSProperties} invalid><Field.Label>Scoped token field</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>Class, style, and stable tokens remain local.</Field.Description><Field.Error>Customized error treatment.</Field.Error></Field.Root>
        </Scenario>

        <Scenario description="Native ARIA remains authoritative, Error is not live by default, and generated IDs are inspectable before interaction." title="Relationships and announcements">
          <div className="form-foundation-grid" data-testid="form-foundation-relationships">
            <Field.Root id="native-aria" invalid><Field.Label>Native ARIA field</Field.Label><Input.Root aria-describedby="explicit-description" className="form-foundation-control" /><Field.Description>Generated description does not override explicit native ARIA.</Field.Description><Field.Error>Error has no automatic live role.</Field.Error><p id="explicit-description">Explicit application description.</p></Field.Root>
            <Fieldset.Root id="forced-group"><Fieldset.Legend>Application group error</Fieldset.Legend><Fieldset.Description>Ordinary descriptive text.</Fieldset.Description><Fieldset.Error aria-live="polite" forceMatch>Deliberately live server response.</Fieldset.Error></Fieldset.Root>
          </div>
        </Scenario>

        <Scenario description="Long localization, unbroken text, 256 CSS-pixel containment, RTL, zoom, dark appearance, and logical borders remain inspectable." title="Mobile, stress, and RTL">
          <div className="stress-grid" data-testid="form-foundation-stress">
            <div className="phone-frame form-foundation-phone"><Field.Root id="long-field" invalid required><Field.Label>Extremely detailed localized account recovery and emergency contact address</Field.Label><Input.Root className="form-foundation-control" /><Field.Description>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break must remain inside the available inline size.</Field.Description><Field.Error>The translated error remains fully reachable and does not clip at 200% or 400% zoom.</Field.Error></Field.Root></div>
            <div className="phone-frame form-foundation-phone" dir="rtl"><Fieldset.Root id="rtl-group" invalid required><Fieldset.Legend>طرق الاتصال المفضلة للحساب</Fieldset.Legend><Fieldset.Description>اختر طريقة واحدة على الأقل لتلقي التنبيهات المهمة.</Fieldset.Description><CheckboxGroup.Root className="form-foundation-choice-group" name="rtl-methods"><CheckboxGroup.Item value="email">البريد الإلكتروني</CheckboxGroup.Item><CheckboxGroup.Item value="phone">الهاتف</CheckboxGroup.Item></CheckboxGroup.Root><Fieldset.Error>يرجى اختيار طريقة اتصال واحدة.</Fieldset.Error></Fieldset.Root></div>
          </div>
        </Scenario>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.location.pathname.startsWith("/checkbox") ? (
      <CheckboxFamilyPlayground />
    ) : window.location.pathname.startsWith("/form") || window.location.pathname.startsWith("/field") ? (
      <FormFoundationPlayground />
    ) : window.location.pathname.startsWith("/popover") ? (
      <PopoverPlayground />
    ) : window.location.pathname === "/hover-card/destination" ? (
      <HoverCardDestination />
    ) : window.location.pathname.startsWith("/hover-card") ? (
      <HoverCardPlayground />
    ) : window.location.pathname.startsWith("/tooltip") ? (
      <TooltipPlayground />
    ) : window.location.pathname.startsWith("/app-bar") ? (
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
