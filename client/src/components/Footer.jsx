import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to="/post/categories/:category/Agriculture">Agriculture</Link></li>
        <li><Link to="/post/categories/:category/Business">Business</Link></li>
        <li><Link to="/post/categories/:category/Education">Education</Link></li>
        <li><Link to="/post/categories/:category/Entertainment">Entertainment</Link></li>
        <li><Link to="/post/categories/:category/Art">Art</Link></li>
        <li><Link to="/post/categories/:category/Investment">Investment</Link></li>
        <li><Link to="/post/categories/:category/Uncategorized">Uncategorized</Link></li>
        <li><Link to="/post/categories/:category/Weather">Weather</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, ALCHEMY CODES.</small>
      </div>
    </footer>
  )
}

export default Footer