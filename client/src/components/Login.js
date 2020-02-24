import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = props => {
  const apiAuthUrl = 'http://localhost:5000/api/login'

  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  })
  const [bannerMessage, setBannerMessage] = useState(
    'Enter Your Username and Password',
  )

  const handleChange = e => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = event => {
    event.preventDefault()

    axios
      .post(apiAuthUrl, userCredentials)
      .then(result => {
        console.log(result)
        setBannerMessage('Enter Your Username and Password')
        localStorage.setItem('token', result.data.payload)
        props.history.push('/bubbles')
      })
      .catch(err => {
        console.log(err)
        setBannerMessage(
          'You Entered an Incorrect Username or Password, Please Try Again',
        )
      })
  }

  return (
    <>
      {localStorage.getItem('token') ? (
        <Redirect to="/bubbles" />
      ) : (
        <>
          <section className="LoginBox">
            <article className="LoginCard">
              <h2>Login Page</h2>
              <p>{bannerMessage}</p>
              <form onSubmit={event => handleLogin(event)}>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={userCredentials.username}
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={userCredentials.password}
                />
                <button>Login</button>
              </form>
            </article>
          </section>
        </>
      )}
    </>
  )
}

export default Login
