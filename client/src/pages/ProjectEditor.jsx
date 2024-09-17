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
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/projects/${id}`, project);
      } else {
        await api.post('/projects', project);
      }
      history.push('/dashboard');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={project.name}
        onChange={(e) => setProject({ ...project, name: e.target.value })}
        placeholder="Project Name"
        required
      />
      <textarea
        value={project.content}
        onChange={(e) => setProject({ ...project, content: e.target.value })}
        placeholder="Project Content"
        required
      />
      <button type="submit">Save Project</button>
    </form>
  );
};

export default ProjectEditor;
 