import React from "react";
import { Link } from "react-router-dom";

import './Header.css';

interface IHeader {
  isLoggedIn: boolean;
}

const Header: React.FC<IHeader> = ({ isLoggedIn }) => {
  return (
    <div className="headerBar">
      
      <div className="pullLeft">
        <h2>Login Prototype for Hola Oma</h2>
        <p>Is logged in? {JSON.stringify(isLoggedIn)}</p>
      </div>
      
      <div className="pullRight">
        <ul className="nav">
          <li><Link to="/join">Join</Link></li>
          <li><Link to="/login">Login</Link></li>
          {isLoggedIn && <li><Link to="/posts">Posts</Link></li>}
        </ul>
      </div>

    </div>
  );
}

export default Header;