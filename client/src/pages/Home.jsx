import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Welcome to CodeGen</h1>
      <p>Generate OOP code structures easily!</p>
      <div>
        <h2>Use Cases:</h2>
        {/* Add use cases for different languages */}
      </div>
    </div>
  );
};

export default Home;
