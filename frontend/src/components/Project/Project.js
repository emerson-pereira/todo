import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProjectAPI from '../../api/ProjectAPI';

import StyledProject from '../styles/StyledProject';
import StyledFormInput from '../styles/StyledFormInput';
import StyledButton from '../styles/StyledButton';

const Project = ({ id, name, tasks, setProjects }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const undoneTasks = tasks.filter((task) => !task.isDone);
  const doneTasks = tasks.filter((task) => task.isDone);

  const toggleTaskStatus = async (e, taskId) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        baseURL: 'http://localhost:4000',
        url: `/users/current/projects/${id}/tasks/${taskId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        data: {
          isDone: e.target.checked,
        },
      });

      if (response.status === 200) {
        const userProjects = await ProjectAPI.getUserProjects({ token });
        userProjects && setProjects(userProjects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios({
        baseURL: 'http://localhost:4000',
        url: `/users/current/projects/${id}/tasks`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        data: {
          name: newTaskName,
        },
      });

      if (response.status === 201) {
        setNewTaskName('');
        const userProjects = await ProjectAPI.getUserProjects({ token });
        userProjects && setProjects(userProjects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledProject>
      <header>
        <h2>{name}</h2>
        <div>
          <Link to={`/project/${id}/update`}>
            <button>
              <span role="img" aria-label="Update Project">
                ✏️
              </span>
            </button>
          </Link>
          <Link to={`/project/${id}/remove`}>
            <button>
              <span role="img" aria-label="Remove Project">
                🗑️
              </span>
            </button>
          </Link>
        </div>
      </header>
      <main>
        {!!undoneTasks.length && (
          <section>
            <h4>Todo</h4>
            <ul>
              {undoneTasks.map((task) => (
                <li key={task._id}>
                  <label htmlFor={`task-${task.name}`}>
                    <input
                      type="checkbox"
                      id={`task-${task.name}`}
                      onChange={(e) => toggleTaskStatus(e, task._id)}
                    />
                    {task.name}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}
        {!!doneTasks.length && (
          <section>
            <h4>Done</h4>
            <ul>
              {doneTasks.map((task) => (
                <li key={task._id}>
                  <label htmlFor={`task-${task.name}`}>
                    <input
                      type="checkbox"
                      id={`task-${task.name}`}
                      checked
                      disabled
                    />
                    {task.name}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <footer>
        <form>
          <StyledFormInput
            small
            type="text"
            value={newTaskName}
            onChange={(e) => {
              e.preventDefault();
              setNewTaskName(e.target.value);
            }}
            placeholder="New Task"
          />
          <StyledButton onClick={addTask}>Add</StyledButton>
        </form>
      </footer>
    </StyledProject>
  );
};

export default Project;
