import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoProvider, useTodos } from './TodoContext'
import { TodoInput } from './TodoInput'

function TestApp() {
  const { todos } = useTodos()
  return (
    <div>
      <TodoInput />
      <span data-testid="count">{todos.length}</span>
    </div>
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('TodoInput', () => {
  it('submits a new todo and adds it to the list', async () => {
    render(
      <TodoProvider>
        <TestApp />
      </TodoProvider>,
    )
    const input = screen.getByPlaceholderText(/what needs to be done/i)
    await userEvent.type(input, 'Buy milk')
    await userEvent.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('does not submit empty input', async () => {
    render(
      <TodoProvider>
        <TestApp />
      </TodoProvider>,
    )
    const input = screen.getByPlaceholderText(/what needs to be done/i)
    await userEvent.type(input, '   ')
    await userEvent.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })
})
