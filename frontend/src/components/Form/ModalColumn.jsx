import { useEffect } from "react";
import { FaClipboardList } from "react-icons/fa";
import { Card, CardHeader, CardContent } from "../common/Card";
import { motion } from "framer-motion";

export default function ModalColumn({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) {
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

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaClipboardList className="text-2xl text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            </div>
          </CardHeader>

          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {children}
            </motion.div>
          </CardContent>
          <motion.div
            className="mt-6 flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <button
              className="border border-black hover:bg-gray-100 rounded-md p-2"
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </Card>
      </div>
    </div>
  );
}
