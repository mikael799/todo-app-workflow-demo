import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodoProvider } from './TodoContext'
import { TodoList } from './TodoList'

beforeEach(() => {
  localStorage.clear()
})

describe('TodoList', () => {
  it('renders todos from context', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([
        { id: '1', title: 'Buy milk', completed: false, createdAt: '2025-01-01' },
        { id: '2', title: 'Write code', completed: false, createdAt: '2025-01-02' },
      ]),
    )
    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>,
    )
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Write code')).toBeInTheDocument()
  })

  it('shows empty state when no todos exist', () => {
    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>,
    )
    expect(screen.getByText('No todos yet')).toBeInTheDocument()
  })
})
