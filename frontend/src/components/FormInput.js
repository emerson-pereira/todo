import React from 'react';
import StyledInput from './styles/StyledInput';

const FormInput = ({ label, input }) => (
  <p>
    <label htmlFor={input.name}>
      <span>{label}</span>
      <br />
      <StyledInput
        type={input.type}
        value={input.value}
        id={input.name}
        name={input.name}
        onChange={input.handleChange}
      />
    </label>
  </p>
);

export default FormInput;
