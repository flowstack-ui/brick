# Contributing to Brick

This guide is for contributors working from a clone of the Brick repository.
It is intentionally excluded from the npm package.

## Setup

Use the Node version declared in `.nvmrc`, then install the root and application
workspace dependencies:

```bash
nvm use
npm ci
```

## Development surfaces

Run the component catalog locally:

```bash
npm run dev:playground
```

Use the network command for review on a physical device:

```bash
npm run dev:playground:network
```

Run the realistic application composition separately:

```bash
npm run dev:consumer
npm run dev:consumer:network
```

The catalog uses port `3010` and its deterministic browser preview uses port
`4010`. Both ports are strict and do not silently increment.

## Verification

Choose the smallest applicable tier while iterating:

```bash
npm run check:focused -- <component>
npm run check:repository
npm run check:release
```

The release tier is reserved for a release candidate. It includes the complete
browser matrix, package archives, clean React integrations, the application
composition, and CSS-size evidence.

## Documentation and evidence

- [Contributor documentation](docs/contributing/README.md)
- [Component workstream](docs/contributing/component-workstream.md)
- [Public documentation contract](docs/contributing/documentation.md)
- [Catalog evidence](docs/contributing/playground.md)
- [Manual review](docs/contributing/manual-testing.md)
- [Application verification](docs/contributing/consumer-verification.md)
- [Testing guide](docs/guides/testing.md)
- [Release guide](docs/guides/releasing.md)

Every component change must keep its source, tests, public guide, changelog,
catalog evidence, manual protocol, and coverage record aligned. Reusable
behavior or accessibility defects belong in Atom first.

## Community and security

Search existing issues and use the structured issue forms for bug reports and
feature requests. Report vulnerabilities privately according to
[SECURITY.md](SECURITY.md). By participating, you agree to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).
