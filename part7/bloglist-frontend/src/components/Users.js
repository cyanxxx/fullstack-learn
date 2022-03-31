import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  TableCell,
  TableRow,
  Table,
  TableBody
} from '@material-ui/core'

const Users = ({ usersBlog }) => {
  const userList = Object.keys(usersBlog).map(userId => ({ user: usersBlog[userId][0].user, blogs: usersBlog[userId] }))
  return (
    <div>
      <h2>Users</h2>
      <Table>
        <TableBody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          {userList.sort((a,b) => b.blogs.length - a.blogs.length).map(userBlog => (
            <TableRow key={userBlog.user.id}>
              <TableCell>
                <Link to={`/users/${userBlog.user.id}`}>{userBlog.user.username}</Link>
              </TableCell>
              <TableCell>{userBlog.blogs.length}</TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </div>
  )
}

export default connect((state) => ({
  usersBlog: state.blogs.reduce((pre, cur) => {
    const userBlog = {
      user: cur.user,
      blogs: cur
    }
    if(pre[userBlog.user.id]){
      pre[userBlog.user.id].push(userBlog)
    }else{
      pre[userBlog.user.id] = [userBlog]
    }
    return pre
  },{})
}))(Users)