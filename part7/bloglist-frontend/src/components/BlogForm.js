import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleChange, handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    handleAddBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create New</h2>
      <form onSubmit={handleSubmit} id="blogForm">
        <div>
                title: <input value={title} onChange={handleChange(setTitle)} id="title" />
        </div>
        <div>author: <input value={author} onChange={handleChange(setAuthor)} id="author" /></div>
        <div>url: <input value={url} onChange={handleChange(setUrl)} id="url" /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleAddBlog: PropTypes.func.isRequired,
}
export default BlogForm