import styled from 'styled-components';

const StyledDashboard = styled.main`
  display: flex;
  @media (max-width: 1000px) {
    flex-wrap: wrap-reverse;
  }
  .projects-list {
    flex-grow: 3;
    display: flex;
    flex-wrap: wrap;
    background: #f2f2f2;
  }
  .new-project-box {
    flex-grow: 1;
    background: #ccc;
  }
`;

export default StyledDashboard;
