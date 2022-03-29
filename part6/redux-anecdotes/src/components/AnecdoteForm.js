import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({addAnecdote}) => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.anecdote.value
    // dispatch(addAnecdote(value))
    addAnecdote(value)
    e.target.anecdote.value = ''
    dispatch(setNotification(`You create '${value}'`, 5000))
    // dispatch(setNotification("", 5000))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(undefined, {addAnecdote})(AnecdoteForm)