import React from 'react';
import '../style/Header.css'; // Make sure the path to your CSS file is correct
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <div>
          <h1>Govinda Ekabote</h1>
        </div>
        {/* <div>
          <ul>
            <li>
              <NavLink to="/" exact className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
            </li>
            {/* <li>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
            </li> */}
          {/* </ul> */}
        {/* </div> */} 
      </nav>
    </header>
  );
}

export default Header;
