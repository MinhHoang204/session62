import React from 'react';
import TaskItem from './TaskItem';

const TaskList: React.FC<{ tasks: Task[], setEditingTask: (task: Task) => void, setDeletingTask: (task: Task) => void }> = ({ tasks, setEditingTask, setDeletingTask }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          setEditingTask={setEditingTask} 
          setDeletingTask={setDeletingTask} 
        />
      ))}
    </div>
  );
};

export default TaskList;
