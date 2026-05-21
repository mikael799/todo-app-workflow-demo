import { describe, it, expect } from 'vitest'
import { todoReducer, type Todo } from './todoReducer'

describe('todoReducer', () => {
  it('ADD_TODO adds a new todo with the given title', () => {
    const state = todoReducer([], { type: 'ADD_TODO', title: 'Buy milk' })
    expect(state).toHaveLength(1)
    expect(state[0].title).toBe('Buy milk')
    expect(state[0].completed).toBe(false)
    expect(typeof state[0].id).toBe('string')
    expect(typeof state[0].createdAt).toBe('string')
  })

  it('ADD_TODO appends to existing todos', () => {
    const existing: Todo[] = [
      { id: '1', title: 'First', completed: false, createdAt: '2025-01-01' },
    ]
    const state = todoReducer(existing, { type: 'ADD_TODO', title: 'Second' })
    expect(state).toHaveLength(2)
    expect(state[0].title).toBe('First')
    expect(state[1].title).toBe('Second')
  })

  it('TOGGLE_TODO flips the completed flag for the given id', () => {
    const existing: Todo[] = [
      { id: '1', title: 'Buy milk', completed: false, createdAt: '2025-01-01' },
    ]
    const state = todoReducer(existing, { type: 'TOGGLE_TODO', id: '1' })
    expect(state[0].completed).toBe(true)
  })

  it('TOGGLE_TODO with unknown id is a no-op', () => {
    const existing: Todo[] = [
      { id: '1', title: 'Buy milk', completed: false, createdAt: '2025-01-01' },
    ]
    const state = todoReducer(existing, { type: 'TOGGLE_TODO', id: '999' })
    expect(state).toHaveLength(1)
    expect(state[0].completed).toBe(false)
  })

  it('DELETE_TODO removes the todo with the given id', () => {
    const existing: Todo[] = [
      { id: '1', title: 'First', completed: false, createdAt: '2025-01-01' },
      { id: '2', title: 'Second', completed: false, createdAt: '2025-01-02' },
    ]
    const state = todoReducer(existing, { type: 'DELETE_TODO', id: '1' })
    expect(state).toHaveLength(1)
    expect(state[0].id).toBe('2')
  })

  it('DELETE_TODO with unknown id is a no-op', () => {
    const existing: Todo[] = [
      { id: '1', title: 'First', completed: false, createdAt: '2025-01-01' },
    ]
    const state = todoReducer(existing, { type: 'DELETE_TODO', id: '999' })
    expect(state).toHaveLength(1)
  })

  it('DELETE_TODO on an empty list does nothing', () => {
    const state = todoReducer([], { type: 'DELETE_TODO', id: '1' })
    expect(state).toHaveLength(0)
  })

  it('CLEAR_COMPLETED removes all completed todos', () => {
    const existing: Todo[] = [
      { id: '1', title: 'Active', completed: false, createdAt: '2025-01-01' },
      { id: '2', title: 'Done', completed: true, createdAt: '2025-01-02' },
      { id: '3', title: 'Also done', completed: true, createdAt: '2025-01-03' },
    ]
    const state = todoReducer(existing, { type: 'CLEAR_COMPLETED' })
    expect(state).toHaveLength(1)
    expect(state[0].id).toBe('1')
  })

  it('CLEAR_COMPLETED with no completed todos is a no-op', () => {
    const existing: Todo[] = [
      { id: '1', title: 'Active', completed: false, createdAt: '2025-01-01' },
    ]
    const state = todoReducer(existing, { type: 'CLEAR_COMPLETED' })
    expect(state).toHaveLength(1)
  })
})
