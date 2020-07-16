import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background: #ccc;
  padding: 20px 40px;
  h1 {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    /* border: 1px solid black;
    padding: 0 20px;
    li {
      border: 1px solid pink;
    } */
  }
`;

export default StyledNav;
