import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "error";
  className?: string;
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (props, ref) => {
    const { variant = "default", className, children } = props;
    const variantClasses = {
      default: "bg-gray-200 text-gray-600",
      primary: "bg-primary-100 text-primary-700",
      success: "bg-success-100 text-success-700",
      warning: "bg-warning-100 text-warning-700",
      error: "bg-error-100 text-error-700",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
          variantClasses[variant]
        )}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps };