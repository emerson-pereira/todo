import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TaskAPI from '../../api/TaskAPI';

import StyledForm from '../styles/StyledForm';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const UpdateTask = () => {
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

  const updateTask = async (e) => {
    e.preventDefault();

    const task = await TaskAPI.updateProjecTask({
      token,
      projectId,
      taskId,
      data: {
        name: taskName,
      },
    });

    task && history.push('/');
  };

  return (
    <StyledForm onSubmit={updateTask}>
      <h3>Update Task</h3>
      <form>
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
      </form>
    </StyledForm>
  );
};

export default UpdateTask;
