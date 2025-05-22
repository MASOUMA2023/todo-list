import React from "react";
import styled from 'styled-components'

const StyledLabel = styled.label`
  margin-bottom: 0.25rem;
`

const StyledInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`


const InputWithLabel = React.forwardRef(function InputWithLabel({
  elementId,
  label,
  onChange,
  value},
  ref
) {
  return (
    <>
      <StyledLabel htmlFor={elementId}>{label}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
})

export default InputWithLabel;
