import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER': {
    const data = action.data
    return data
  }
  case 'LOG_OUT': {
    return null
  }
  default: return state
  }
}

export const login = ({ username, password }) => async(dispatch) => {
  const user = await loginService.login({
    username, password,
  })
  window.localStorage.setItem(
    'loggedBlogappUser', JSON.stringify(user)
  )
  blogService.setToken(user.token)
  dispatch({
    type: 'SET_USER',
    data: user,
  })
}

export const setUser = (user) => {
  blogService.setToken(user.token)
  return ({
    type: 'SET_USER',
    data: user,
  })
}

export const logout = () => {
  window.localStorage.clear()
  return ({
    type: 'LOG_OUT',
  })
}


export default reducer