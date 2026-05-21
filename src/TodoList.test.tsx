import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodoProvider } from './TodoContext'
import { TodoList } from './TodoList'
import { inMemoryAdapter } from './persistence'

describe('TodoList', () => {
  it('renders todos from context', () => {
    render(
      <TodoProvider
        persist={inMemoryAdapter([
          { id: '1', title: 'Buy milk', completed: false, createdAt: '2025-01-01' },
          { id: '2', title: 'Write code', completed: false, createdAt: '2025-01-02' },
        ])}
      >
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
