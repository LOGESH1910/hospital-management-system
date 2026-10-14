import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trending?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (props, ref) => {
    const {
      value,
      label,
      icon,
      trending,
      className,
    } = props;

    const trendClass = trending?.positive
      ? "text-success-600"
      : "text-error-600";

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 rounded-xl bg-card border border-border flex items-start justify-between",
          className
        )}
      >
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1">{icon}</div>}
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === "number" ? value : value}
            </p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
        {trending && (
          <div className="mt-2 text-xs {trendClass}">
            <span>{trending.positive ? "▲" : "▼"} {trending.value}%</span>
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };
export type { StatCardProps };