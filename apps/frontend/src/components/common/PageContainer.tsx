import React from "react";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <main className={`flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 ${className}`}>
      {children}
    </main>
  );
};
