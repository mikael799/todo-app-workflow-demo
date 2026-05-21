export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export type Action =
  | { type: 'ADD_TODO'; title: string }

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
    default:
      return todos
  }
}
