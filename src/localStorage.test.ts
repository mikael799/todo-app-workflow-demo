import { describe, it, expect, beforeEach } from 'vitest'
import { readTodos, writeTodos } from './localStorage'
import type { Todo } from './todoReducer'

beforeEach(() => {
  localStorage.clear()
})

describe('localStorage adapter', () => {
  it('readTodos returns empty array when no data exists', () => {
    expect(readTodos()).toEqual([])
  })

  it('writeTodos then readTodos round-trips correctly', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Test', completed: false, createdAt: '2025-01-01' },
    ]
    writeTodos(todos)
    expect(readTodos()).toEqual(todos)
  })

  it('readTodos returns empty array for corrupt data', () => {
    localStorage.setItem('todos', 'not-valid-json')
    expect(readTodos()).toEqual([])
  })

  it('readTodos returns empty array for non-array JSON', () => {
    localStorage.setItem('todos', JSON.stringify({ not: 'an array' }))
    expect(readTodos()).toEqual([])
  })
})
