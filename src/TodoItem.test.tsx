import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItem } from './TodoItem'
import type { Todo } from './todoReducer'

const todo: Todo = {
  id: '1',
  title: 'Buy milk',
  completed: false,
  createdAt: '2025-01-01',
}

describe('TodoItem', () => {
  it('renders the todo title and a checkbox', () => {
    render(<TodoItem todo={todo} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('dispatches TOGGLE_TODO with the todo id when checkbox is clicked', async () => {
    const onToggle = vi.fn()
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={vi.fn()} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('shows strikethrough text when todo is completed', () => {
    const completed = { ...todo, completed: true }
    render(<TodoItem todo={completed} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Buy milk')).toHaveClass('line-through')
  })

  it('calls onDelete with the todo id when delete button is clicked', async () => {
    const onDelete = vi.fn()
    render(<TodoItem todo={todo} onToggle={vi.fn()} onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })
})
