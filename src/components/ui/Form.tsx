"use client";

import { FormEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  className?: string;
  loading?: boolean;
}

export default function Form({ children, onSubmit, className, loading }: FormProps) {
  return (
    <form
      onSubmit={(e) => {
        if (!loading) onSubmit(e);
      }}
      className={cn(
        "space-y-4",
        loading && "opacity-50 pointer-events-none",
        className
      )}
    >
      {children}
    </form>
  );
}
