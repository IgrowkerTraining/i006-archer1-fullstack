import React from "react";

type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  rightSlot?: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = "",
  rightSlot,
}) => {
  return (
    <header className={`mb-10 flex items-start justify-between gap-4 ${className}`}>
      <div>
        <div className="text-3xl font-bold text-white mb-2">{title}</div>
        {subtitle ? <div className="text-slate-400">{subtitle}</div> : null}
      </div>
      {rightSlot ? <div>{rightSlot}</div> : null}
    </header>
  );
};
