import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TaskAPI from '../../api/TaskAPI';

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
    <>
      <h4>Remove Task</h4>
      <form onSubmit={removeTask}>
        <p>
          Remove <strong>{taskName}</strong>?
        </p>

        <StyledButton>Remove</StyledButton>
      </form>
    </>
  );
};

export default RemoveTask;
