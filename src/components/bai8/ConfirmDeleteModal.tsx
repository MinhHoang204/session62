import React from 'react';

const ConfirmDeleteModal: React.FC<{ task: Task, fetchTasks: () => void, onClose: () => void }> = ({ task, fetchTasks, onClose }) => {
  const deleteTask = async () => {
    try {
      await fetch(`API_URL/${task.id}`, { 
        method: 'DELETE',
      });
      fetchTasks();
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa công việc này?</p>
        <button onClick={onClose}>Hủy</button>
        <button onClick={deleteTask}>Xóa</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
