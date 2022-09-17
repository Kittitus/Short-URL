import React from 'react'
import {Link,useLocation } from "react-router-dom";
const Navbar = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={`nav-item `+(pathname === '/' ? 'active' : '')}>
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className={`nav-item `+(pathname === '/history' ? 'active' : '')}>
                        <Link className="nav-link" to="/History">
                            History
                        </Link>
                    </li>
                </ul>
        </div>
    </nav>
  )
}
export default Navbar
