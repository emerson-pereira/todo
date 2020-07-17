import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormInput from '../FormInput';
import ProjectAPI from '../../api/ProjectAPI';

import StyledButton from '../styles/StyledButton';

const UpdateProject = () => {
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
    <>
      <h4>Update Project</h4>
      <form onSubmit={updateProject}>
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

        <StyledButton>Update</StyledButton>
      </form>
    </>
  );
};

export default UpdateProject;
