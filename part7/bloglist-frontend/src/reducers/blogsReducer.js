import blogService from '../services/blogs'

const initialState = []
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return action.data
  case 'ADD_BLOG': {
    const newBlog = action.data
    return ([...state, newBlog])
  }

  case 'REMOVE_BLOG':{
    const deleteBlog = action.data
    return state.filter(blog => blog.id !== deleteBlog.id)
  }

  case 'UPDATE_BLOG': {
    const updateBlog = action.data
    return state.map(blog => blog.id !== updateBlog.id? blog : updateBlog)
  }

  case 'ADD_COMMENT': {
    const updateBlog = action.data
    return state.map(blog => blog.id !== updateBlog.id? blog : updateBlog)
  }

  default:
    return state
  }
}

export const setBlogs= (blogs) => {
  return ({
    type: 'SET_BLOGS',
    data: blogs
  })
}

export const addBlog = (blog) => async (dispatch) => {
  const response = await blogService.create(blog)
  const newData = response.data
  dispatch({
    type: 'ADD_BLOG',
    data: newData
  })
}
export const addComment = ({ id, comment }) => async (dispatch) => {
  const response = await blogService.addComment({ id, comment })
  const newData = response.data
  dispatch({
    type: 'ADD_COMMENT',
    data: newData
  })
}
export const deleteBlog = (blog) => async (dispatch) => {
  await blogService.deleteBlog(blog.id)
  dispatch({
    type: 'ADD_BLOG',
    data: blog
  })
}
export const updateBlog = (updateBlog) => async (dispatch) => {
  const updateFormatBlog = {
    user: updateBlog.user.id,
    author: updateBlog.author,
    title:  updateBlog.title,
    url: updateBlog.url
  }
  const response = await blogService.update({ ...updateFormatBlog, likes: updateBlog.likes + 1 }, updateBlog.id)
  const newData = response.data
  dispatch({
    type: 'UPDATE_BLOG',
    data: newData
  })
}

export default reducer