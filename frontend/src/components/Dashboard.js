import React, { useState, useEffect } from 'react';
import Project from './Project/Project';
import CreateProject from './Project/CreateProject';
import ProjectAPI from '../api/ProjectAPI';

import StyledDashboard from './styles/StyledDashbaord';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getProjects = async () => {
      const userProjects = await ProjectAPI.getUserProjects({ token });
      userProjects && setProjects(userProjects);
    };
    token && getProjects();
  }, [token]);

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
        <CreateProject setProjects={setProjects} />
      </div>
    </StyledDashboard>
  );
};

export default Dashboard;
