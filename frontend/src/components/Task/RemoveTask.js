import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TaskAPI from '../../api/TaskAPI';

import StyledForm from '../styles/StyledForm';
import StyledButton from '../styles/StyledButton';

const RemoveTask = () => {
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

  const removeTask = async (e) => {
    e.preventDefault();

    const response = await TaskAPI.remove({
      id: taskId,
      projectId,
    });

    if (response.data) {
      history.push('/');
    } else {
      // openSnackbar({ type: 'error', message: response.message })
    }
  };

  return (
    <StyledForm onSubmit={removeTask}>
      <p>
        <span>
          Remove <strong>{taskName}</strong>?
        </span>
      </p>

      <StyledButton>Remove</StyledButton>
    </StyledForm>
  );
};

export default RemoveTask;
