import React, { useState, useEffect } from 'react';
import Project from './Project';
import ProjectAPI from '../api/ProjectAPI';

import StyledDashboard from './styles/StyledDashbaord';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const token = localStorage.getItem('token');
      const userProjects = await ProjectAPI.getUserProjects({ token });
      userProjects && setProjects(userProjects);
    };
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
            setProjects={setProjects}
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
