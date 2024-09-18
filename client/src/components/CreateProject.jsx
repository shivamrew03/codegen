import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description , setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects', { name, description });
      navigate(`/project/${response.data._id}`, { replace: true }); //Redirecting ProjectPage.jsx

    } catch (error) {
      console.error('Error creating project:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      alert(`Error creating project: ${errorMessage}`);
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Descrioption"
          required
        />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
