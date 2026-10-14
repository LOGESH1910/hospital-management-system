import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (props, ref) => {
    const {
      icon,
      title,
      description,
      buttonText,
      buttonHref,
      className,
    } = props;

    return (
      <div
        ref={ref}
        className={cn("text-center py-12", className)}
      >
        {icon || (
          <div
            className="h-16 w-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M20 4H7.9l-1.4-1.4H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.9l1.4 1.4H20c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2ZM0 20h20L12 4L4 20V8h8c1.1 0 2 .9 2 2v12c0 1.1.9 2 2 2z"
              />
            </svg>
          </div>
        )}
        <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-6">{description}</p>
        )}
        {buttonText && buttonHref && (
          <Button asChild variant="primary" size="sm">
            <a
              href={buttonHref}
              className="flex items-center gap-2"
            >
              {buttonText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
export type { EmptyStateProps };