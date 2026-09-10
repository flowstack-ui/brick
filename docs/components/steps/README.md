# Steps

Steps presents progress through a finite workflow. Atom owns state, validation gates, native interactions, and accessibility. Brick owns marker geometry, connectors, typography, and semantic paint.

## When and where to use

Use for checkout, setup, and other ordered multi-stage workflows with one current stage.

## When not to use

Static numbered documentation should use List, Square, Surface, and typography. Use Tabs for independent panels. Steps does not perform submission, asynchronous validation, persistence, routing, or optional-stage bookkeeping.

## Installation and imports

```tsx
import { Steps } from "@flowstack-ui/brick/steps";
import { Button } from "@flowstack-ui/brick/button";
import "@flowstack-ui/brick/styles.css";
```

Modular CSS requires core.css and steps.css from `@flowstack-ui/brick/styles/`. The Steps entry includes Checkmark styling. Button requires its own CSS entry when using modular styles.

```tsx
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/steps.css";
```

## Quick start

```tsx
<Steps.Root count={2}>
  <Steps.List aria-label="Setup progress">
    <Steps.Item index={0}>
      <Steps.Trigger><Steps.Indicator /><Steps.Title>Account</Steps.Title></Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>
    <Steps.Item index={1}>
      <Steps.Trigger><Steps.Indicator /><Steps.Title>Review</Steps.Title></Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>
  </Steps.List>
  <Steps.Content index={0}>Account form</Steps.Content>
  <Steps.Content index={1}>Review form</Steps.Content>
  <Steps.CompletedContent aria-label="Setup complete">Finished</Steps.CompletedContent>
  <Steps.PrevTrigger asChild><Button variant="outline">Back</Button></Steps.PrevTrigger>
  <Steps.NextTrigger asChild><Button>Continue</Button></Steps.NextTrigger>
</Steps.Root>
```

## Anatomy and DOM ownership

Root is a div; List an ol; Item an li; Trigger, NextTrigger, and PrevTrigger native buttons; Indicator, Title, Description, and Separator spans; Content and CompletedContent div groups. Context and ItemContext render callbacks add no host. Trigger is optional for read-only progress. Keep Indicator first for vertical connectors. Use Stack inside Trigger to group title and description.

## API

Root requires `count`. `step` and `defaultStep` (default 0) use zero-based indices; `step === count` means complete. `onStepChange(step)` requests a change. `onStepComplete` fires on an observed transition into completion, not initial completed mounting. `linear` (false) enables synchronous `isStepValid(index)` checks for crossed forward stages; `onStepInvalid({ step, targetStep })` reports the first invalid stage. Backward navigation never validates. `disabled` defaults false. `orientation` is horizontal (default) or vertical; `dir` inherits unless provided.

| Visual prop | Values | Default |
| --- | --- | --- |
| `size` | `xs`, `sm`, `md`, `lg` | `md` |
| `variant` | `solid`, `subtle` | `solid` |
| `tone` | `accent`, `neutral` | `accent` |

Item and Content take `index`. Content and CompletedContent accept `keepMounted` (true). Root Context exposes step, count, isCompleted, hasNextStep, hasPrevStep, disabled, orientation, dir, setStep, nextStep, prevStep, and resetStep. Reset returns to zero. ItemContext exposes index, current, completed, and incomplete. Indicator children replace the localized number/default completed Checkmark.

Public exports include Steps, StepsRoot, StepsRootProps, every named Steps part and corresponding Props type, StepsSize, StepsVariant, StepsTone, StepsOrientation, StepsInvalidDetails, StepsContextValue, and StepsItemState.

## Visual recipes and states

Typography follows shared recipes: xs/sm use caption, md uses body-sm, and
lg uses body-md. Titles use control-sm sizing (label-md at lg) with the
shared medium label weight. Indicators also use that label weight.
Font family, line height and tracking follow the selected body recipe rather
than local literal values. No application CSS is needed for this mapping.

Marker sizes are 24, 32, 40, and 44px at a 16px root font size; icon sizes are 14, 16, 16, and 20px. Markers never shrink. Solid uses outlined future markers and filled completed markers; subtle uses muted future and soft completed fills. Current markers retain an accent edge. The terminal connector is hidden. Workflow circles are intentional; static documentation surfaces are a different composition.

## Tokens and CSS hooks

Root uses `.brick-steps`, `data-size`, `data-variant`, and `data-tone`. Parts have `.brick-steps-*` hooks and Atom's `data-current`, `data-complete`, `data-incomplete`, `data-orientation`, and `data-disabled` state hooks. Bounded composition tokens include `--brick-steps-marker-size`, `--brick-steps-icon-size`, `--brick-steps-gap`, `--brick-steps-content-gap`, `--brick-steps-thickness`, and `--brick-steps-radius`. Paint inherits semantic Theme tokens rather than fixed palette values.

## Customization

Prefer size, variant, tone, and public layout components. Supply Indicator children for custom stage icons. Do not replace state handling with Block CSS. Application validation and translated labels remain application-owned.

## Responsive behavior

One DOM tree is used for SSR and client rendering. Orientation is scalar, not breakpoint detection. Labels wrap; marker geometry remains fixed. A compact or vertical composition is appropriate for narrow containers; long horizontal workflows may require a ScrollArea. Do not duplicate interactive forms at different breakpoints.

## Accessibility

Native ordered-list semantics and `aria-current="step"` describe progression. Buttons use native Tab, Space, and Enter, not tablist arrow navigation. Supply meaningful Title text and a List label. Content is named by its corresponding Title unless given an explicit accessible name. Decorative numbers/checks/connectors are hidden from assistive technology. Keep critical completion meaning in authored text. Hidden panels remain mounted by default, retaining form state. Focus moves to the active panel when a focused retained panel becomes hidden; the application owns focus when unmounting panels. Async pending/error announcements and form submission remain application-owned.

## Composition, native props, and refs

All host parts forward native props, refs, `asChild`, and `render` through Atom. Use native button-compatible children for triggers; supplied handlers can cancel internal navigation with preventDefault. Generated Title identifiers connect the named panels. AsChild Indicator requires an explicit host child. Steps does not style NextTrigger or PrevTrigger as actions: compose Button.

## Examples

```tsx
<Steps.Root count={3} size="sm" variant="subtle" orientation="vertical" />
<Steps.Root count={3} step={stage} onStepChange={setStage} linear isStepValid={isValid} />
```

## Evidence

- [Playground](../../../playground/src/components/steps/StepsPage.tsx)
- [Unit tests](../../../test/components/steps/steps.test.tsx)
- [Type tests](../../../test/types/components/steps.test.ts)
- [Browser behavior](../../../playground/tests/components/steps/behavior.spec.ts)
- [Visual evidence](../../../playground/tests/components/steps/visual.spec.ts)
- [Manual protocol](../../../playground/manual-tests/steps.md)

## Changelog

See [Steps changelog](CHANGELOG.md) and [package changelog](../../../CHANGELOG.md).
