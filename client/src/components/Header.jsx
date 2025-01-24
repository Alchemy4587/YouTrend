import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"

import { UserContext } from '../context/userContext'

const Header = () => {
  const [isNavShowing,setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const {currentUser} = useContext(UserContext)
  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true)
    }
  }

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='nav__logo' onClick={closeNavHandler}>
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {currentUser?.id && isNavShowing &&<ul className="nav__menu">
          <li><Link to = {`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser?.name}</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul>}
        {!currentUser?.id && isNavShowing &&<ul className="nav__menu">
          <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
          <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
        </ul>}
        <button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
        </button>
      </div>
    </nav>
  )
}

export default Header