import React, { useState } from 'react';
import FormInput from '../FormInput';
import ProjectAPI from '../../api/ProjectAPI';

import StyledSection from '../styles/StyledSection';
import StyledButton from '../styles/StyledButton';

const CreateProject = ({ setProjects }) => {
  const [projectName, setProjectName] = useState('');
  const token = localStorage.getItem('token');

  const createProject = async (e) => {
    e.preventDefault();

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
    <StyledSection>
      <h3>Create new project</h3>
      <form onSubmit={createProject}>
        <FormInput
          label="Name"
          input={{
            type: 'text',
            name: 'name',
            value: projectName,
            handleChange(e) {
              setProjectName(e.target.value);
            },
          }}
        />

        <StyledButton>Create</StyledButton>
      </form>
    </StyledSection>
  );
};

export default CreateProject;
