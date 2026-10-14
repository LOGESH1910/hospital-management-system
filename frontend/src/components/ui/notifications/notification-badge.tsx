import React from "react";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  (props, ref) => {
    const { count, className } = props;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-primary-500 text-xs font-medium text-primary-50",
          className
        )}
      >
        {count > 0 ? count : null}
      </span>
    );
  }
);

NotificationBadge.displayName = "NotificationBadge";

export { NotificationBadge };
export type { NotificationBadgeProps };