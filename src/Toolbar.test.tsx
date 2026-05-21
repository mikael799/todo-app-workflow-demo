import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoProvider } from './TodoContext'
import { Toolbar } from './Toolbar'
import { inMemoryAdapter } from './persistence'
import type { Todo } from './todoReducer'

function completedFixture(): Todo[] {
  return [
    { id: '1', title: 'Active', completed: false, createdAt: '2025-01-01' },
    { id: '2', title: 'Done', completed: true, createdAt: '2025-01-02' },
  ]
}

describe('Toolbar', () => {
  it('renders three filter buttons', () => {
    render(
      <TodoProvider>
        <Toolbar />
      </TodoProvider>,
    )
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument()
  })

  it('highlights the active filter button', () => {
    render(
      <TodoProvider>
        <Toolbar />
      </TodoProvider>,
    )
    expect(screen.getByRole('button', { name: /all/i })).toHaveClass('font-bold')
  })

  it('switches filter when a filter button is clicked', async () => {
    render(
      <TodoProvider>
        <Toolbar />
      </TodoProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: /completed/i }))
    expect(screen.getByRole('button', { name: /completed/i })).toHaveClass('font-bold')
    expect(screen.getByRole('button', { name: /all/i })).not.toHaveClass('font-bold')
  })

  it('shows clear completed button only when there are completed todos', () => {
    render(
      <TodoProvider persist={inMemoryAdapter(completedFixture())}>
        <Toolbar />
      </TodoProvider>,
    )
    expect(screen.getByRole('button', { name: /clear completed/i })).toBeInTheDocument()
  })

  it('hides clear completed button when no completed todos', () => {
    render(
      <TodoProvider>
        <Toolbar />
      </TodoProvider>,
    )
    expect(screen.queryByRole('button', { name: /clear completed/i })).not.toBeInTheDocument()
  })

  it('removes completed todos when clear completed is clicked', async () => {
    render(
      <TodoProvider persist={inMemoryAdapter(completedFixture())}>
        <Toolbar />
      </TodoProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: /clear completed/i }))
    expect(screen.queryByRole('button', { name: /clear completed/i })).not.toBeInTheDocument()
  })
})
