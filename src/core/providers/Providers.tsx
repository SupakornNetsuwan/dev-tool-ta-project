import React from "react";
/**
 * @description ตัวจัดการ Providers ทั้งหมด
 */
const Providers: React.FC<{ providers: React.ReactElement[]; children: React.ReactNode }> = ({
  providers,
  children,
}) => {
  const renderProvider = (providers: React.ReactElement[], children: React.ReactNode): React.ReactNode => {
    const [provider, ...restProviders] = providers;

    if (provider) {
      return React.cloneElement(provider, undefined, renderProvider(restProviders, children));
    }

    return children;
  };

  return renderProvider(providers, children);
};

export default Providers;
