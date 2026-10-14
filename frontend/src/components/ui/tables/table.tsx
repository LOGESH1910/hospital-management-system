import React from "react";
import { cn } from "@/lib/utils";

interface TableProps {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (props, ref) => {
    return (
      <table
        ref={ref}
        className={cn("w-full rounded-md border-collapse border-border", props.className)}
      >
        {props.children}
      </table>
    );
  }
);

Table.displayName = "Table";

export { Table };
export type { TableProps };