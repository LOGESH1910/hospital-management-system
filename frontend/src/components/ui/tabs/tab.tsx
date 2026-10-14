import React from "react";
import { cn } from "@/lib/utils";

interface TabProps {
  value: string;
  onSelect: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid w-full grid-cols-2", props.className)}
      >
        {props.children}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export { Tabs };
export type { TabProps };