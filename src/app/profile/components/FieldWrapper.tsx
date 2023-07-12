import React from "react";
import { twMerge } from "tailwind-merge";

const FieldWrapper: React.FC<{
  children: React.ReactElement;
  label: React.ReactElement;
  errorComponent?: React.ReactNode;
}> = ({ children, label, errorComponent }) => {
  const labelClassName = label?.props.className || "";
  const inputName = children?.props.name || "";

  const deocratedLabel = React.cloneElement(label, {
    className: twMerge("block text-sm font-medium text-gray-500", labelClassName),
    ...(inputName && { htmlFor: `profile-form-${inputName}` }),
  });

  const decoratedChildren = React.cloneElement(children, {
    ...(inputName && { id: `profile-form-${inputName}` }),
  });

  return (
    <div className="flex flex-col space-y-1">
      <>{deocratedLabel}</>
      <>{decoratedChildren}</>
      <>{errorComponent}</>
    </div>
  );
};

export default FieldWrapper;
