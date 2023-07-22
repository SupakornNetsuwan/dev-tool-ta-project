import React from "react";
import { twMerge } from "tailwind-merge";

const FieldWrapper: React.FC<{
  children: React.ReactElement;
  label: React.ReactElement;
  errorComponent?: JSX.Element;
}> = ({ children, label, errorComponent }) => {
  const labelClassName = label?.props.className || "";
  const inputName = children?.props.name || "";

  const deocratedLabel = React.cloneElement(label, {
    className: twMerge("block text-sm font-medium text-gray-500 mb-1", labelClassName),
    ...(inputName && { htmlFor: `profile-form-${inputName}` }),
  });

  const decoratedChildren = React.cloneElement(children, {
    ...(inputName && { id: `profile-form-${inputName}` }),
  });

  const decoratedErrorComponent = React.createElement(
    "div",
    {
      className: "mt-1",
    },
    errorComponent
  );

  return (
    <div className="flex flex-col">
      <>{deocratedLabel}</>
      <>{decoratedChildren}</>
      <>{decoratedErrorComponent}</>
    </div>
  );
};

export default FieldWrapper;
