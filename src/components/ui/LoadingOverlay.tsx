"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  show: boolean;
  className?: string;
}

export default function LoadingOverlay({ show, className }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70 backdrop-blur-sm",
            className
          )}
        >
          <motion.div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
