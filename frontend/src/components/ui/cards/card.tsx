import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const { className, children, header, footer, bordered = true } = props;

    const baseClasses = "rounded-md border bg-card overflow-hidden shadow-sm";
    const borderClass = bordered ? "border-border" : "";

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
      >
        {header && <div className="border-b border-border p-4">{header}</div>}
        <div className="p-4">{children}</div>
        {footer && <div className="border-t border-border p-4">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps };