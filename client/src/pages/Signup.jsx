import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { validatePassword } from '../services/validatePassword';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      alert(passwordError);
      return;
    }
    try {
      const response = await signup(username, password);
      navigate('/login', { replace: true });
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      const statusCode = error.statusCode || 500;
      console.log("sign Up error: ", error);
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
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
        onChange={handlePasswordChange}
        placeholder="Password"
        required
      />
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <button type="submit" disabled={!!passwordError}>Sign Up</button>
    </form>
  );
};

export default Signup;
