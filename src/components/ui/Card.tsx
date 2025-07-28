"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { HTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  animated?: boolean;
};

type MotionCardProps = BaseProps & HTMLMotionProps<"div">;
type StaticCardProps = BaseProps & HTMLAttributes<HTMLDivElement>;

type CardProps = MotionCardProps | StaticCardProps;

export default function Card({
  children,
  className,
  animated = true,
  ...props
}: CardProps) {
  const baseClass =
    "rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300";

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(baseClass, className)}
        {...(props as HTMLMotionProps<"div">)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(baseClass, className)}
      {...(props as HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
}
