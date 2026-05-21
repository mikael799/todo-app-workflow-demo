# Todo App — Workflow Demo

## Problem Statement

A simple, well-tested todo app is needed to serve as a demonstration project for agent-driven software engineering workflows. The app itself is not the goal — it is the vehicle for exercising a repeatable process (ADR documentation, domain glossary, issue-driven development, TDD, PR workflows). The finished codebase lives as a public GitHub repository documenting this process.

## Solution

A single-page todo application built with Vite + React, persisted to localStorage, styled with Tailwind, and tested at both the unit (Vitest + React Testing Library) and E2E (Playwright) layers.

The application supports creating todos, toggling completion, deleting, filtering by status (all / active / completed), and clearing completed todos.

## User Stories

1. As a user, I want to enter a title and create a new todo, so that I can record something I need to do.
2. As a user, I want to see a list of all my todos, so that I can review what needs to be done.
3. As a user, I want to mark a todo as completed, so that I can track my progress.
4. As a user, I want to unmark a completed todo, so that I can correct a mistake.
5. As a user, I want to delete a todo, so that I can remove things I no longer need to track.
6. As a user, I want to filter my todos by all / active / completed, so that I can focus on what's relevant.
7. As a user, I want to clear all completed todos at once, so that I can clean up my list in one action.
8. As a user, I want my todos to survive page reloads, so that I don't lose my data when I close the browser.
9. As a user, I want to see a clean, visually clear interface, so that I can quickly understand the state of my tasks.

## Implementation Decisions

### Module Architecture

The application is divided into seven modules:

- **todoReducer** — a pure function `(Todo[], Action) => Todo[]` that handles state transitions. Actions: `ADD_TODO`, `TOGGLE_TODO`, `DELETE_TODO`, `CLEAR_COMPLETED`, `SET_FILTER`. A deep module: encapsulates all business logic with no imports from React, the browser, or persistence.
- **localStorage adapter** — thin `readTodos()` / `writeTodos(todos)` wrappers around `JSON.parse` / `JSON.stringify`. The baseline filter state (`all`) is returned when no persisted state exists.
- **TodoContext** — React Context provider that initialises state from localStorage, wires the reducer, persists on every state change via `useEffect`, and exposes `{ todos, dispatch, filter, setFilter }` via a `useTodos()` hook.
- **TodoInput** — a form with a text input and submit button. Dispatches `ADD_TODO` on submit. Disables submission on empty input.
- **TodoList** — maps the filtered todo array to TodoItem components. Shows an empty-state message when no todos match the current filter.
- **TodoItem** — a row with a checkbox (toggles completion), the title (with strikethrough when completed), and a delete button.
- **FilterBar** — three toggle buttons: All, Active, Completed. Dispatches `SET_FILTER`. The active filter is visually highlighted.

### Data Flow

1. On mount, `TodoContext` calls `readTodos()` to hydrate initial state from localStorage (defaults to empty array, filter `all`).
2. User interactions dispatch actions through the reducer.
3. A `useEffect` in `TodoContext` persists todos to localStorage on every state change (debouncing is unnecessary at this scale).
4. The `FilterBar` sets a `filter` value that `TodoList` uses to derive the visible subset without mutating the source array.

### Tech Stack

- **Build tool**: Vite
- **UI library**: React 18+
- **Styling**: Tailwind CSS
- **Package manager**: npm
- **Language**: TypeScript

### Todo Shape

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string; // ISO 8601
}
```

### Development Process

Each feature is delivered as a separate GitHub issue implemented via a feature branch and pull request. The implementation follows TDD: write a failing test, implement the feature, refactor, then add a Playwright E2E test for the user flow.

## Testing Decisions

### Philosophy

Tests verify external behaviour, not implementation details. A passing test suite should give confidence that the app works in a browser — not that specific functions were called or specific internal state values were set. Tests that break on refactor but preserve behaviour are brittle and should be avoided.

### Test Layers

- **todoReducer** — pure unit tests. No mocking, no rendering, no setup. One `describe` per action, each test asserts the state diff. These are the fastest and most valuable tests in the suite.
- **TodoContext** — render the provider with a test component, verify children receive the correct initial state and that dispatching actions updates state. Mock `localStorage` to control initial conditions.
- **TodoInput** — RTL: type in the input, submit, verify the dispatch was called with the correct action. Edge case: empty input should not dispatch.
- **TodoList / TodoItem** — RTL: render with a known todo array, verify correct items appear, check that completed items show strikethrough. Verify empty state renders.
- **FilterBar** — RTL: click a filter button, verify the correct filter action was dispatched. Verify the active filter is highlighted.
- **localStorage adapter** — unit: write then read, verify round-trip. Edge case: corrupt data returns default state.
- **E2E (Playwright)** — per feature, a full browser flow: navigate, interact, assert DOM state. One spec file per user story.

### Prior Art

No existing tests exist in this codebase. The patterns above follow standard React Testing Library and Playwright conventions for component and E2E testing.

## Out of Scope

- Authentication or user accounts
- Backend API or database
- Editing a todo's title after creation
- Drag-and-drop reordering
- Due dates, priorities, tags, subtasks
- Mobile responsiveness beyond basic Tailwind defaults
- Storybook or visual regression tests
- CI/CD pipeline configuration
- Deployment

## Further Notes

This PRD was produced by the `to-prd` agent skill as part of a workflow demonstration. The companion `CONTEXT.md` at the repo root defines the project's domain glossary and should be consulted for term definitions.
