import { todoReducer, type Todo, type Action } from './todoReducer'

export type Filter = 'all' | 'active' | 'completed'

export interface AppState {
  todos: Todo[]
  filter: Filter
}

export type AppAction = Action | { type: 'SET_FILTER'; filter: Filter }

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
    default:
      return { ...state, todos: todoReducer(state.todos, action) }
  }
}
