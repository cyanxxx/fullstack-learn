import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const BlogDetail = ({ blog, handleRemoveBlog, handleLikes, addComment }) => {
  const [comment, setComment] = useState('')
  const handleAddComment = async() => {
    await addComment({ id: blog.id, comment })
    setComment('')
  }
  return (
    <div className="blog">
      <div>
        <h3>{blog.title}</h3>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button className="like" onClick={() => handleLikes(blog)}>like</button>
      </div>
      <div>
        added by {blog.author}
        <button className="remove" onClick={() => handleRemoveBlog(blog)}>remove</button>
      </div>
      <div>
        <h3>comments</h3>
        <div>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
          <button onClick={handleAddComment}>add comment</button>
        </div>
        <ul>
          {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default connect(undefined, { addComment })(BlogDetail)