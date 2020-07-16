import React from 'react';
import StyledFormInput from './styles/StyledFormInput';

const FormInput = ({ label, input }) => (
  <p>
    <label htmlFor={input.name}>
      <span>{label}</span>
      <br />
      <StyledFormInput
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
