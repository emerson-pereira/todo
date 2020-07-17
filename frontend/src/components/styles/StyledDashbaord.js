import styled from 'styled-components';

const StyledDashboard = styled.main`
  display: flex;
  @media (max-width: 1000px) {
    flex-wrap: wrap-reverse;
  }
  .projects-list {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    background: #f2f2f2;
    @media (max-width: 1000px) {
      width: 100%;
    }
  }
  .new-project-box {
    background: #ccc;
    width: 30%;
    @media (max-width: 1000px) {
      width: 100%;
    }
  }
`;

export default StyledDashboard;
