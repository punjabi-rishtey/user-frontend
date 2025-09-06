import { AiOutlineClose } from "react-icons/ai";

// Modal.jsx
export default function Modal({ isOpen, onClose, onAccept, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md flex flex-col gap-4 sm:gap-6 border border-zinc-300 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-lg sm:text-xl font-semibold">Terms & Conditions</h1>
          <button
            className="font-bold hover:text-black hover:font-black p-1"
            onClick={onClose}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="max-h-48 sm:max-h-36 overflow-auto text-sm sm:text-base">{children}</div>
        <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-around">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 sm:px-4 sm:py-2 rounded-md transition duration-200 order-2 sm:order-1"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 sm:px-4 sm:py-2 rounded-md transition duration-200 order-1 sm:order-2"
            onClick={onClose}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}
