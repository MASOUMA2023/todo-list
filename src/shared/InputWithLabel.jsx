import React from "react";

const InputWithLabel = React.forwardRef(function InputWithLabel({
  elementId,
  label,
  onChange,
  value},
  ref
) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
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
