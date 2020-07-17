import React, { useState, useEffect } from 'react';
import Project from './Project/Project';
import CreateProject from './Project/CreateProject';
import ProjectAPI from '../api/ProjectAPI';

import StyledDashboard from './styles/StyledDashboard';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const response = await ProjectAPI.find();

      if (response.data) {
        setProjects(response.data.projects);
      } else {
        // openSnackbar({ type: 'error', message: response.message })
      }
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
        <CreateProject setProjects={setProjects} />
      </div>
    </StyledDashboard>
  );
};

export default Dashboard;
