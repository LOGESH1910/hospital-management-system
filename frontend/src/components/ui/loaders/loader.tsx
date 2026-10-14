import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (props, ref) => {
    const { size = "md", className } = props;
    const sizeMap = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full",
          sizeMap[size]
        )}
      />
    );
  }
);

Loader.displayName = "Loader";

export { Loader };
export type { LoaderProps };