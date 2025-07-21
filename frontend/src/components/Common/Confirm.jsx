import React from "react";

const Confirm = ({ open, title, message, onCancel, onConfirm, id }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {title || "Confirm"}
        </h2>
        <p className="text-gray-600 mb-6">
          {message || "Are you sure you want to proceed?"}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(id)}
            className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
