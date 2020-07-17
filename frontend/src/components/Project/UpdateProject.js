import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProjectAPI from '../../api/ProjectAPI';
import { getToken } from '../../utils';

import StyledForm from '../styles/StyledForm';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const UpdateProject = () => {
  const [projectName, setProjectName] = useState('');
  const { projectId } = useParams();
  const history = useHistory();
  const token = getToken();

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

  const updateProject = async (e) => {
    e.preventDefault();

    const project = await ProjectAPI.updateUserProject({
      token,
      projectId,
      data: {
        name: projectName,
      },
    });

    project && history.push('/');
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
