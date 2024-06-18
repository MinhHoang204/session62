import React from 'react';

interface TaskInputProps {
  addTask: (taskName: string) => void;
  taskName: string;
  setTaskName: (taskName: string) => void;
  error: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask, taskName, setTaskName, error, inputRef }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(taskName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Nhập tên công việc"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Thêm công việc</button>
    </form>
  );
};

export default TaskInput;