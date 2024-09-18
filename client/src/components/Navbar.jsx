import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const location = useLocation();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user && location.pathname !== '/dashboard' ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : null}

      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;