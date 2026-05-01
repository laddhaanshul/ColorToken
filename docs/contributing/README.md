# Contributing to @color-tokens/core

Thank you for your interest in contributing to `@color-tokens/core`! This document outlines the contribution process, coding standards, and development workflow for the project.

## Development Setup

To start contributing, fork the repository and clone it to your local machine. The project uses **npm workspaces** for monorepo management. Install all dependencies from the repository root:

```bash
git clone https://github.com/laddhaanshul/ColorToken.git
cd color-tokens
npm install                    # install all workspaces
cd packages/color-tokens
npm run build
```

For development, you can use the watch mode to rebuild automatically when source files change:

```bash
npm run dev
```

## Project Structure

The package follows a simple structure. All source code lives in `src/`, with tokens defined in `src/tokens/` and utility functions in `src/utils/`. The build output goes to `dist/`. TypeScript source files use strict mode and must pass the type checker before merging. Test files should be placed alongside their source files with a `.test.ts` suffix.

## Coding Standards

- **TypeScript Strict Mode:** All code must pass `--strict` type checking. No `any` types unless absolutely necessary and documented.
- **Immutable Token Exports:** All token objects use `as const` assertions to ensure type safety and prevent accidental mutation.
- **Consistent Naming:** Use camelCase for variables and functions, PascalCase for types and interfaces. Color scale names are lowercase.
- **Documentation:** Every exported function and type must have a JSDoc comment explaining its purpose, parameters, and return value.
- **No Side Effects:** Utility functions must be pure — no DOM access, no global state mutation, no external dependencies.

## Adding New Color Scales

To add a new color scale to the primitive tokens, follow this process. First, open `src/tokens/primitive.ts` and add the new scale as a property of the `primitiveColors` object with all 11 shade values (50 through 950). Each shade must be a valid 6-character hex string with a `#` prefix. Then, update the `PrimitiveColorScale` type to include the new scale name. Finally, consider whether any semantic tokens should reference the new scale in `src/tokens/semantic.ts`.

## Adding New Utility Functions

New utility functions should be added to `src/utils/index.ts`. Each function must have complete JSDoc documentation, proper TypeScript types for all parameters and return values, and corresponding test cases. Functions should be pure (no side effects) and should handle edge cases gracefully (return `null` or the original value for invalid inputs rather than throwing).

## Writing Tests

Tests use Vitest. Place test files alongside the source files they test, using the naming convention `*.test.ts`. Each utility function should have tests covering: normal usage, edge cases (empty strings, null-like values), boundary conditions, and error handling. Color conversion functions should include known-value assertions.

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## Submitting a Pull Request

Before submitting a PR, ensure the following steps are completed:

1. Run `npm run typecheck` — no TypeScript errors
2. Run `npm run lint` — no linting errors
3. Run `npm test` — all tests passing
4. Run `npm run build` — successful build
5. Update relevant documentation in the `docs/` folder
6. Add a description of your changes in the PR body

## Release Process

Releases are managed through GitHub Actions. When you create a **GitHub Release** on the repository's Releases page (or push a `v*` tag), the workflow automatically validates, builds, updates the version in `package.json` from the tag, and publishes to npm. Semantic versioning is followed: patch for bug fixes, minor for new features, and major for breaking changes.

```bash
# Bump version and push tag
cd packages/color-tokens
npm version patch   # or minor, major
git push origin main --follow-tags

# Then create a GitHub Release from the Releases page
# The CI pipeline handles the rest
```
