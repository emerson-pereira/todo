import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FormInput from '../FormInput';
import TaskAPI from '../../api/TaskAPI';

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
    <>
      <h4>Update Task</h4>
      <form onSubmit={updateTask}>
        <FormInput
          label="Name"
          input={{
            type: 'text',
            name: 'name',
            value: taskName,
            handleChange(e) {
              setTaskName(e.target.value);
            },
          }}
        />

        <StyledButton>Update</StyledButton>
      </form>
    </>
  );
};

export default UpdateTask;
