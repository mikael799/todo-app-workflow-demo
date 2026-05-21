import { describe, it, expect } from 'vitest'
import { appReducer, type AppState } from './appReducer'

const base: AppState = { todos: [], filter: 'all' }

describe('appReducer', () => {
  describe('SET_FILTER', () => {
    it('sets the filter to the given value', () => {
      const state = appReducer(base, { type: 'SET_FILTER', filter: 'active' })
      expect(state.filter).toBe('active')
    })

    it('preserves todos when filter changes', () => {
      const todo = { id: '1', title: 'Test', completed: false, createdAt: '' }
      const state = appReducer(
        { todos: [todo], filter: 'all' },
        { type: 'SET_FILTER', filter: 'completed' },
      )
      expect(state.todos).toHaveLength(1)
      expect(state.todos[0]).toBe(todo)
    })
  })

  it('delegates ADD_TODO to todoReducer', () => {
    const state = appReducer(base, { type: 'ADD_TODO', title: 'Buy milk' })
    expect(state.todos).toHaveLength(1)
    expect(state.todos[0].title).toBe('Buy milk')
    expect(state.filter).toBe('all')
  })

  it('delegates TOGGLE_TODO to todoReducer', () => {
    const state = appReducer(
      { todos: [{ id: '1', title: 'Test', completed: false, createdAt: '' }], filter: 'all' },
      { type: 'TOGGLE_TODO', id: '1' },
    )
    expect(state.todos[0].completed).toBe(true)
  })

  it('delegates DELETE_TODO to todoReducer', () => {
    const state = appReducer(
      { todos: [{ id: '1', title: 'Test', completed: false, createdAt: '' }], filter: 'all' },
      { type: 'DELETE_TODO', id: '1' },
    )
    expect(state.todos).toHaveLength(0)
  })

  it('delegates CLEAR_COMPLETED to todoReducer', () => {
    const state = appReducer(
      {
        todos: [
          { id: '1', title: 'Active', completed: false, createdAt: '' },
          { id: '2', title: 'Done', completed: true, createdAt: '' },
        ],
        filter: 'all',
      },
      { type: 'CLEAR_COMPLETED' },
    )
    expect(state.todos).toHaveLength(1)
  })
})
