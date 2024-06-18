import React, { useState, useRef } from 'react';
import TaskInput from './TaskInput';
import TaskFilter from './TaskFilter';
import TaskActions from './TaskActions';
import ConfirmModal from './ConfirmModal';
import "./Bai7.css"

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = (name: string) => {
    if (!name.trim()) {
      setError('Tên công việc không được để trống');
      return;
    }
    setTasks([...tasks, { id: Date.now(), name, completed: false }]);
    setTaskName('');
    setError('');
    if (inputRef.current) inputRef.current.focus();
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    if (updatedTasks.every((task) => task.completed)) {
      setShowCompletionModal(true);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Quản lý công việc</h1>
      <TaskInput
        addTask={addTask}
        taskName={taskName}
        setTaskName={setTaskName}
        error={error}
        inputRef={inputRef}
      />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskActions
        clearCompletedTasks={deleteCompletedTasks}
        clearAllTasks={() => setShowConfirmModal(true)}
      />
      <ConfirmModal
        isOpen={showConfirmModal}
        onConfirm={() => {
          if (taskToDelete) {
            deleteTask(taskToDelete.id);
          } else {
            deleteAllTasks();
          }
          setShowConfirmModal(false);
          setTaskToDelete(null);
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};

export default App;
