import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { AppBar, IconButton, Toolbar, Button } from '@material-ui/core'
const Navigation = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
        blogs
        </Button>
        <Button color="inherit"component={Link} to="/users">
        users
        </Button>
        <Button color="inherit">
          <span>
            {props.user.username} logged in
            <span onClick={props.logout}>logout</span>
          </span>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default connect((state) => ({
  user: state.user }), { logout })(Navigation)