import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl max-w-2xl w-full shadow-premium-lg animate-slideIn overflow-hidden">
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-[#333]">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white hover:bg-[#2a2a2a] w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300"
                            aria-label="Close modal"
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}

                {/* Close button when no title */}
                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white hover:bg-[#2a2a2a] w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300"
                        aria-label="Close modal"
                    >
                        <FaTimes className="text-lg" />
                    </button>
                )}

                {/* Content */}
                <div className="p-6 text-white max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
