import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  TableCell,
  TableRow,
} from '@material-ui/core'

const Blog = ({ blog }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  return (
    <TableRow className="blog">
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </TableCell>
    </TableRow>
  )
}
Blog.propTypes = {
  handleRemoveBlog: PropTypes.func.isRequired,
  handleLikes: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}
export default Blog