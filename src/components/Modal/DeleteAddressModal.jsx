// File: DeleteFoodModal.jsx
import React, { useEffect } from 'react';

export default function DeleteAddressModal({ isOpen, onClose, onConfirm, address = '' }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isOpen) onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="dfm-backdrop" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div
        className="dfm-modal"
        onMouseDown={(e) => e.stopPropagation()} /* prevent backdrop click from closing when clicking inside */
      >
        <header className="dfm-header">
          <h3 className="dfm-title">Xác nhận xóa</h3>
          <button className="dfm-close" aria-label="Đóng" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="dfm-body">
          <p>
            Bạn chắc chắn muốn xóa địa chỉ <strong>{address}</strong> khỏi danh sách?
          </p>
        </div>

        <footer className="dfm-footer">
          <button className="dfm-btn dfm-cancel" onClick={onClose}>
            Hủy
          </button>
          <button
            className="dfm-btn dfm-confirm"
            onClick={() => {
              onConfirm?.();
            }}
          >
            Xóa
          </button>
        </footer>
      </div>
    </div>
  );
}

