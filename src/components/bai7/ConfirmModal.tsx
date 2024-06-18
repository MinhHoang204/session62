import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa công việc này không?</p>
        <div className="modal-actions">
          <button onClick={onCancel}>Hủy</button>
          <button onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
