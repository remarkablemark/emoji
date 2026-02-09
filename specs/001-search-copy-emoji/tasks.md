# Tasks: Search and Copy Emoji

**Input**: Design documents from `/specs/001-search-copy-emoji/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Tests are included — the project constitution requires 100% coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and create shared types and data layer

- [x] T001 Install emoji data dependencies: `npm install unicode-emoji-json emojilib`
- [x] T002 [P] Create shared TypeScript interfaces (Emoji, Category) in src/types/emoji.types.ts
- [x] T003 [P] Create emoji data adapter merging unicode-emoji-json + emojilib in src/data/emoji.ts
- [x] T004 Create unit tests for emoji data adapter in src/data/emoji.test.ts

**Checkpoint**: Shared types and emoji data layer ready — all user stories can now consume emoji data

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Custom hooks that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Implement useEmojiSearch hook (search + category filter logic) in src/hooks/useEmojiSearch.ts
- [x] T006 Create unit tests for useEmojiSearch hook in src/hooks/useEmojiSearch.test.ts
- [x] T007 [P] Implement useCopyToClipboard hook (clipboard write + toast state) in src/hooks/useCopyToClipboard.ts
- [x] T008 [P] Create unit tests for useCopyToClipboard hook in src/hooks/useCopyToClipboard.test.ts

**Checkpoint**: Foundation ready — hooks tested and working, user story implementation can begin

---

## Phase 3: User Story 1 — Search for an Emoji by Keyword (Priority: P1) 🎯 MVP

**Goal**: Users can type a keyword into a search field and see matching emoji in real time

**Independent Test**: Type "smile" into the search field and verify matching emoji appear; type nonsense and verify "no results" message; clear search and verify all emoji display grouped by category

### Implementation for User Story 1

- [x] T009 [P] [US1] Create SearchBar component with types in src/components/SearchBar/SearchBar.tsx and src/components/SearchBar/SearchBar.types.ts
- [x] T010 [P] [US1] Create SearchBar barrel export in src/components/SearchBar/index.ts
- [x] T011 [US1] Create SearchBar tests in src/components/SearchBar/SearchBar.test.tsx
- [x] T012 [P] [US1] Create NoResults component in src/components/NoResults/NoResults.tsx
- [x] T013 [P] [US1] Create NoResults barrel export in src/components/NoResults/index.ts
- [x] T014 [US1] Create NoResults tests in src/components/NoResults/NoResults.test.tsx
- [x] T015 [P] [US1] Create EmojiCard component with types in src/components/EmojiCard/EmojiCard.tsx and src/components/EmojiCard/EmojiCard.types.ts (emoji tile displaying character + name, without copy button — copy added in US2)
- [x] T016 [P] [US1] Create EmojiCard barrel export in src/components/EmojiCard/index.ts
- [x] T017 [US1] Create EmojiCard tests in src/components/EmojiCard/EmojiCard.test.tsx
- [x] T018 [P] [US1] Create EmojiGrid component with types in src/components/EmojiGrid/EmojiGrid.tsx and src/components/EmojiGrid/EmojiGrid.types.ts (responsive grid with category section headers, fluid columns)
- [x] T019 [P] [US1] Create EmojiGrid barrel export in src/components/EmojiGrid/index.ts
- [x] T020 [US1] Create EmojiGrid tests in src/components/EmojiGrid/EmojiGrid.test.tsx
- [x] T021 [US1] Add keyboard navigation to EmojiGrid and EmojiCard: tab through emoji tiles, Enter to activate, proper focus management in src/components/EmojiGrid/EmojiGrid.tsx and src/components/EmojiCard/EmojiCard.tsx
- [x] T022 [US1] Update App component to integrate SearchBar + EmojiGrid + NoResults with useEmojiSearch hook in src/components/App/App.tsx
- [x] T023 [US1] Update App tests for search functionality in src/components/App/App.test.tsx

**Checkpoint**: User Story 1 complete — search, display, no-results, and responsive grid all working. Run `npm run test:ci` to verify.

---

## Phase 4: User Story 2 — Copy an Emoji to Clipboard (Priority: P2)

**Goal**: Users can click on an emoji character or a "Copy" button to copy it to their clipboard, with a "Copied!" toast confirmation

**Independent Test**: Click an emoji tile or its "Copy" button and verify the emoji is copied to clipboard; verify "Copied!" toast appears and fades after 1-2 seconds; verify error message when clipboard is unavailable

### Implementation for User Story 2

- [x] T024 [P] [US2] Create CopyToast component with types in src/components/CopyToast/CopyToast.tsx and src/components/CopyToast/CopyToast.types.ts (positioned near clicked emoji, fades after 1.5s)
- [x] T025 [P] [US2] Create CopyToast barrel export in src/components/CopyToast/index.ts
- [x] T026 [US2] Create CopyToast tests in src/components/CopyToast/CopyToast.test.tsx
- [x] T027 [US2] Update EmojiCard to add "Copy" text button and onClick handler using useCopyToClipboard; display error message on clipboard failure (FR-007) in src/components/EmojiCard/EmojiCard.tsx
- [x] T028 [US2] Update EmojiCard tests for copy-on-click, copy button, and clipboard error handling in src/components/EmojiCard/EmojiCard.test.tsx
- [x] T029 [US2] Integrate CopyToast into App component with toast state management in src/components/App/App.tsx
- [x] T030 [US2] Update App tests for copy + toast integration in src/components/App/App.test.tsx

**Checkpoint**: User Story 2 complete — click-to-copy and "Copy" button both work, toast appears and fades. Run `npm run test:ci` to verify.

---

## Phase 5: User Story 3 — Browse Emoji by Category (Priority: P3)

**Goal**: Users can filter emoji by category using a navigation bar; category filter combines with keyword search

**Independent Test**: Select "Animals & Nature" category and verify only those emoji display; select "All" to restore full list; combine category filter with search keyword and verify both filters apply

### Implementation for User Story 3

- [x] T031 [P] [US3] Create CategoryBar component with types in src/components/CategoryBar/CategoryBar.tsx and src/components/CategoryBar/CategoryBar.types.ts (horizontally scrollable on mobile, "All" + category buttons)
- [x] T032 [P] [US3] Create CategoryBar barrel export in src/components/CategoryBar/index.ts
- [x] T033 [US3] Create CategoryBar tests in src/components/CategoryBar/CategoryBar.test.tsx
- [x] T034 [US3] Integrate CategoryBar into App component with selectedCategory state in src/components/App/App.tsx
- [x] T035 [US3] Update App tests for category filtering and combined search+category in src/components/App/App.test.tsx

**Checkpoint**: User Story 3 complete — category browsing works independently and combined with search. Run `npm run test:ci` to verify.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsiveness, keyboard navigation, and final quality gates

- [x] T036 [P] Add ARIA labels and roles to all interactive components (SearchBar, CategoryBar, EmojiCard, CopyToast) across src/components/
- [x] T037 [P] Add TSDoc comments to all exported hooks, data adapter functions, and component props in src/hooks/, src/data/, and src/types/
- [x] T038 Verify responsive layout: sticky search, fluid grid columns (8-10 desktop, 5-6 mobile), scrollable category bar on mobile across src/components/
- [x] T039 Update page title and meta description in index.html
- [x] T040 Run all quality gates: `npm run lint`, `npm run lint:tsc`, `npm run test:ci`
- [x] T041 Verify quickstart.md steps work end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on T002, T003 (types + data adapter)
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion (hooks ready)
- **User Story 2 (Phase 4)**: Depends on Phase 3 (needs EmojiCard from US1)
- **User Story 3 (Phase 5)**: Depends on Phase 2 completion (hooks ready); can run in parallel with US2
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 — no dependencies on other stories
- **User Story 2 (P2)**: Depends on US1 (extends EmojiCard with copy functionality)
- **User Story 3 (P3)**: Can start after Phase 2 — independent of US1 and US2 (but integrates into App alongside them)

### Within Each User Story

- Components and types can be created in parallel [P]
- Tests follow their component implementation
- App integration is the final step in each story phase

### Parallel Opportunities

- T002 + T003 can run in parallel (types + data adapter are independent files)
- T005/T006 + T007/T008 can run in parallel (two independent hooks)
- T009/T010 + T012/T013 + T015/T016 + T018/T019 can all run in parallel (independent components)
- T024/T025 can run in parallel with T027 prep work
- T031/T032 can start as soon as Phase 2 is done (parallel with US2)

---

## Parallel Example: User Story 1

```text
# Launch all component scaffolds in parallel:
Task T009: "Create SearchBar component in src/components/SearchBar/SearchBar.tsx"
Task T012: "Create NoResults component in src/components/NoResults/NoResults.tsx"
Task T015: "Create EmojiCard component in src/components/EmojiCard/EmojiCard.tsx"
Task T018: "Create EmojiGrid component in src/components/EmojiGrid/EmojiGrid.tsx"

# Then tests (each depends on its component):
Task T011: "SearchBar tests"
Task T014: "NoResults tests"
Task T017: "EmojiCard tests"
Task T020: "EmojiGrid tests"

# Then keyboard navigation:
Task T021: "Add keyboard nav to EmojiGrid and EmojiCard"

# Finally, integration:
Task T022: "Update App to integrate all US1 components"
Task T023: "Update App tests"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational hooks (T005-T008)
3. Complete Phase 3: User Story 1 — Search (T009-T023)
4. **STOP and VALIDATE**: Run `npm run test:ci` — search works, grid displays, responsive layout
5. Deploy/demo if ready — users can already search and browse emoji

### Incremental Delivery

1. Setup + Foundational → Data layer and hooks ready
2. Add User Story 1 → Search + grid display → Deploy (MVP!)
3. Add User Story 2 → Click-to-copy + toast → Deploy
4. Add User Story 3 → Category browsing → Deploy
5. Polish → Accessibility, keyboard nav, final QA → Deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- 100% test coverage required (Constitution III) — every component and hook needs tests
- Commit after each task or logical group using conventional commits
- Stop at any checkpoint to validate story independently
- Run `npm run lint && npm run lint:tsc && npm run test:ci` at each checkpoint
