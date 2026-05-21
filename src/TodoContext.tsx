import { useReducer, useEffect, type ReactNode } from 'react'
import type { AppState } from './appReducer'
import { appReducer } from './appReducer'
import { TodoCtx } from './useTodos'
import { localStorageAdapter, type PersistenceAdapter } from './persistence'

interface TodoProviderProps {
  children: ReactNode
  persist?: PersistenceAdapter
}

export function TodoProvider({ children, persist = localStorageAdapter }: TodoProviderProps) {
  const [state, dispatch] = useReducer(appReducer, persist, (p) => {
    const todos = p.read()
    const filter: AppState['filter'] = 'all'
    return { todos, filter }
  })

  useEffect(() => {
    persist.write(state.todos)
  }, [state.todos, persist])

  return (
    <TodoCtx.Provider value={{ state, dispatch }}>
      {children}
    </TodoCtx.Provider>
  )
}
