"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Alert() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            delay: 0.2,
            duration: 0.3,
          }}
          className="bg-gradient-to-r from-[#7028e4] to-[#e5b2ca]"
        >
          <div className="max-w-[100rem] px-4 py-2 sm:px-6 lg:px-8 mx-auto relative">
            <div className="flex items-center justify-between relative pr-8 sm:pr-0">
              <p className="text-white font-medium text-sm flex-grow text-center">
                นี้คือเว็ปbioของผมเองอยู่ในช่วงพัฒนาอาจจะมีบัคเล็กน้อย
              </p>
              <X
                className="size-4 absolute right-0 sm:static cursor-pointer"
                role="button"
                onClick={handleDismiss}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
