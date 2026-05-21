import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { todoReducer, type Todo, type Action } from './todoReducer'
import { readTodos, writeTodos } from './localStorage'

export type Filter = 'all' | 'active' | 'completed'

interface TodoContextValue {
  todos: Todo[]
  dispatch: React.Dispatch<Action>
  filter: Filter
  setFilter: (f: Filter) => void
}

const TodoContext = createContext<TodoContextValue | null>(null)

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, readTodos())
  const [filter, setFilter] = useReducer(
    (_: Filter, next: Filter) => next,
    'all' as Filter,
  )

  useEffect(() => {
    writeTodos(todos)
  }, [todos])

  return (
    <TodoContext.Provider value={{ todos, dispatch, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos(): TodoContextValue {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider')
  return ctx
}
