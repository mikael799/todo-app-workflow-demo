import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoProvider, useTodos } from './TodoContext'

function TestComponent() {
  const { todos, filter, dispatch } = useTodos()
  return (
    <div>
      <span data-testid="filter">{filter}</span>
      <span data-testid="count">{todos.length}</span>
      <button onClick={() => dispatch({ type: 'ADD_TODO', title: 'New' })}>
        Add
      </button>
    </div>
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('TodoContext', () => {
  it('provides initial state with empty todos and all filter', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>,
    )
    expect(screen.getByTestId('filter')).toHaveTextContent('all')
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('dispatches ADD_TODO and updates the todo list', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>,
    )
    await userEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('hydrates initial state from localStorage', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([
        { id: '1', title: 'Saved', completed: false, createdAt: '2025-01-01' },
      ]),
    )
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>,
    )
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('persists todos to localStorage after dispatch', async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>,
    )
    await userEvent.click(screen.getByText('Add'))
    const stored = JSON.parse(localStorage.getItem('todos')!)
    expect(stored).toHaveLength(1)
    expect(stored[0].title).toBe('New')
  })
})
