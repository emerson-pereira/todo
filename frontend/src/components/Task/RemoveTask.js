import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TaskAPI from '../../api/TaskAPI';

import StyledForm from '../styles/StyledForm';
import StyledButton from '../styles/StyledButton';

const RemoveTask = () => {
  const [taskName, setTaskName] = useState('');
  const { projectId, taskId } = useParams();
  const history = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getCurrentTask = async () => {
      const task = await TaskAPI.getProjectTaskById({
        token,
        projectId,
        taskId,
      });
      task && setTaskName(task.name);
    };
    getCurrentTask();
  }, [token, projectId, taskId]);

  const removeTask = async (e) => {
    e.preventDefault();

    const task = await TaskAPI.removeProjecTask({
      token,
      projectId,
      taskId,
    });

    task && history.push('/');
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
