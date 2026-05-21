import { useTodos } from './TodoContext'
import type { Filter } from './appReducer'

const FILTERS: Filter[] = ['all', 'active', 'completed']

export function FilterBar() {
  const { state, dispatch } = useTodos()
  const { todos, filter } = state

  const hasCompleted = todos.some((t) => t.completed)

  return (
    <div className="mt-4 flex items-center gap-2">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: 'SET_FILTER', filter: f })}
          className={filter === f ? 'font-bold' : ''}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
      {hasCompleted && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="ml-auto text-red-500 hover:text-red-700"
        >
          Clear completed
        </button>
      )}
    </div>
  )
}
