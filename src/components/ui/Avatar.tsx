"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "next-auth";
import { FC } from "react";

interface AvatarProps {
  user?: Pick<User, "name" | "image">;
  size?: number;
  showStatus?: boolean;
}

const Avatar: FC<AvatarProps> = ({ user, size = 48, showStatus = false }) => {
  const fallback = user?.name?.[0] || "U";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative inline-block"
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={size}
          height={size}
          className="rounded-full object-cover border shadow"
        />
      ) : (
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-white"
        >
          {fallback}
        </div>
      )}

      {showStatus && (
        <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-zinc-900" />
      )}
    </motion.div>
  );
};

export default Avatar;
