import React from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({anecdotes, addVote}) => {
  // const anecdotes = useSelector(({filter, anecdote}) => anecdote.filter(a => a.content.indexOf(filter) > -1))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    // dispatch(addVote(anecdote))
    dispatch(setNotification(`You vote '${anecdote.content}'`, 5000))
    // dispatch(setNotification(""), 5000)
    addVote(anecdote)
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
const mapStateToProps = (state) => {
  return ({
    anecdotes: state.anecdote,
  })
}

export default connect(mapStateToProps, {
  addVote
})(AnecdoteList)