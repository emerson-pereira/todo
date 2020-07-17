import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProjectAPI from '../../api/ProjectAPI';

import StyledForm from '../styles/StyledForm';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const UpdateProject = () => {
  const [projectName, setProjectName] = useState('');
  const { projectId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getCurrentProject = async () => {
      const response = await ProjectAPI.findOne({ id: projectId });

      if (response.data) {
        setProjectName(response.data.name);
      } else {
        // openSnackbar({ type: 'error', message: response.message })
      }
    };
    getCurrentProject();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();

    const data = {
      name: projectName,
    };

    const response = await ProjectAPI.update({
      id: projectId,
      data,
    });

    if (response.data) {
      history.push('/');
    } else {
      // openSnackbar({ type: 'error', message: response.message })
    }
  };

  return (
    <StyledForm onSubmit={updateProject}>
      <h3>Update Project</h3>

      <p>
        <StyledInput
          type="text"
          value={projectName}
          id="name"
          name="name"
          placeholder="Name"
          onChange={(e) => setProjectName(e.target.value)}
        />
      </p>

      <StyledButton block>Update</StyledButton>
    </StyledForm>
  );
};

export default UpdateProject;
