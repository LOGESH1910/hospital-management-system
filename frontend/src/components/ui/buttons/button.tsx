import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      asChild = false,
      className,
      children,
      ...rest
    } = props;

    const variantStyles = {
      primary: "bg-primary-600 text-primary-50 hover:bg-primary-500 disabled:bg-primary-400",
      secondary: "bg-secondary-100 text-secondary-700 hover:bg-secondary-200 disabled:bg-secondary-200",
      outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 disabled:border-primary-300",
      ghost: "hover:bg-primary-50 hover:text-primary-600 disabled:opacity-50",
    };

    const sizeStyles = {
      sm: "h-8 px-3 rounded",
      md: "h-10 px-4 rounded",
      lg: "h-12 px-6 rounded",
    };

    const classNames = cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size]
    );

    if (asChild) {
      return (
        <span
          ref={ref}
          className={classNames}
          {...rest}
        >
          {children}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };