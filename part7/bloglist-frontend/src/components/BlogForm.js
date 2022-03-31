import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button
} from '@material-ui/core'

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
          <TextField label="title" value={title} onChange={handleChange(setTitle)} id="title"  />
        </div>
        <div>
          <TextField label="author" value={author} onChange={handleChange(setAuthor)} id="author"  />
        </div>
        <div>
          <TextField label="url" value={url} onChange={handleChange(setUrl)} id="url"  margin="normal" />
        </div>
        <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '10px' }}>
          add
        </Button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleAddBlog: PropTypes.func.isRequired,
}
export default BlogForm