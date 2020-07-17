import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectAPI from '../../api/ProjectAPI';
import { getToken } from '../../utils';

import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const StyledBox = styled.aside`
  padding: 40px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
  text-align: center;
  h3 {
    margin: '0 0 20px';
  }
  form {
    display: flex;
    justify-content: space-between;
  }
`;

const CreateProject = ({ setProjects }) => {
  const [projectName, setProjectName] = useState('');

  const createProject = async (e) => {
    e.preventDefault();

    const token = getToken();

    const project = await ProjectAPI.createUserProject({
      token,
      data: {
        name: projectName,
      },
    });

    if (project) {
      const userProjects = await ProjectAPI.getUserProjects({ token });
      userProjects && setProjects(userProjects);
    }

    project && setProjectName('');
  };

  return (
    <StyledBox>
      <h3 style={{ margin: '0 0 20px' }}>Create new project</h3>
      <form onSubmit={createProject}>
        <StyledInput
          type="text"
          value={projectName}
          id="name"
          name="name"
          placeholder="Project name"
          onChange={(e) => setProjectName(e.target.value)}
        />
        <StyledButton inline dark>
          Create
        </StyledButton>
      </form>
    </StyledBox>
  );
};

export default CreateProject;
