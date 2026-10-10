# Inline playground examples

Normal component routes render original inline scenarios. Settings belong in
the app bar, not in per-example boxes or toolbars. Old isolated query parameters
must not change the page presentation. A presentation migration requires a
separate explicit user request.

InlineExampleEnvironment supplies direction and keyboard context without paint,
spacing or controls; the English shell stays LTR. Appearance, Theme, accent,
radius and font settings apply to the playground. Authored local scopes win.

The standalone preview.html runner remains internal test infrastructure, sharing
the same Page modules. Its closed generated registry pairs runtime and source.
Validate scenario IDs and protocol origins; do not import shell CSS there.

Keep component owner tests. Shared runtime tests assert no added iframes or
per-example controls on ordinary routes, plus padded Popover Header/Body anatomy,
short-screen scrolling and app-bar settings. Regenerate the registry with
scripts/build-preview-registry.mjs and run scripts/verify-preview-environment.mjs.

Presets are compiled and contrast-validated in theme-fixtures/preview-presets.
Qualification locks conflicting controls. Fontsource Inter and Outfit assets
are local dev-only dependencies, not external font requests.
