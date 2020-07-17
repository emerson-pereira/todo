import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectAPI from '../../api/ProjectAPI';

import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const StyledBox = styled.aside`
  padding: 40px;
  @media (max-width: 1000px) {
    padding: 20px;
  }
  text-align: center;
  h3 {
    margin: 0 0 20px;
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

    const data = {
      name: projectName,
    };

    const response = await ProjectAPI.create({ data });

    if (response.data) {
      setProjectName('');
      // updateProjectListState(response.data)
      // ignores rest below
      const response = await ProjectAPI.find();
      if (response.data) {
        setProjects(response.data.projects);
      }
    }
  };

  return (
    <StyledBox>
      <h3>Create new project</h3>
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
