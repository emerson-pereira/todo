import styled from 'styled-components';

const StyledProject = styled.article`
  width: 300px;
  /* max-width: 300px; */
  border: 1px solid #333;
  border-radius: 5px;
  margin: 10px;

  header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: #ccc;
    border-bottom: 1px solid #333;
    border-radius: 5px 5px 0 0;

    h2 {
      margin: 0;
      font-size: 1.2em;
    }
  }

  main {
    padding: 20px;

    h4,
    ul {
      margin: 0;
    }
    section:not(:first-child) {
      margin-top: 20px;
    }
  }
`;

export default StyledProject;
