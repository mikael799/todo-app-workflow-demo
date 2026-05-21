import type { Todo } from './todoReducer'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
}

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2 border rounded p-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4"
      />
      <span className={todo.completed ? 'line-through text-gray-500' : ''}>
        {todo.title}
      </span>
    </div>
  )
}
