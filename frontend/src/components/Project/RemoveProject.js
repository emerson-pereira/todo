import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProjectAPI from '../../api/ProjectAPI';

import StyledForm from '../styles/StyledForm';
import StyledButton from '../styles/StyledButton';

const RemoveProject = () => {
  const [projectName, setProjectName] = useState('');
  const { projectId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getCurrentProject = async () => {
      const response = await ProjectAPI.findOne({ id: projectId });
      if (response.data) {
        setProjectName(response.data.name);
      }
    };
    getCurrentProject();
  }, [projectId]);

  const removeProject = async (e) => {
    e.preventDefault();

    const response = await ProjectAPI.remove({ id: projectId });

    if (response.data) {
      history.push('/');
    } else {
      // openSnackbar({ type: 'error', message: response.message })
    }
  };

  return (
    <StyledForm onSubmit={removeProject}>
      <p>
        <span>
          Remove <strong>{projectName}</strong>?
        </span>
      </p>

      <StyledButton>Remove</StyledButton>
    </StyledForm>
  );
};

export default RemoveProject;
