import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from "axios";
import "./Bai9.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Bai9: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Task[]>("https://jsonplaceholder.typicode.com/todos?_limit=5");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      alert("Tên công việc không được để trống.");
      return;
    }
    if (tasks.some(task => task.title.toLowerCase() === newTask.trim().toLowerCase())) {
      alert("Tên công việc không được trùng.");
      return;
    }
    const newTaskObj: Omit<Task, 'id'> = { title: newTask.trim(), completed: false };
    setLoading(true);
    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", newTaskObj);
      fetchTasks();
      setNewTask("");
    } catch (error) {
      console.error("Error adding task", error);
    }
    setLoading(false);
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      fetchTasks();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting task", error);
    }
    setLoading(false);
  };

  const updateTask = async () => {
    if (!currentTask || !currentTask.title.trim()) {
      alert("Tên công việc không được để trống.");
      return;
    }
    if (tasks.some(task => task.title.toLowerCase() === currentTask.title.trim().toLowerCase() && task.id !== currentTask.id)) {
      alert("Tên công việc không được trùng.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${currentTask.id}`, currentTask);
      fetchTasks();
      setIsEditing(false);
      setCurrentTask(null);
    } catch (error) {
      console.error("Error updating task", error);
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentTask) {
      setCurrentTask({ ...currentTask, title: e.target.value });
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  return (
    <div className="app-container">
      <h1>Quản lý công việc</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Nhập tên công việc"
        />
        <button onClick={addTask}>Thêm công việc</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Tất cả</button>
        <button onClick={() => setFilter("completed")}>Hoàn thành</button>
        <button onClick={() => setFilter("incomplete")}>Đang thực hiện</button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  const updatedTask = { ...task, completed: !task.completed };
                  setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
                }}
              />
              {task.title}
              <button onClick={() => {
                setCurrentTask(task);
                setIsEditing(true);
              }}>Sửa</button>
              <button onClick={() => {
                setTaskToDelete(task);
                setShowDeleteModal(true);
              }}>Xóa</button>
            </li>
          ))}
        </ul>
      )}
      {isEditing && currentTask && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sửa công việc</h2>
            <input
              type="text"
              value={currentTask.title}
              onChange={handleTaskChange}
            />
            <button onClick={() => setIsEditing(false)}>Hủy</button>
            <button onClick={updateTask}>Cập nhật</button>
          </div>
        </div>
      )}
      {showDeleteModal && taskToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa công việc này?</p>
            <button onClick={() => setShowDeleteModal(false)}>Hủy</button>
            <button onClick={() => deleteTask(taskToDelete.id)}>Xóa</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bai9;
