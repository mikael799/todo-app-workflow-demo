import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { appReducer, type AppState, type AppAction } from './appReducer'
import { localStorageAdapter, type PersistenceAdapter } from './persistence'

interface TodoContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

interface TodoProviderProps {
  children: ReactNode
  persist?: PersistenceAdapter
}

const TodoContext = createContext<TodoContextValue | null>(null)

export function TodoProvider({ children, persist = localStorageAdapter }: TodoProviderProps) {
  const [state, dispatch] = useReducer(appReducer, persist, (p) => ({
    todos: p.read(),
    filter: 'all',
  }))

  useEffect(() => {
    persist.write(state.todos)
  }, [state.todos, persist])

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
