# Task: review this PR against our Playwright test framework conventions

Scope: this is **not** a general code review. Only check whether test code changed in this PR
follows the conventions this repo's `tests/functional/` suite already uses. Ignore style
preferences, performance, and anything outside `tests/functional/**` and `playwright.config.ts`.
If the diff doesn't touch test code, say so briefly and stop.

Use `gh pr diff` to see what changed, and read surrounding files with Read/Grep/Glob to check
changed code against existing sibling files in the same feature folder (an existing `.actions.ts`
/ `.assertions.ts` / `.flow.ts` / `.data.ts` in another feature is the reference implementation —
don't invent rules that aren't actually followed elsewhere in the repo).

## Conventions to check

1. **File split per feature** — each feature folder under `tests/functional/<domain>/<feature>/`
   separates concerns into `<feature>.actions.ts` (raw Playwright interactions/locators),
   `<feature>.assertions.ts` (checks), `<feature>.data.ts` (typed fixtures), `<feature>.flow.ts`
   (composed multi-step flows built from actions), and `<feature>.spec.ts` (test cases). A new
   feature that dumps locators or assertions directly into a `.spec.ts` or `.flow.ts` file
   breaks this split.
2. **`.spec.ts` files call flow/assertion helpers only** — they should not contain raw
   `page.*` calls or raw `expect(...)` assertions. If a spec needs a new interaction or check,
   it belongs in that feature's `.actions.ts`/`.assertions.ts`, not inline in the test.
3. **Assertions use `expect.soft(...)`**, not bare `expect(...)`, inside `.assertions.ts` files,
   so a single test surfaces every failing check instead of stopping at the first.
4. **Locators are role-based** (`getByRole`, `getByLabel`, etc.), not raw CSS/XPath selectors,
   matching the existing `.actions.ts`/`.assertions.ts` files.
5. **Every `test.describe(...)` has a `{ tag: '@xxx' }`.** Pick a tag consistent with the
   feature's domain (see existing tags: `@auth`, `@cart`, `@product`, `@registration`).
6. **`test.describe.configure({ mode: 'serial' })`** is required when a suite's tests depend on
   state left behind by earlier tests in the same file (e.g. cart quantity carried across tests,
   as in `cart.spec.ts`). A new suite with that kind of inter-test dependency but no serial-mode
   config is a bug waiting to happen under parallel execution.
7. **Mutating actions against this site should confirm their effect, not assume success.** The
   backend for this live demo site is known to silently drop cart mutations under load; see
   `clickAndConfirm` in `cart.actions.ts` — it retries the click once if the expected UI change
   doesn't show up. A new action that mutates cart/checkout/account state and just clicks without
   confirming the result is likely to be flaky in CI.
8. **No new `page.waitForTimeout(...)` sleeps.** `auth.actions.ts` and `product.actions.ts`
   already have a couple of these marked `// temporary fix for ... flakiness` — that's known
   existing debt, not a pattern to copy. A new action should wait on a specific locator/state
   (Playwright's auto-waiting, `waitFor`, or `expect(...).toBeVisible()`), not a fixed sleep.
9. **Test titles read as `'validate user can/cannot <do something>'`**, matching every existing
   spec. A title that doesn't say what the user can or cannot do is inconsistent with the rest
   of the suite.
10. **Config, credentials, and base URLs come from `tests/functional/config/`**
    (`environments.ts`, `credentials.ts`) — a new test hardcoding a URL, email, or password
    instead of importing from config is a regression.

## Output

Post inline comments (via the GitHub inline-comment tool) on the specific lines that violate a
convention above — cite which numbered convention it breaks and show the fix as a short code
snippet using this repo's existing pattern, not a generic suggestion. Don't invent nitpicks
outside this list.

If everything in the diff already follows these conventions, post one short top-level comment
saying so — don't manufacture feedback to seem thorough.
