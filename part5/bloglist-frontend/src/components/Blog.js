import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleRemoveBlog, handleLikes }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(detailVisible) {
    return (
      <div style={blogStyle} className="blog">
        <div>
          <span>{blog.title}</span>
          <button onClick={() => setDetailVisible(!detailVisible)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button className="like" onClick={() => handleLikes(blog)}>like</button>
        </div>
        <div>
          {blog.author}
          <button className="remove" onClick={() => handleRemoveBlog(blog)}>remove</button>
        </div>
      </div>
    )
  }else{
    return (
      <div style={blogStyle} className="blog">
        <span>{blog.title} {blog.author}</span>
        <button onClick={() => setDetailVisible(!detailVisible)}>view</button>
      </div>
    )
  }
}
Blog.propTypes = {
  handleRemoveBlog: PropTypes.func.isRequired,
  handleLikes: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}
export default Blog