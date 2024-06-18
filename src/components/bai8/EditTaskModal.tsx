import React, { useState } from 'react';

const EditTaskModal: React.FC<{ task: Task, fetchTasks: () => void, onClose: () => void }> = ({ task, fetchTasks, onClose }) => {
  const [taskName, setTaskName] = useState(task.name);

  const updateTask = async () => {
    if (!taskName.trim()) {
      alert('Tên công việc không được để trống.');
      return;
    }
    try {
      await fetch(`API_URL/${task.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, name: taskName }),
      });
      fetchTasks();
      onClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sửa công việc</h2>
        <input 
          type="text" 
          value={taskName} 
          onChange={e => setTaskName(e.target.value)} 
        />
        <button onClick={onClose}>Hủy</button>
        <button onClick={updateTask}>Cập nhật</button>
      </div>
    </div>
  );
};

export default EditTaskModal;
