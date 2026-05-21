import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoProvider, useTodos } from './TodoContext'
import { inMemoryAdapter } from './persistence'

function TestComponent() {
  const { state, dispatch } = useTodos()
  return (
    <div>
      <span data-testid="filter">{state.filter}</span>
      <span data-testid="count">{state.todos.length}</span>
      <button onClick={() => dispatch({ type: 'ADD_TODO', title: 'New' })}>
        Add
      </button>
    </div>
  )
}

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

  it('hydrates initial state from persistence', () => {
    const adapter = inMemoryAdapter([
      { id: '1', title: 'Saved', completed: false, createdAt: '2025-01-01' },
    ])
    render(
      <TodoProvider persist={adapter}>
        <TestComponent />
      </TodoProvider>,
    )
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('persists todos to persistence after dispatch', async () => {
    const adapter = inMemoryAdapter()
    render(
      <TodoProvider persist={adapter}>
        <TestComponent />
      </TodoProvider>,
    )
    await userEvent.click(screen.getByText('Add'))
    expect(adapter.read()).toHaveLength(1)
    expect(adapter.read()[0].title).toBe('New')
  })
})
