# Marquee agent guide

## Purpose

Present continuous decorative motion while retaining one accessible original track.

## Use when

- A logo, text or passive media strip benefits from continuous motion.

## Choose something else when

- Users navigate discrete slides. Use Carousel.
- Content includes arbitrary interactive stateful widgets. Use Stack or Grid.

## Required composition

- Compose Root, Viewport, Content and Item. Supply Content renderReplica explicitly with pure, passive, ID-free visual content.
- Use a persistent external pause button for indefinite motion. RootProvider accepts useMarquee for external controls.
- Constrain vertical motion with Frame blockSize. Optional Edge paint must match the owning surface.

## Rules

- **MUST:** Never blindly clone interactive or stateful children. Unsafe or absent replicas produce stationary originals; inert and aria-hidden do not make callback side effects safe.
- **MUST:** Respect reduced motion and focus-to-static behavior. User pause is independent of hover and completion; restart does not discard requested pause.
- **MUST:** Use the shared spacing contract: numeric factors multiply by four pixels, legacy string spacing tokens retain their mapping. Default numeric 4 is 16px.
- **MUST:** Load styles.css or core.css plus marquee.css and CSS for all composed components.

## Common mistakes

- **Avoid:** Using duration and speed as competing authorities. **Instead:** Set speed in pixels per second; measured geometry determines duration.
- **Avoid:** Using only hover to pause. **Instead:** Provide a named persistent button usable by keyboard and touch.

## Validation checklist

- Check actual transforms, finite callbacks, direction/RTL, focus visibility, replica safety, reduced motion, hidden content, narrow width and edge paint.

## Related guidance

- `carousel`
- `frame`
- `button`
- `for`
- `surface`
