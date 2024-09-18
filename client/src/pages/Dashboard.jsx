import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    }
    catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      const statusCode = error.response?.data?.statusCode || 500;
      console.error('Error fetching projects:', error);
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

  const deleteProject = async (id) => {
    try {
      !confirm('Are you sure you want to delete this project?')
        ? null
        : await api.delete(`/projects/${id}`);

      fetchProjects();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      const statusCode = error.response?.data?.statusCode || 500;
      console.error('Error deleting project:', error);

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
    <div>
      <h1>Your Projects</h1>
      <Link to="/project/new">Create New Project</Link>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/project/${project._id}`} > {project.name} </Link>
            <Link to={`/project/${project._id}/edit`}>
              <button style={{ cursor: 'pointer' }}>Edit Info</button>
            </Link>
            <button onClick={() => deleteProject(project._id)}> Delete </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;