import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #333;
  border-radius: 5px;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  margin-left: ${({ inline }) => (inline ? '10px' : '0')};

  &:hover {
    cursor: pointer;
  }
`;

export default StyledButton;
