import type { Todo } from './todoReducer'
import { readTodos, writeTodos } from './localStorage'

export interface PersistenceAdapter {
  read(): Todo[]
  write(todos: Todo[]): void
}

export const localStorageAdapter: PersistenceAdapter = {
  read: readTodos,
  write: writeTodos,
}

export function inMemoryAdapter(initial: Todo[] = []): PersistenceAdapter {
  let data = initial
  return {
    read: () => data,
    write: (todos) => {
      data = todos
    },
  }
}
