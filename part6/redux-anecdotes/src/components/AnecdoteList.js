import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdote}) => anecdote.filter(a => a.content.indexOf(filter) > -1))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You vote '${anecdote.content}'`))
    dispatch(setNotification(""), 5000)
  }

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList