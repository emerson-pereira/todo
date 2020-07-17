import styled from 'styled-components';

const StyledProject = styled.article`
  width: 100%;
  max-width: 350px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin: 0 10px 20px;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: #ccc;
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

    .inline-actions-wrapper {
      margin-left: 10px;
    }
  }

  footer {
    padding: 20px;
    border-top: 1px solid #ccc;
    border-radius: 0 0 5px 5px;
    form {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default StyledProject;
