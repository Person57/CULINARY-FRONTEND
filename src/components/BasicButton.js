import React from "react";
import { Button, Spinner } from "react-bootstrap";
const BasicButton = (props) => {
  const {
    variant,
    onClick,
    label,
    color,
    size,
    icon,
    className,
    isLoading,
    loaderVariant,
    loaderSize,
    type
  } = props;
  const buttonStyle = {
    backgroundColor: color,
    borderColor: color,
  };
  return (
    <Button
      style={buttonStyle}
      variant={variant}
      className={className}
      size={size}
      type={type}
      onClick={onClick}
      disabled={!isLoading ? false : true}
    >
      {!isLoading ? (
        <>
          {icon} {label}
        </>
      ) : (
        <>
          <Spinner
            size={`${!loaderSize ? "sm" : loaderSize}`}
            variant={`${!loaderVariant ? "info" : loaderVariant}`}
          />
        </>
      )}
    </Button>
  );
};
export default BasicButton;