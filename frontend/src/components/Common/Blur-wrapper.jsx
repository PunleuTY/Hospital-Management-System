import { motion } from "framer-motion";

/**
 * PageBlurWrapper - Wraps page content and applies blur effect when modal is open
 *
 * @param {ReactNode} children - Page content to wrap
 * @param {boolean} isBlurred - Whether to apply blur effect
 */
export default function PageBlurWrapper({ children, isBlurred }) {
  return (
    <motion.div
      animate={{
        filter: isBlurred ? "blur(4px)" : "blur(0px)",
        scale: isBlurred ? 0.95 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
