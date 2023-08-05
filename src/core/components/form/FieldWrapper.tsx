import React from "react";
import { twMerge } from "tailwind-merge";

const FieldWrapper: React.FC<
  {
    children: React.ReactElement;
    label: React.ReactElement;
    errorComponent?: JSX.Element;
  } & React.ComponentPropsWithoutRef<"div">
> = ({ children, label, errorComponent, className }) => {
  const labelClassName = label?.props.className || "";
  const inputName = children?.props.name || "";

  const deocratedLabel = React.cloneElement(label, {
    className: twMerge("block text-sm font-medium text-gray-500 mb-1", labelClassName),
    ...(inputName && { htmlFor: `input-marker-${inputName}` }),
  });

  const decoratedChildren = React.cloneElement(children, {
    ...(inputName && { id: `input-marker-${inputName}` }),
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
