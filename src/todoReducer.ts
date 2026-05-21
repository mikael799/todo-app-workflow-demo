export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'TOGGLE_TODO'; id: string }

export function todoReducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...todos,
        {
          id: crypto.randomUUID(),
          title: action.title,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]
    case 'TOGGLE_TODO':
      return todos.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t,
      )
    default:
      return todos
  }
}
