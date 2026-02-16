import React from "react";
import { Button } from "./Button";


type EmptyStateProps = {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
};


export const EmptyState: React.FC<EmptyStateProps> = ({
    title = "There is no data",
    description = "Try changing or removing some of your filters.",
    actionLabel,
    onAction,
}) => {

    return (
        <div className="py-10 text-center">
            <h2 className="text-lg font-medium text-slate-100">{title}</h2>
            <p className="mt-2 text-sm text-slate-400">{description}</p>

            {actionLabel && onAction ? (
                <div className="mt-5 flex justify-center">
                    <Button variant="outline" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            ) : null}
        </div>
    );
};