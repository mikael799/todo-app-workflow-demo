import { createContext, useContext } from 'react'
import type { AppState, AppAction } from './appReducer'

export interface TodoCtxValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

export const TodoCtx = createContext<TodoCtxValue | null>(null)

export function useTodos(): TodoCtxValue {
  const ctx = useContext(TodoCtx)
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider')
  return ctx
}
