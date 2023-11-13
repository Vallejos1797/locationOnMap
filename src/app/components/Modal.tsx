// Modal.js
import React from "react";

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded shadow-md z-50">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
                    onClick={onClose}
                >
                    Cerrar
                </button>
                <h1> aqui llega</h1>
                {children}
            </div>
        </div>
    );
};

export default Modal;
