<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial ratification)
  Modified principles: N/A (initial)
  Added sections:
    - Core Principles (5): Accessibility-First, Component Architecture,
      Full Test Coverage, Type Safety, Simplicity & Performance
    - Technology Constraints
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ no changes needed
      (Constitution Check section is dynamically resolved)
    - .specify/templates/spec-template.md ✅ no changes needed
    - .specify/templates/tasks-template.md ✅ no changes needed
    - .specify/templates/checklist-template.md ✅ no changes needed
    - .specify/templates/agent-file-template.md ✅ no changes needed
    - .specify/templates/commands/ — directory does not exist, skipped
    - README.md ✅ no changes needed
  Follow-up TODOs: none
-->

# Emoji Finder Constitution

## Core Principles

### I. Accessibility-First

- Every interactive element MUST be keyboard-navigable and include
  appropriate ARIA attributes.
- All images MUST have descriptive `alt` text.
- Semantic HTML elements (`header`, `nav`, `main`, `button`, etc.)
  MUST be used over generic `div`/`span` wrappers.
- Color contrast MUST meet WCAG 2.1 AA standards.

**Rationale**: An emoji finder is a utility for all users. Accessible
design is non-negotiable for inclusive usability.

### II. Component Architecture

- All UI MUST be built as functional React components; class
  components are prohibited.
- Each component MUST reside in its own directory following the
  pattern `src/components/ComponentName/` with barrel exports.
- Components MUST be self-contained: co-located types, tests, and
  implementation.
- Hooks MUST only be called at the top level of a component or
  custom hook—never inside loops or conditions.

**Rationale**: Consistent component structure keeps the codebase
navigable and supports the React Compiler optimizations in use.

### III. Full Test Coverage (NON-NEGOTIABLE)

- 100% statement, branch, function, and line coverage is required
  (`npm run test:ci` MUST pass).
- Tests MUST use `@testing-library/react` and
  `@testing-library/user-event` for component and interaction
  testing.
- External dependencies (browser APIs, network) MUST be mocked.
- Test names MUST clearly describe the behavior under test.

**Rationale**: The project enforces 100% coverage in CI. Untested
code MUST NOT be merged.

### IV. Type Safety

- TypeScript strict mode MUST remain enabled; implicit `any` is
  prohibited.
- Interfaces MUST be preferred over type aliases for object shapes.
- React event handlers MUST use specific event types
  (`React.ChangeEvent`, `React.MouseEvent`, etc.).
- All public APIs and complex functions MUST include TSDoc comments.

**Rationale**: Strict typing catches bugs at compile time and serves
as living documentation for contributors.

### V. Simplicity & Performance

- YAGNI: features MUST NOT be added until they are needed.
- Tailwind CSS utility classes MUST be the sole styling mechanism;
  custom CSS files are prohibited unless no Tailwind equivalent
  exists.
- No `console.log` or `debugger` statements in committed code.
- Bundle size MUST be monitored; unnecessary dependencies MUST NOT
  be introduced without justification.

**Rationale**: A lightweight emoji finder MUST load fast and stay
simple. Complexity must be justified.

## Technology Constraints

- **Runtime**: Node.js 24, ES modules (`"type": "module"`).
- **UI**: React 19 with React Compiler
  (`babel-plugin-react-compiler`).
- **Language**: TypeScript 5 in strict mode.
- **Build**: Vite 7; production output to `dist/`.
- **Styling**: Tailwind CSS 4 via PostCSS.
- **Testing**: Vitest 4 + `@testing-library/react` +
  `@vitest/coverage-v8`.
- **Linting**: ESLint 9 with `typescript-eslint`,
  `eslint-plugin-react-hooks`, `eslint-plugin-simple-import-sort`,
  and Prettier integration.
- **Git Hygiene**: Husky + lint-staged; Conventional Commits
  enforced by commitlint.
- New dependencies MUST be discussed and justified before
  installation.

## Development Workflow

- **Branching**: Feature branches off `master`; conventional commit
  messages enforced.
- **Quality Gates** (all MUST pass before merge):
  1. `npm run lint` — zero ESLint errors.
  2. `npm run lint:tsc` — zero TypeScript errors.
  3. `npm run test:ci` — all tests pass with 100% coverage.
- **Code Review**: All pull requests MUST be reviewed for
  constitution compliance before merge.
- **Import Order** (enforced by `eslint-plugin-simple-import-sort`):
  1. External libraries.
  2. Internal absolute imports (`src/`).
  3. Relative imports.

## Governance

- This constitution supersedes all other development practices for
  the Emoji Finder project.
- Amendments MUST be documented with a version bump, rationale, and
  migration plan when applicable.
- Version increments follow Semantic Versioning:
  - **MAJOR**: Principle removal or backward-incompatible
    redefinition.
  - **MINOR**: New principle or materially expanded guidance.
  - **PATCH**: Clarifications, wording, or typo fixes.
- Every pull request and code review MUST verify compliance with
  these principles.
- The `AGENTS.md` file MUST remain consistent with this
  constitution; updates here MUST be reflected there.

**Version**: 1.0.0 | **Ratified**: 2026-02-08 | **Last Amended**: 2026-02-08
