import { TodoProvider } from './TodoContext'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'

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
