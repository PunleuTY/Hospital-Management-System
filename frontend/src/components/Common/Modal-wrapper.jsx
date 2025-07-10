"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCrossCircled } from "react-icons/rx";

/**
 * ModalWrapper - A reusable modal component with animations and blur effects
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback function when modal closes
 * @param {ReactNode} children - Content to render inside the modal
 * @param {string} size - Modal size: 'sm', 'md', 'lg', 'xl', 'full'
 * @param {boolean} showCloseButton - Whether to show the X close button
 * @param {boolean} closeOnBackdropClick - Whether clicking backdrop closes modal
 * @param {boolean} closeOnEscape - Whether ESC key closes modal
 * @param {string} className - Additional CSS classes for modal content
 */
export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = "",
}) {
  // Handle ESC key press
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Modal size configurations
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-[95vw]",
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop with blur effect */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          />

          {/* Modal Content */}
          <motion.div
            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] no-scrollbar overflow-x-auto ${className} rounded-md`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Prevent backdrop click when clicking modal content
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-md shadow-2xl p-3 relative">
              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className=" hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer absolute top-3 right-3 z-10 p-2"
                  aria-label="Close modal"
                >
                  <RxCrossCircled className="w-8 h-8 text-gray-500" />
                </button>
              )}
              {/* Modal Content */}
              <div className="w-full">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
