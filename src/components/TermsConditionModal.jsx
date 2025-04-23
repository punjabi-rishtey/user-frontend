import { AiOutlineClose } from "react-icons/ai";

// Modal.jsx
export default function Modal({ isOpen, onClose, onAccept, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6 border border-zinc-300">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Terms & Condition</h1>
          <button
            className="font-bold hover:text-black hover:font-black"
            onClick={onClose}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="max-h-36 overflow-auto">{children}</div>
        <div className="w-full flex justify-around">
          <button
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}
