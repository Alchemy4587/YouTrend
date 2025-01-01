import { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

const changeInputHandler = (e) => {
  setUserData(prevState => {
    return {...prevState, [e.target.name]: e.target.value}
  })
}
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form">
          <p className="form__error-message">Error</p>
          <input type="text" placeholder="Enter Your Full Name" name="name" value={userData.name} onChange={changeInputHandler} />
          <input type="email" placeholder="Enter Your Email Address" name="email" value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder="Enter Your Password" name="password" value={userData.password} onChange={changeInputHandler} />
          <input type="password" placeholder="Confirm Your Password" name="password2" value={userData.password2} onChange={changeInputHandler} />
          <button type="submit" className="btn primary">Register</button>
          <small>Already Have an Account? <Link to="/login" >Sign In</Link> </small>
        </form>
      </div>
    </section>
  )
}

export default Register