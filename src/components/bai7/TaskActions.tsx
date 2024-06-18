import React from 'react';
import './TaskActions.css';

interface TaskActionsProps {
  clearCompletedTasks: () => void;
  clearAllTasks: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ clearCompletedTasks, clearAllTasks }) => (
  <div className="task-actions">
    <button onClick={clearCompletedTasks}>Xóa công việc hoàn thành</button>
    <button onClick={clearAllTasks}>Xóa tất cả công việc</button>
  </div>
);

export default TaskActions;