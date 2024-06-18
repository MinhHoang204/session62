import React, { useState } from 'react';

const AddTask: React.FC<{ fetchTasks: () => void }> = ({ fetchTasks }) => {
  const [taskName, setTaskName] = useState('');

  const addTask = async () => {
    if (!taskName.trim()) {
      alert('Tên công việc không được để trống.');
      return;
    }
    try {
      await fetch('API_URL', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, completed: false }),
      });
      fetchTasks();
      setTaskName('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="add-task">
      <input 
        type="text" 
        value={taskName} 
        onChange={e => setTaskName(e.target.value)} 
        placeholder="Nhập tên công việc" 
      />
      <button onClick={addTask}>Thêm công việc</button>
    </div>
  );
};

export default AddTask;
