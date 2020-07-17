import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProjectAPI from '../../api/ProjectAPI';

import StyledSection from '../styles/StyledSection';
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
  }, [projectId, token]);

  const removeProject = async (e) => {
    e.preventDefault();

    const project = await ProjectAPI.removeUserProject({
      token,
      projectId,
    });

    project && history.push('/');
  };

  return (
    <StyledSection>
      <h4>Remover Project</h4>
      <form onSubmit={removeProject}>
        <p>
          Remove <strong>{projectName}</strong>?
        </p>

        <StyledButton>Remove</StyledButton>
      </form>
    </StyledSection>
  );
};

export default RemoveProject;
