import styled from 'styled-components';

const StyledDashboard = styled.div`
  display: flex;
  padding: 0 40px;

  @media (max-width: 1000px) {
    flex-wrap: wrap-reverse;
    padding: 0 20px;
  }
  .projects-list {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 1000px) {
      width: 100%;
    }
  }
  .new-project-box {
    background: #ccc;
    border-radius: 5px;
    width: 30%;
    align-self: flex-start;
    @media (max-width: 1000px) {
      width: 350px;
      margin: 0 10px 20px;
    }
  }
`;

export default StyledDashboard;
