import React, { useEffect, useRef  } from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import {
  Switch, Route, useRouteMatch
} from 'react-router-dom'
import {
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core'

import Notification from './Notification'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Users from './Users'
import User from './User'
import BlogDetail from './BlogDetail'
import Navigation from './Navigation'
import { setBlogs, addBlog, deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { setErrorMsg, setSuccessMsg } from '../reducers/notificationsReducer'

const BlogList = (props) => {
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      props.setBlogs( blogs )
    )
  }, [])

  const handleChange = (action) => (e) => {
    const value = e.target.value
    action(value)
  }

  const handleAddBlog = async (blog) => {
    try {
      await props.addBlog(blog)
      props.setSuccessMsg('Add new a Blog')
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      props.setErrorMsg('Wrong credentials')
    }
  }

  const handleRemoveBlog = async (deleteBlog) => {
    try {
      if(window.confirm(`Remove blog ${deleteBlog.title}`)){
        props.deleteBlog(deleteBlog)
      }
    } catch (exception) {
      props.setErrorMsg('Wrong credentials')
    }
  }

  const handleLikes = async (updateBlog) => {
    props.updateBlog(updateBlog)
  }
  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? props.blogs.find(blog => blog.id === match.params.id)
    : null
  const userMatch = useRouteMatch('/users/:id')
  const userBlog = userMatch
    ? props.usersBlog[userMatch.params.id]
    : null
  return (
    <div>
      <Navigation></Navigation>
      <h2>blog app</h2>
      <Notification message={props.errorMessage} type="error"></Notification>
      <Notification message={props.successMsg} type="success"></Notification>
      <Switch>

        {/* <Route path="/blogs">
          <Blogs></Blogs>
        </Route> */}
        <Route path="/users/:id">
          <User userBlog={ userBlog }></User>
        </Route>
        <Route path="/users">
          <Users></Users>
        </Route>
        <Route path="/blogs/:id">
          <BlogDetail blog={blog} handleRemoveBlog={handleRemoveBlog} handleLikes={handleLikes}></BlogDetail>
        </Route>
        <Route>
          <div>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
              <BlogForm handleChange={handleChange}
                handleAddBlog={handleAddBlog}
              ></BlogForm>
            </Togglable>
            <TableContainer>
              <Table>
                <TableBody>
                  {props.blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      handleLikes={handleLikes}
                      handleRemoveBlog={handleRemoveBlog}/>
                  )}
                </TableBody>
              </Table>
            </TableContainer>


          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default connect((state) => ({
  user: state.user,
  blogs: state.blogs,
  errorMsg: state.notification.errorMsg,
  successMsg: state.notification.successMsg,
  usersBlog: state.blogs.reduce((pre, cur) => {
    if(pre[cur.user.id]){
      pre[cur.user.id].push(cur)
    }else{
      pre[cur.user.id] = [cur]
    }
    return pre
  },{})
}), { logout, setBlogs, addBlog, deleteBlog, updateBlog, setErrorMsg, setSuccessMsg })(BlogList)