import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  border-style: solid;
  border-color: #333;
  border-radius: 5px;

  ${({ icon, inline, block }) => css`
    border-width: ${icon ? '0' : '1px'};
    background: ${icon ? 'none' : 'auto'};
    padding: ${icon ? '0' : '10px'};
    font-size: ${icon ? 'auto' : '1em'};

    margin-left: ${inline ? '10px' : '0'};

    width: ${block ? '100%' : 'auto'};
  `}

  &:hover {
    cursor: pointer;
  }
`;

export default StyledButton;
