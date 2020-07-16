import React from 'react';
import Project from './Project';
import StyledDashboard from './styles/StyledDashbaord';

const Dashboard = () => (
  <StyledDashboard>
    <article>
      <Project />
      <Project />
      <Project />
    </article>
    <aside>
      <Project />
    </aside>
  </StyledDashboard>
);

export default Dashboard;
