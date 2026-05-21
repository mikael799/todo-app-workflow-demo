import { useState, type FormEvent } from 'react'
import { useTodos } from './TodoContext'

export function TodoInput() {
  const [text, setText] = useState('')
  const { dispatch } = useTodos()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_TODO', title: trimmed })
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2"
      />
    </form>
  )
}
