import React, { useState } from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'
import { setErrorMsg, setSuccessMsg } from '../reducers/notificationsReducer'
import { login } from '../reducers/userReducer'

import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login({ username, password })
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.setErrorMsg('Wrong credentials')
      setTimeout(() => {
        props.setErrorMsg(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={props.errorMsg} type="error"></Notification>
      <Notification message={props.successMsg} type="success"></Notification>
      <form onSubmit={handleLogin}>
        <div>
            username
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" id="login-button">login</Button>
      </form>

    </div>
  )
}

export default connect(state => ({
  setUser: state.setUser,
  errorMsg: state.notification.errorMsg,
  successMsg: state.notification.successMsg
}), {
  setSuccessMsg,
  setErrorMsg,
  login
})(Login)