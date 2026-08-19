# spree

Playwright test automation for the [Spree Commerce](https://demo.spreecommerce.org) demo storefront.

## Getting started

```bash
npm ci
npx playwright install --with-deps chromium
cp tests/functional/config/.env.example tests/functional/config/.env
# fill in QA_EMAIL / QA_PASSWORD / QA_NAME in .env
```

Run tests:

```bash
npm test              # headless
npm run test:headed   # headed browser
npm run test:ui       # Playwright UI mode
npm run report         # open the last HTML report
```

Tests run against a real, shared demo-site account (`QA_EMAIL`), so avoid running against the
same environment concurrently with CI — see [Continuous execution](#continuous-execution) below.

## Test structure

Tests live under `tests/functional/<domain>/[<feature>/]`, split by concern:

| File | Contains |
|---|---|
| `<feature>.actions.ts` | Raw Playwright interactions/locators |
| `<feature>.assertions.ts` | Checks, written with `expect.soft(...)` |
| `<feature>.data.ts` | Typed fixtures |
| `<feature>.flow.ts` | Multi-step flows composed from actions |
| `<feature>.spec.ts` | Test cases — call flow/assertion helpers only, no raw `page.*`/`expect(...)` calls |

Domain folders (`auth`, `order`, `product`, `registration`) sit flat alongside infra folders
(`config`, `utils`). Within a domain, only add a feature subfolder when its children are
independently-testable features in their own right (e.g. `order/cart` and `order/checkout` are
separate flows that happen to share the `order` parent). If the children are just different views
of the same feature (e.g. product listing vs. details), keep them as flat sibling files instead of
nesting.

## Coding conventions

These are enforced on every PR by the [PR review workflow](#pr-review-against-conventions) below,
so treat this list as the source of truth rather than any one existing file:

1. **Locators are role-based** (`getByRole`, `getByLabel`, etc.), not raw CSS/XPath selectors.
2. **Assertions use `expect.soft(...)`** inside `.assertions.ts` files, so one test run surfaces
   every failing check instead of stopping at the first.
3. **Every `test.describe(...)` has a `{ tag: '@xxx' }`** consistent with its domain (e.g. `@auth`,
   `@cart`, `@product`, `@registration`).
4. **`test.describe.configure({ mode: 'serial' })`** is required whenever a suite's tests depend on
   state left behind by earlier tests in the same file (e.g. cart quantity carried across tests).
5. **Mutating actions confirm their effect instead of assuming success.** This site's backend
   occasionally drops cart/checkout mutations silently under load; see `clickAndConfirm` in
   `cart.actions.ts` for the retry-once pattern to follow for any new mutating action.
6. **No new `page.waitForTimeout(...)` sleeps.** Wait on a specific locator/state instead
   (auto-waiting, `waitFor`, `expect(...).toBeVisible()`). A couple of existing sleeps are marked
   as known debt — not a pattern to copy.
7. **Test titles read as `'validate user can/cannot <do something>'`**, matching the rest of the
   suite.
8. **Config, credentials, and base URLs come from `tests/functional/config/`**
   (`environments.ts`, `credentials.ts`) — never hardcode a URL, email, or password in a test.

Tests are commonly drafted with AI pair-programming assistance (Claude Code) — the PR review
workflow is what actually keeps AI-authored and human-authored changes alike to these conventions,
rather than trusting the drafting process itself.

## Automated workflow

Besides the tests themselves, this repo automates the process around them:

### PR review against conventions

`.github/workflows/pr-test-review.yml` — on every PR that touches `tests/**` or
`playwright.config.ts`, Claude reviews the diff against the conventions above (prompt:
[`pr-test-review.md`](.github/prompts/pr-test-review.md)) and posts inline PR comments citing the
specific convention violated, with a fix in the repo's existing style. If nothing violates a
convention, it says so instead of manufacturing nitpicks.

### Continuous execution

`.github/workflows/playwright.yml` — on every push to `main`, the full suite runs against the live
demo storefront. Runs are queued (`concurrency`, no cancel-in-progress) rather than parallelized,
since all runs share one real account and its cart state. A test that only passes on retry is
still treated as a build failure ([`scripts/check-flaky.js`](scripts/check-flaky.js)). The HTML
report and, on failure, screenshots/videos are uploaded as artifacts.

### Automated failure analysis

`.github/workflows/test-failure-analysis.yml` — triggered when the run above fails. Claude
(prompt: [`test-failure-analysis.md`](.github/prompts/test-failure-analysis.md)) inspects the
JSON report, failure screenshots, and video frames for each failing/flaky test, and for each one:

- Reads the file:line from the stack trace and checks for an existing
  `// KNOWN-FAILURE(#123): <reason> — retriage if this changes` marker on the line above.
  - **Marker present, issue still open** → already tracked; skip, just note it in the summary.
  - **Marker present, issue closed** → regression; treat as new and replace the stale marker.
  - **No marker** → new failure.
- For each new/regressed failure, classifies it as a **likely product bug**, **likely script
  issue** (stale locator, bad assumption, test-side flake), or **inconclusive**, grounded in what
  the screenshot/video actually shows rather than just the error message.
- Files a GitHub issue per new/regressed failure with the classification, evidence, and a
  suggested next step — this is the feedback loop that tells QA whether a red run needs a script
  fix or a bug report.
- Opens a PR adding the `KNOWN-FAILURE(#N)` marker comments (never pushed straight to `main`), so
  the next run recognizes the same failure and doesn't re-file it.

Analysis is strictly triage: it never edits test logic itself, and every marker/issue it produces
lands via a PR for a human to approve.
