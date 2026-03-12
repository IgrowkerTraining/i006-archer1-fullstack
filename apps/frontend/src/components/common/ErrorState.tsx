import React from "react";
import { Button } from "./Button";

type ErrorStateProps = {
    message?: string;
    onReatry?: () => void;
};

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = "Something went wrong",
    onRetry,
}) => {

    return (
        <div className="py-10 text-center">
            <h2 className="text-lg font-medium text-slate-100">Ups</h2>
            <p className="mt-2 text-sm text-slate-400">{message}</p>

            {onRetry ? (
                <div className="mt-5 flex justify-center">
                    <Button variant="outline" onClick={onRetry}>
                        Reintentar
                    </Button>
                </div>
            ) : null}
        </div>
    );
};