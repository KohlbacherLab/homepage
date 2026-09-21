# Conventions

## Code Style

- **ESLint** with `@tada5hi/eslint-config` (TypeScript + Vue enabled)
- Flat config format (`eslint.config.js`)
- Key rule overrides:
  - `class-methods-use-this`: off
  - `no-shadow`: off
  - `no-use-before-define`: off
  - `@typescript-eslint/no-unused-vars`: error (with `_` prefix for ignored args)
- A scoped block for `files: ['**/*.vue']` seeds browser globals (`window: 'readonly'`) — the shared config only
  seeds Node globals, and `KTeam` reads `window.location.search`. Keep it; it is not dead config to clean up.
- Lint command: `npm run lint` / `npm run lint:fix`
- Long static `class` strings are hoisted to module-level constants and bound with `:class` rather than wrapped
  across two lines in the template: a `class="..."` value that line-wraps in source bakes a literal newline into
  the rendered attribute.

## TypeScript

- ESM (`"type": "module"` in package.json)
- Extends `@tada5hi/tsconfig`
- Target/module: ESNext
- Includes `src/` and `src/.vitepress/`

## Git Hooks

- **Husky** for git hooks
- **Pre-commit**: runs `lint-staged` which applies `eslint --fix` to staged `*.{mjs,ts,vue}` files

## Testing

- Domain logic under `src/.vitepress/domains/**` has `*.spec.ts` unit tests next to the code.
- Runner: Node's built-in `node:test` with `--experimental-transform-types` (`npm test`). No test dependencies.
- Components are verified in the browser (light/dark, 390px and desktop widths).

## CI/CD

Two GitHub Actions workflows:

| Workflow    | Trigger        | Steps                                  |
|-------------|----------------|-----------------------------------------|
| `check.yml` | Pull requests  | Install, Test, Typecheck, Build, Lint  |
| `main.yml`  | Push to master | Install, Build, Deploy to GH Pages     |

Deployment uses `peaceiris/actions-gh-pages` to publish `src/.vitepress/dist/` with a CNAME for `kohlbacherlab.org`.

## File Conventions

- Vue SFCs use `.vue` extension
- Config files use `.mjs` extension
- Domain/logic files use `.ts` extension
- Data loader files follow VitePress naming: `*.data.ts`
- Content pages are Markdown (`.md`)

## Copyright Headers

TypeScript files include a copyright block:

```ts
/*
 * Copyright (c) {{year}}.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */
```

## Branch Strategy

- Main branch: `master`
- Dependabot configured for automated dependency PRs
