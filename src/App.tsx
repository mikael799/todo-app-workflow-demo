import { TodoProvider, useTodos } from './TodoContext'
import { TodoInput } from './TodoInput'

function TodoList() {
  const { todos } = useTodos()
  if (todos.length === 0) {
    return <p className="text-gray-500 mt-4">No todos yet</p>
  }
  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="border rounded p-2">
          {todo.title}
        </li>
      ))}
    </ul>
  )
}

function App() {
  return (
    <TodoProvider>
      <div className="mx-auto max-w-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Todos</h1>
        <TodoInput />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default App
