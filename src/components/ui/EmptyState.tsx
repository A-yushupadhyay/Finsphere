"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon, FileWarning } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon = FileWarning,
  title,
  subtitle,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "text-center py-16 text-gray-600 dark:text-gray-400 max-w-md mx-auto",
        className
      )}
    >
      <div className="flex justify-center mb-4">
        <Icon className="h-12 w-12 text-gray-400 dark:text-gray-600" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="mt-2 text-sm">{subtitle}</p>}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
