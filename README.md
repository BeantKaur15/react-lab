# react-lab

A small practice repo for learning React. Each exercise ("drill") lives in its own folder under `src/drills/`, with a component, a test and a one-line note. Everything is set up so the same checks run on your laptop and on GitHub: Vite (dev server and build), React, TypeScript, Vitest (tests), ESLint (bug finder), Prettier (formatting).

## One-time setup (Windows)

1. Install **Node 24 LTS** from <https://nodejs.org> (use the LTS button). Node 20.19 or newer also works.
2. Install **Git for Windows** from <https://git-scm.com>. It includes **Git Bash**, a terminal that behaves the same as on Mac/Linux.
3. Install **VS Code**, then these extensions: **ESLint**, **Prettier - Code formatter**, **Vitest**. (VS Code will offer them when you open this folder.)
4. Make Git Bash the default VS Code terminal: press `Ctrl+Shift+P`, type `Terminal: Select Default Profile`, pick **Git Bash**. (This repo's `.vscode/settings.json` already does it, but do it once globally too.)
5. Open Git Bash and install pnpm:

   ```bash
   npm install -g pnpm
   ```

6. Tell Git not to rewrite line endings (this repo's `.gitattributes` already keeps files in LF form; the setting stops Windows from fighting it):

   ```bash
   git config --global core.autocrlf false
   ```

   Why: Windows normally ends lines with CRLF, Linux with LF. Mixed endings make Prettier say "format check failed" only on one of the two machines. LF everywhere avoids that.

7. **Only if you use PowerShell** and it says "running scripts is disabled", run this once:

   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
   ```

   Using Git Bash avoids this.

You should see: `node -v` prints `v24.x.x` (or v20.19+), `pnpm -v` prints a number.

## Daily commands

```bash
pnpm install      # after cloning, or when package.json changes
pnpm dev          # start the app, open the address it prints
pnpm test:watch   # re-runs tests every time you save
pnpm check        # run EVERYTHING CI runs. Do this before every push.
```

`pnpm check` runs, in order: format check, lint, typecheck, tests, build. If the format check fails, run `pnpm format` and try again.

Other scripts: `pnpm test` (run tests once), `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm preview`.

## Add a drill

1. Copy the folder `src/drills/00-hello` to `src/drills/01-your-name` (File names are PascalCase; match upper/lower case exactly, because Linux cares even if Windows does not).
2. Edit `Drill.tsx`, `Drill.test.tsx`, and the one-line `NOTES.md`.
3. Open `src/drills/index.ts`, import your drill and add one line to the list.
4. Run `pnpm check`.

## What CI does

CI is a robot on GitHub (`.github/workflows/ci.yml`). On every push and pull request it starts a fresh Linux machine and a fresh Windows machine, installs the project, and runs the same steps as `pnpm check`: Install, Format check, Lint, Typecheck, Test, Build.

### Reading a red run

1. On GitHub open the **Actions** tab and click the red run.
2. Click the red job (`check`, once for Linux and once for Windows).
3. The step with the red cross is the one that failed (for example "Run tests" is called **Test**). Click it to open its log.
4. Read the **first** error message, not the last. Then run the same command locally (for example `pnpm test`) and fix it there.
5. If it fails only on one OS, suspect file name case or line endings.

## Drills

| Drill                           | Topic                        |
| ------------------------------- | ---------------------------- |
| [00-hello](src/drills/00-hello) | useState counter with a test |

Already have a repo that uses Jest and fails in CI? See [MIGRATE-FROM-JEST.md](MIGRATE-FROM-JEST.md).
