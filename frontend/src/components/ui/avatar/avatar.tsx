import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/buttons/button";

interface AvatarProps {
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  src?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (props, ref) => {
    const { className, children, size = "md", src } = props;
    const sizeMap = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full flex items-center justify-center text-sm font-medium",
          sizeMap[size],
          className
        )}
      >
        {children || (src ? (
          <img
            src={src}
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        ) : null)}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
export type { AvatarProps };