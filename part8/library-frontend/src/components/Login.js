import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
          console.error(error.graphQLErrors[0].message)
        }
      })

      useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          props.setToken(token)
          localStorage.setItem('libraryUser', token)
        }
      }, [result.data]) // eslint-disable-line
    
    if(!props.show)return null
    
    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        login({variables: { username, password }})
        setUsername('')
        setPassword('')
      } catch (exception) {
        // props.setErrorMsg('Wrong credentials')
        // setTimeout(() => {
        //   props.setErrorMsg(null)
        // }, 5000)
      }
    }
    return (
        <form onSubmit={handleLogin}>
        <div>
            name
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    )
}

export default Login