import React from 'react';
import StyledProject from './styles/StyledProject';

const Project = () => (
  <StyledProject>
    <header>
      <h2>Project I</h2>
      <div>
        <button>✏️</button>
        <button>🗑️</button>
      </div>
    </header>
    <main>
      <section>
        <h4>Todo</h4>
        <ul>
          <li>
            <label htmlFor="task-1">
              <input type="checkbox" id="task-1" />
              Task I
            </label>
          </li>
        </ul>
      </section>
      <section>
        <h4>Done</h4>
        <ul>
          <li>
            <label htmlFor="task-2">
              <input type="checkbox" id="task-2" checked disabled />
              Task II
            </label>
          </li>
        </ul>
      </section>
    </main>
    <footer>
      <input type="text" placeholder="New Task" />
      <button>Add</button>
    </footer>
  </StyledProject>
);

export default Project;
