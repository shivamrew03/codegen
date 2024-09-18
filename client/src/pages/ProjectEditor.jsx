import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';

const ProjectEditor = () => {
  const [project, setProject] = useState({ name: '', content: '' });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject({ name: data.name, description: data.description, content: data.content });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      const statusCode = error.response?.data?.statusCode || 500;
      console.error('Error fetching project:', error);
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

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/projects/${id}`, project);
      alert('Project details updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project details');
    }
  };

  const handleEditContent = () => {
    history.push(`/project/${id}`); //Redirecting ProjectPage.jsx
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Project Description"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleEditContent}>Edit Content</button>
    </div>
  );
};

export default ProjectEditor;
