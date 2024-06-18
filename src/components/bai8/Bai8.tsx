import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import EditTaskModal from './EditTaskModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import LoadingSpinner from './LoadingSpinner';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('API_URL'); // Replace with your API URL
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      {loading && <LoadingSpinner />}
      <h1>Quản lý công việc</h1>
      <AddTask fetchTasks={fetchTasks} />
      <TaskList 
        tasks={tasks} 
        setEditingTask={setEditingTask} 
        setDeletingTask={setDeletingTask} 
      />
      {editingTask && (
        <EditTaskModal 
          task={editingTask} 
          fetchTasks={fetchTasks} 
          onClose={() => setEditingTask(null)} 
        />
      )}
      {deletingTask && (
        <ConfirmDeleteModal 
          task={deletingTask} 
          fetchTasks={fetchTasks} 
          onClose={() => setDeletingTask(null)} 
        />
      )}
    </div>
  );
};

export default App;
