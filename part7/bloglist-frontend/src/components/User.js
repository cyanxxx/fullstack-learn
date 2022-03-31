import React from 'react'

const User = ({ userBlog }) => {
  return (
    <div>
      <h2>{userBlog[0].user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlog.map(blog => (<li key={blog.id}>
          {blog.title}
        </li>)) }
      </ul>
    </div>
  )
}

export default User