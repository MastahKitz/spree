# Task: triage a failed Playwright CI run

You are reviewing a failed run of this repo's Playwright suite (`tests/functional`), which
drives the live public Spree demo storefront (https://demo.spreecommerce.org). Your job is to
read the evidence for each failing test and decide, per test, whether the failure looks like a
**real defect in the site under test** or a **problem with our script/environment** (stale
locator, timing, network flake, shared-account state, etc.). Do not assume either answer —
follow the evidence.

Useful background, already true of this suite, so don't re-derive it:

- All CI runs share one real account and cart on the live site (see the `concurrency` block in
  `.github/workflows/playwright.yml`), so state can carry over between runs in ways a fresh
  local run wouldn't hit.
- `tests/functional/order/cart/cart.actions.ts` already retries each cart mutation once via
  `clickAndConfirm`, to absorb a known backend flake where a click is silently dropped. A
  failure that survived that retry is more likely a genuine problem than ordinary flake.
- Playwright's own failure screenshot is taken at the moment the action **times out** — several
  seconds after the click. Any toast/notification that auto-dismisses quickly will already be
  gone from that screenshot. Don't conclude "no error was shown" just because the screenshot is
  clean; check the trace before ruling that out.

## Where the evidence lives

- `test-report/results.json` — the JSON reporter output. Find every spec whose test result has
  `"status": "failed"` (or whose parent has `"status": "unexpected"`). Read the `error.message`
  and `error.stack` for each.
- Each failed result has an `attachments` array (`screenshot`, `video`, `error-context`,
  `trace`). Their `path` values are **absolute paths from the CI runner that produced the
  report** (e.g. `/home/runner/work/.../test-results/<slug>/trace.zip`) — that exact directory
  doesn't exist here. Instead, take everything from `test-results/` onward in that path and
  resolve it under the `test-results/` directory that was downloaded alongside this report; the
  folder structure is otherwise identical.
- `error-context.md` in that folder is a markdown accessibility-tree snapshot of the page at the
  moment of failure, plus the relevant test source — read this first, it's the cheapest signal.
- Each `trace.zip` has already been extracted for you into a sibling `trace.zip-extracted/`
  folder. Inside, `*.trace` and `*.network` files are JSONL — grep them for the failing action's
  timing window and for response bodies containing things like error text, stock/quantity/limit
  messages, or non-2xx statuses. This is the only place you'll find a toast that had already
  faded by the time the failure screenshot was taken.
- The actual test/page-object source is checked out in `tests/functional/` if you need to see
  what a helper does (e.g. `cart.actions.ts`, `checkout.actions.ts`).

The extracted trace resources include the live demo account's session cookies (`_spree_jwt`,
`_spree_refresh_token`) and full request/response headers in plain text. Never quote a cookie,
token, or `authorization`/`cookie` header value in your output — only quote response *bodies*
(error text, JSON error messages) when they're relevant evidence.

## Output

Write GitHub-flavored markdown (this goes straight into the job summary):

1. A table: `Test | Verdict | Confidence | Evidence`. Verdict is one of `Site bug/limit`,
   `Script/environment issue`, or `Inconclusive`. Evidence should cite something concrete you
   found (an exact string from a response body, an error message, a line in the test) — not a
   restatement of the verdict.
2. One short paragraph of overall summary and, if you found a genuine site defect, what about
   the evidence makes you confident it's not just our script.

Be calibrated: if you dug through the trace and genuinely found nothing beyond "the button
click didn't do anything," say that plainly and mark it `Inconclusive` rather than guessing at a
cause you can't support.
