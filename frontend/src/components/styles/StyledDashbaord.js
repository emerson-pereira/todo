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
    border: 2px solid pink;
    /* padding: 20px; */
  }
  .new-project-box {
    flex-grow: 1;
    /* display: flex;  */
    /* flex-wrap: nowrap; */
    border: 2px solid yellow;
  }
`;

export default StyledDashboard;
