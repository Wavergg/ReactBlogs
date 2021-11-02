import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>Waver's blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link
          to="/create"
          style={{
            backgroundColor: "pink",
            borderRadius: "0.2em",
          }}
        >
          New Blog
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
