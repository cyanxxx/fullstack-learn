import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleChange = (action) => (e) => {
    const value = e.target.value
    action(value)
  }

  const handleAddBlog = async (blog) => {
    try {
      const response = await blogService.create(blog)
      setSuccessMsg('Add new a Blog')
      const newData = response.data
      setBlogs([...blogs, newData])
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemoveBlog = async (deleteBlog) => {
    try {
      if(window.confirm(`Remove blog ${deleteBlog.title}`)){
        await blogService.deleteBlog(deleteBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
      }
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikes = async (updateBlog) => {
    const updateFormatBlog = {
      user: updateBlog.user.id,
      author: updateBlog.author,
      title:  updateBlog.title,
      url: updateBlog.url
    }
    const response = await blogService.update({ ...updateFormatBlog, likes: updateBlog.likes + 1 }, updateBlog.id)
    setBlogs(blogs.map(blog => blog.id !== updateBlog.id? blog : response.data))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type="error"></Notification>
        <Notification message={successMsg} type="success"></Notification>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>

      </div>
    )
  }else{
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} type="error"></Notification>
        <Notification message={successMsg} type="success"></Notification>
        <p>
          {user.username} logged in
          <button onClick={handleLoginOut}>logout</button>
        </p>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm handleChange={handleChange}
            handleAddBlog={handleAddBlog}
          ></BlogForm>
        </Togglable>

        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            handleRemoveBlog={handleRemoveBlog}/>
        )}
      </div>
    )
  }
}

export default App