import styled from 'styled-components';

const StyledNav = styled.nav`
  padding: 20px 40px;
  margin: 0;
  background: #ccc;

  & > div {
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    li {
      padding: 10px;
    }
  }
`;

export default StyledNav;
