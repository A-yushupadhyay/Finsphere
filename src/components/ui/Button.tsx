"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { forwardRef, ComponentPropsWithoutRef } from "react";

type Variant = "default" | "outline" | "ghost" | "danger" | "primary" | "green" | "red";

interface ButtonProps extends Omit<ComponentPropsWithoutRef<typeof motion.button>, "children"> {
  variant?: Variant;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "default", isLoading, disabled, ...props }, ref) => {
    const base = `
      inline-flex items-center justify-center 
      px-4 py-2.5 rounded-md 
      text-sm font-medium 
      transition-all 
      focus:outline-none focus:ring-2 focus:ring-offset-2 
      disabled:opacity-50 disabled:pointer-events-none
    `;

    const variants: Record<Variant, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "text-gray-700 hover:bg-gray-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      green: "bg-green-600 text-white hover:bg-green-700",
      red: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
      <motion.button
        whileTap={{ scale: 0.96 }}
        ref={ref}
        className={cn(base, variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
