import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProjectAPI from '../../api/ProjectAPI';

import StyledButton from '../styles/StyledButton';

const RemoveProject = () => {
  const [projectName, setProjectName] = useState('');
  const { projectId } = useParams();
  const history = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getCurrentProject = async () => {
      const project = await ProjectAPI.getUserProjectById({
        token,
        projectId,
      });
      project && setProjectName(project.name);
    };
    getCurrentProject();
  }, [token, projectId]);

  const removeProject = async (e) => {
    e.preventDefault();

    const project = await ProjectAPI.removeUserProject({
      token,
      projectId,
    });

    project && history.push('/');
  };

  return (
    <>
      <h4> Project</h4>
      <form onSubmit={removeProject}>
        <p>
          Remove <strong>{projectName}</strong>?
        </p>

        <StyledButton>Remove</StyledButton>
      </form>
    </>
  );
};

export default RemoveProject;
