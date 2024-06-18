import React from 'react';

const TaskItem: React.FC<{ task: Task, setEditingTask: (task: Task) => void, setDeletingTask: (task: Task) => void }> = ({ task, setEditingTask, setDeletingTask }) => {
  return (
    <div className="task-item">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => {/* Add toggle completed functionality */}} 
      />
      <span className={task.completed ? 'completed' : ''}>{task.name}</span>
      <button onClick={() => setEditingTask(task)}>✏️</button>
      <button onClick={() => setDeletingTask(task)}>🗑️</button>
    </div>
  );
};

export default TaskItem;
