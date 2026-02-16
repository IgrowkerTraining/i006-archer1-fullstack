import React from "react";

type LoadingStateProps = {
    message?: string;

};

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
    return (
        <div className="py-10 flex flex-col items-center justify-center text-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-500" />
            <p className="mt-3 text-sm text-slate-300">{message}</p>
        </div>
    );
};