import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

const changeInputHandler = (e) => {
  setUserData(prevState => {
    return {...prevState, [e.target.name]: e.target.value}
  })
}
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form">
          <p className="form__error-message">Error</p>
          <input type="email" placeholder="Enter Your Email Address" name="email" value={userData.email} onChange={changeInputHandler} autoFocus />
          <input type="password" placeholder="Enter Your Password" name="password" value={userData.password} onChange={changeInputHandler} />
          <button type="submit" className="btn primary">Login</button>
          <small>Don't Have an Account? <Link to="/register" >Sign Up</Link> </small>
        </form>
      </div>
    </section>
  )
}

export default Login