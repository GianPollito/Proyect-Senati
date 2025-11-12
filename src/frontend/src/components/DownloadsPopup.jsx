import { useEffect } from "react";

function DownloadsPopup({ isOpen, onClose }) {
  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".downloads-popup") && !e.target.closest(".download-icon")) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="downloads-popup absolute bottom-16 left-16 bg-[#2A2A2A] text-white p-4 rounded-lg shadow-lg w-72 z-50 border border-[#3A3A3A]"
      style={{ animation: "fadeIn 0.2s ease" }}
    >
      <h3 className="text-sm font-semibold mb-1">Descargas</h3>
      <p className="text-xs text-gray-400">No hay descargas en curso</p>
    </div>
  );
}

export default DownloadsPopup;
