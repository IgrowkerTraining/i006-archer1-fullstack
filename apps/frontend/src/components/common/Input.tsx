import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-600 ml-1">
          {label}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#68911B] transition-colors">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full h-12 rounded-xl px-3
            ${icon ? "pl-10" : ""}
            bg-white border border-slate-300
            text-slate-800 placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-[#68911B]/20 focus:border-[#68911B]
            transition-all duration-200
            ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-red-600 mt-0.5 ml-1">{error}</p>}
    </div>
  );
};
