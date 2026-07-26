# Code and Code Block adoption audit

The playground uses Brick `Code` for short inline technical literals and Brick
`CodeBlock` for every source, CSS, and rendered-output specimen.

`PlaygroundCodeBlock` is a playground-only shorthand for a border-only block
without optional header chrome. It composes the public `CodeBlock` and does not
duplicate code semantics, overflow, or copy behavior. `RenderedOutput` also
composes `CodeBlock` directly because generated HTML is structured source.

Raw `code` and `pre` JSX hosts are prohibited in playground source. Exact host
semantics are verified in component and package tests instead of being
reimplemented as playground display markup.
