import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Project from './Project';
import StyledDashboard from './styles/StyledDashbaord';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        baseURL: 'http://localhost:4000',
        url: '/users/current/projects',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.status === 200) {
        const { data } = response;
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <StyledDashboard>
      <div className="projects-list">
        {projects.map((project) => (
          <Project
            key={project._id}
            id={project._id}
            name={project.name}
            tasks={project.tasks}
            getProjects={getProjects}
          />
        ))}
      </div>
      <div className="new-project-box">
        <div style={{ width: '300px', background: '#ccc' }}>Add project</div>
      </div>
    </StyledDashboard>
  );
};

export default Dashboard;
