import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      // history.push('/dashboard'); //gives a option to go back to the previous page
      navigate('/dashboard', { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      const statusCode = error.response?.data?.statusCode || 500;
      console.error("Login error: ", error);
      switch (statusCode) {   
        case 400:
          alert(`Bad Request: ${errorMessage}`);
          break;
        case 401:
          alert(`Unauthorized: ${errorMessage}`);
          break;
        case 404:
          alert(`Not Found: ${errorMessage}`);
          break;
        default:
          alert(`Error: ${errorMessage}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
