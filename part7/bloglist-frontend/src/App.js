import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './components/Login'
import BlogList from './components/BlogList'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import Container from '@material-ui/core/Container'

const App = (props) => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])
  if (props.user === null) {
    return <Container><Login></Login></Container>
  }else{
    return (
      <Container>
        <Router>
          <BlogList />
        </Router>
      </Container>
    )
  }
}

export default connect((state) => ({ user: state.user }), { setUser })(App)