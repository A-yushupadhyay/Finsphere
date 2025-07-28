"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  InputHTMLAttributes,
  useState,
  useId,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
}

export default function Input({
  label,
  error,
  success,
  className,
  value,
  defaultValue,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(!!defaultValue || !!value);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const isFloating = focused || filled;

  // Handle controlled input value changes
  useEffect(() => {
    if (typeof value !== "undefined") {
      setFilled(!!value);
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        ref={inputRef}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "peer w-full px-4 pt-6 pb-2 text-sm rounded-md border outline-none transition-all duration-200",
          "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-transparent",
          error
            ? "border-red-500 focus:border-red-600"
            : success
            ? "border-green-500 focus:border-green-600"
            : "border-gray-300 dark:border-zinc-700 focus:border-primary",
          className
        )}
        placeholder=" "
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setFilled(!!e.target.value);
        }}
        {...props}
      />

      {/* Floating Label */}
      <motion.label
        htmlFor={inputId}
        initial={false}
        animate={{
          top: isFloating ? 6 : 14,
          left: 16,
          fontSize: isFloating ? "0.75rem" : "0.875rem",
          color: error
            ? "#EF4444"
            : success
            ? "#22C55E"
            : isFloating
            ? "#3B82F6"
            : "#6B7280", // gray-500
        }}
        transition={{ duration: 0.2 }}
        className="absolute pointer-events-none bg-transparent"
      >
        {label}
      </motion.label>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-red-500 text-xs mt-1"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
