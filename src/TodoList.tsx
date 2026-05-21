import { useTodos } from './useTodos'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const { state, dispatch } = useTodos()
  const { todos, filter } = state

  const filtered = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (todos.length === 0) {
    return <p className="text-gray-500 mt-4">No todos yet</p>
  }

  if (filtered.length === 0) {
    return <p className="text-gray-500 mt-4">No matching todos</p>
  }

  return (
    <ul className="mt-4 space-y-2">
      {filtered.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={(id) => dispatch({ type: 'TOGGLE_TODO', id })}
            onDelete={(id) => dispatch({ type: 'DELETE_TODO', id })}
          />
        </li>
      ))}
    </ul>
  )
}
