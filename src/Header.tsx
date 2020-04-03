import React from "react";
import routes from "./routes";
import { Link } from "react-router-dom";

interface IHeader {
  isLoggedIn: boolean;
}

const Header: React.FC<IHeader> = ({ isLoggedIn }) => {
  return (
    <div className="headerBar">
      <h1>Login Prototype</h1>
      <p>Is logged in? {JSON.stringify(isLoggedIn)}</p>
      <ul className="nav">
        {routes.map((route, i) => (
          <li key={i}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
        {isLoggedIn && <li><Link to="/posts">Posts</Link></li>}
      </ul>
    </div>
  );
}

export default Header;