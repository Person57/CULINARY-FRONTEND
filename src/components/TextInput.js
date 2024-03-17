import React from "react";
import { Form } from "react-bootstrap";
const TextInput = (props) => {
  const {
    label,
    name,
    id,
    type,
    placeholder,
    htmlFor,
    lableClassName,
    value,
    onChange,
    onBlur,
    disabled,
    className,
    lg,
    md,
    xxl,
    xl,
    sm,
    validation,
    star,
  } = props;
  return (
    <Form.Group>
      <Form.Label htmlFor={htmlFor} className={lableClassName}>
        {label}
        <span className={`text-danger ${star === "none" ? `d-${star}` : ""}`}>
          *
        </span>
      </Form.Label>
      <Form.Control
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={className}
        lg={lg}
        md={md}
        xxl={xxl}
        xl={xl}
        sm={sm}
      />
      {validation}
    </Form.Group>
  );
};
export default TextInput;