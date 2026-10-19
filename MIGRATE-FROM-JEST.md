# Migrate a Vite repo from Jest to Vitest

Why: Jest does not understand TypeScript/TSX by itself. In a Vite + React + TypeScript project it fails with a Babel parser error and `Tests: 0 total`. Vitest reads your Vite config, so TS and TSX just work.

Do this in Git Bash, from your repo's root folder, on a new branch (`git switch -c use-vitest`).

## 1. Remove Jest

First see which Jest and Babel packages you have:

```bash
grep -n -E "jest|babel" package.json
```

Remove every package that line list shows from `dependencies`/`devDependencies`. Usual suspects: `jest`, `babel-jest`, `ts-jest`, `@types/jest`, `jest-environment-jsdom`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react`, `@babel/preset-typescript`. Example (use only your names, because pnpm errors on a name that is not installed):

```bash
pnpm remove jest @types/jest jest-environment-jsdom
```

You should see: pnpm prints `- jest 30.x.x` and so on, and finishes without an error.

Delete the config files. This command ignores the ones you do not have:

```bash
git rm -f --ignore-unmatch jest.config.js jest.config.ts jest.config.cjs jest.config.mjs babel.config.js babel.config.cjs .babelrc
```

Open `package.json` and delete the whole `"jest": { ... }` block if there is one, and change the `"test"` script (step 4).

You should see: the command prints `rm 'jest.config...'` for each file it deleted, and `grep -n -E "jest|babel" package.json` only shows the `"test"` script lines.

## 2. Add Vitest

```bash
pnpm add -D vitest@^4 jsdom@^29.1.1 @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom@^6.9.1
```

Use exactly these version ranges: newer `vitest` (5) and `jsdom` (30) need Node 22 or newer, and these work on Node 20.19 and 24. You should see: pnpm prints `+ vitest 4.x.x` and the other names. If pnpm says a version is "too new" (minimum release age), run the command again after it adds the package to `pnpm-workspace.yaml`, or wait a day.

## 3. Add the config

In `vite.config.ts` change the first lines so `defineConfig` comes from `vitest/config`, and add the `test` block:

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
```

You should see: both files saved, no red squiggles in VS Code.

## 4. Add the scripts

In `package.json`, `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

(Replace the old `"test": "jest"`.) You should see: only one `"test"` line.

## 5. Change the tests

In every `*.test.ts` / `*.test.tsx` file:

- Add at the top: `import { describe, expect, it, vi } from 'vitest'` (only the names the file uses; `test` works too).
- Delete any `import ... from '@jest/globals'`.
- `jest.fn(...)` becomes `vi.fn(...)`
- `jest.mock(...)` becomes `vi.mock(...)`
- `jest.spyOn(...)` becomes `vi.spyOn(...)`
- `jest.useFakeTimers()` becomes `vi.useFakeTimers()`

Find leftovers with: `grep -rn "jest\." src` (matches of `jest-dom` are fine). You should see: no output.

Make sure `tsconfig.app.json` has `"include": ["src"]` so the tests are type-checked, and remove `"jest"` from any `"types"` list.

## 6. Run everything

```bash
pnpm format
pnpm test
```

(`pnpm format` tidies the lines you just edited so the format check passes later.)

You should see: `Test Files  N passed` and `Tests  N passed`.

If you have the extra scripts (`format:check`, `lint`, `typecheck`) run the full gate:

```bash
pnpm check
```

If your repo does not have a `check` script, copy it from this repo's `package.json`. You should see: every step passes and `built in ...ms` at the end.

## 7. Commit and push

```bash
git add -A
git commit -m "chore: switch from Jest to Vitest"
git push -u origin use-vitest
```

`-u` sets the upstream: it links the local branch to the one on GitHub, so later pushes need only `git push`. Make sure `pnpm-lock.yaml` is in the commit (CI installs from it). You should see: a green tick on your commit in GitHub's Actions tab.
