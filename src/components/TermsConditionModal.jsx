import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import {
  authIconButtonClassName,
  authPrimaryButtonClassName,
  authSecondaryButtonClassName,
} from "./ui/formStyles";

export default function Modal({ isOpen, onClose, onAccept, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overscroll-contain bg-black/45 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-[#E7D8CE] bg-white shadow-[0_24px_80px_rgba(36,22,15,0.28)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#EFE4DD] px-5 py-4 sm:px-6">
          <div>
            <h2
              id="terms-modal-title"
              className="text-lg font-semibold text-[#24160F] sm:text-xl"
            >
              Terms & Conditions
            </h2>
            <p className="mt-1 text-sm text-[#7C6B62]">
              Please review the declaration before creating the profile.
            </p>
          </div>
          <button
            type="button"
            className={authIconButtonClassName}
            onClick={onClose}
            aria-label="Close terms and conditions"
          >
            <AiOutlineClose size={20} aria-hidden="true" focusable="false" />
          </button>
        </div>
        <div className="max-h-[52vh] overflow-y-auto overscroll-contain px-5 py-4 text-sm leading-6 text-[#403029] sm:px-6 sm:text-base">
          {children}
        </div>
        <div className="flex w-full flex-col-reverse gap-3 border-t border-[#EFE4DD] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            className={authSecondaryButtonClassName}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={authPrimaryButtonClassName}
            onClick={onAccept}
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
