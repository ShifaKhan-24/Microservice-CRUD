
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[30vw]">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
         
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
