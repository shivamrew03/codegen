import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <Link to="/dashboard">Dashboard</Link>
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
 