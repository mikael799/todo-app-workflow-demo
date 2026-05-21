import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoProvider } from './TodoContext'
import { useTodos } from './useTodos'
import { TodoInput } from './TodoInput'
import { inMemoryAdapter } from './persistence'

function TestApp() {
  const { state } = useTodos()
  return (
    <div>
      <TodoInput />
      <span data-testid="count">{state.todos.length}</span>
    </div>
  )
}

describe('TodoInput', () => {
  it('submits a new todo and adds it to the list', async () => {
    const adapter = inMemoryAdapter()
    render(
      <TodoProvider persist={adapter}>
        <TestApp />
      </TodoProvider>,
    )
    const input = screen.getByPlaceholderText(/what needs to be done/i)
    await userEvent.type(input, 'Buy milk')
    await userEvent.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('does not submit empty input', async () => {
    const adapter = inMemoryAdapter()
    render(
      <TodoProvider persist={adapter}>
        <TestApp />
      </TodoProvider>,
    )
    const input = screen.getByPlaceholderText(/what needs to be done/i)
    await userEvent.type(input, '   ')
    await userEvent.keyboard('{Enter}')
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })
})
