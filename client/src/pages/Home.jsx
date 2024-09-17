import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to CodeGen</h1>
      <p>Generate OOP code structures easily!</p>
      <div>
        <h2>Use Cases:</h2>
        {/* Add use cases for different languages */}
      </div>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;
 