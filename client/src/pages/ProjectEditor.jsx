import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import api from '../services/api';

const ProjectEditor = () => {
  const [project, setProject] = useState({ name: '', description: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      const { name, description, content } = response.data; // Destructure the data
      setProject({ name, description, content });
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      const statusCode = error.statusCode || 500;
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
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project details');
    }
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            placeholder="Enter project name"
          // required
          />
        </div>
        <div>
          <label htmlFor="description">Project Description:</label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Enter project description"
          // required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProjectEditor;
