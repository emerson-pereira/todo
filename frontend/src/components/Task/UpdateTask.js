import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TaskAPI from '../../api/TaskAPI';

import StyledForm from '../styles/StyledForm';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const UpdateTask = () => {
  const [taskName, setTaskName] = useState('');
  const { taskId, projectId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getCurrentTask = async () => {
      const response = await TaskAPI.findOne({
        id: taskId,
        projectId,
      });

      if (response.data) {
        setTaskName(response.data.name);
      } else {
        // openSnackbar({ type: 'error', message: response.message })
      }
    };
    getCurrentTask();
  }, [projectId, taskId]);

  const updateTask = async (e) => {
    e.preventDefault();

    const data = {
      name: taskName,
    };

    const response = await TaskAPI.update({
      id: taskId,
      projectId,
      data,
    });

    if (response.data) {
      history.push('/');
    } else {
      // openSnackbar({ type: 'error', message: response.message })
    }
  };

  return (
    <StyledForm onSubmit={updateTask}>
      <h3>Update Task</h3>
      <p>
        <StyledInput
          type="text"
          value={taskName}
          id="name"
          name="name"
          placeholder="Name"
          onChange={(e) => setTaskName(e.target.value)}
        />
      </p>

      <StyledButton block>Update</StyledButton>
    </StyledForm>
  );
};

export default UpdateTask;
