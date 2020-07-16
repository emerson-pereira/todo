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
      <div style={{ width: '300px', background: '#ccc' }}>Add project</div>
    </aside>
  </StyledDashboard>
);

export default Dashboard;
