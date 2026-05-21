import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { appReducer, type AppState, type AppAction } from './appReducer'
import { readTodos, writeTodos } from './localStorage'

interface TodoContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const TodoContext = createContext<TodoContextValue | null>(null)

function init(): AppState {
  return { todos: readTodos(), filter: 'all' }
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, init)

  useEffect(() => {
    writeTodos(state.todos)
  }, [state.todos])

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos(): TodoContextValue {
  const ctx = useContext(TodoContext)
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider')
  return ctx
}
