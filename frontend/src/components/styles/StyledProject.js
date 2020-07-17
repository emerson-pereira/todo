import styled from 'styled-components';

const StyledProject = styled.article`
  width: 100%;
  max-width: 300px;
  border: 1px solid #333;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;

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
    flex: auto;

    h4,
    ul {
      margin: 0;
    }
    section:not(:first-child) {
      margin-top: 20px;
    }
  }

  footer {
    padding: 10px 20px;
    border-top: 1px solid #333;
    border-radius: 0 0 5px 5px;
    form {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default StyledProject;
