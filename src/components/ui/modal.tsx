// Modal.tsx
import React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
