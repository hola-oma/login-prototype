import React from "react";
import routes from "./routes";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="headerBar">
    <h1>Login Prototype</h1>
    <ul className="nav">
      {routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default Header;