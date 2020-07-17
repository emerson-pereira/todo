import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import ProjectAPI from '../../api/ProjectAPI';
import TaskAPI from '../../api/TaskAPI';
import { formatDate } from '../../utils';

import StyledProject from '../styles/StyledProject';
import StyledInput from '../styles/StyledInput';
import StyledButton from '../styles/StyledButton';

const Project = ({ id: projectId, name, tasks, setProjects }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const undoneTasks = tasks.filter((task) => !task.isDone);
  const doneTasks = tasks.filter((task) => task.isDone);

  const toggleTaskStatus = async (e, id) => {
    e.preventDefault();

    const data = {
      isDone: e.target.checked,
    };

    const response = await TaskAPI.update({
      id,
      projectId,
      data,
    });

    if (response.data) {
      // updateProjectListState(response.data)
      // ignores rest below
      const response = await ProjectAPI.find();
      if (response.data) {
        setProjects(response.data.projects);
      }
    } else {
    }
  };

  const addTask = async (e) => {
    e.preventDefault();

    const data = {
      name: newTaskName,
    };

    const response = await TaskAPI.create({
      projectId,
      data,
    });

    if (response.data) {
      setNewTaskName('');
      // updateProjectListState(response.data)
      // ignores rest below
      const response = await ProjectAPI.find();
      if (response.data) {
        setProjects(response.data.projects);
      }
    }
  };

  return (
    <StyledProject>
      <header>
        <h2>{name}</h2>
        <div>
          <Link to={`/project/${projectId}/update`}>
            <StyledButton inline icon>
              <span role="img" aria-label="Update Project">
                ✏️
              </span>
            </StyledButton>
          </Link>
          <Link to={`/project/${projectId}/remove`}>
            <StyledButton inline icon>
              <span role="img" aria-label="Remove Project">
                🗑️
              </span>
            </StyledButton>
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
                    <span className="inline-actions-wrapper">
                      <Link
                        to={`/project/${projectId}/task/${task._id}/update`}
                      >
                        <StyledButton icon inline>
                          <span role="img" aria-label="Update Project">
                            ✏️
                          </span>
                        </StyledButton>
                      </Link>
                      <Link
                        to={`/project/${projectId}/task/${task._id}/remove`}
                      >
                        <StyledButton icon inline>
                          <span role="img" aria-label="Remove Project">
                            🗑️
                          </span>
                        </StyledButton>
                      </Link>
                    </span>
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
                  <label
                    data-tip={formatDate(task.updatedAt)}
                    htmlFor={`task-${task.name}`}
                  >
                    <input
                      type="checkbox"
                      id={`task-${task.name}`}
                      checked
                      disabled
                    />
                    {task.name}
                    <ReactTooltip backgroundColor="#333" />
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <footer>
        <form>
          <StyledInput
            type="text"
            value={newTaskName}
            onChange={(e) => {
              e.preventDefault();
              setNewTaskName(e.target.value);
            }}
            placeholder="Task name"
          />
          <StyledButton inline onClick={addTask}>
            Add
          </StyledButton>
        </form>
      </footer>
    </StyledProject>
  );
};

export default Project;
