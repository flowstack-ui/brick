# Optional Image delivery qualification

This isolated fixture uses Next 16.3.5 and React/React DOM 19.2.3. It is excluded
from the Brick runtime and npm archive. Run from the package repository:

```sh
node scripts/verify-image-next.mjs BRICK_TGZ BRICK_SHA256 ATOM_TGZ ATOM_SHA256
```

The script verifies both digests, copies this fixture into a temporary consumer,
installs the exact archives, copies controlled local image assets, runs a
production webpack build and Next start, and tests both integration paths in
Chromium. It records exact dependency versions, archive identities, currentSrc,
request URLs, warm-cache headers, SSR discovery, refs/events, error recovery and
lazy scheduling in `evidence.json` in the printed temporary directory.

Port 4097 must be free. No remote sources are allowed. The main fixture uses
explicit intrinsic dimensions and Brick ratio. The qualification route also
checks Next fill inside a definite positioned Brick root, delayed JavaScript
hydration after native success/error, replacement of a delayed request, source
removal, and a hidden lazy image revealed later. Device-scale-factor 1 isolates
candidate-width selection; production performance is not inferred. Network
timing tests use controlled Chromium routing, not a guarantee about every
browser's scheduling or hidden-image policy.
