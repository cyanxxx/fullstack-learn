import anecdoteService from '../service/anecdote'
const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTE':
      const anecdotes = action.data.anecdotes
      return anecdotes
    case 'ADD_VOTE':
      const id = action.data.id
      return state.map(vote => vote.id === id? ({...vote, votes: vote.votes + 1}) : vote)
    case 'ADD_ANECDOTE':
      const content = action.data.content
      return [...state, content]

    default: return state
  }


  return state
}

export const addVote = (anecdote) => async (dispatch) => {
  await anecdoteService.update(anecdote)
  return dispatch({
    type: 'ADD_VOTE',
    data: { id: anecdote.id }
  })
}

export const addAnecdote = (content) => async (dispatch) => {
  const data = await anecdoteService.createNew(content)
  return dispatch({
    type: 'ADD_ANECDOTE',
    data: { content: data }
  })
}

export const initAnecdote = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  return dispatch({
    type: 'INIT_ANECDOTE',
    data: { anecdotes }
  })
}

export default reducer