import React, { useState } from 'react';
import '../styles/TaskManager.css';
import TaskCard from '../components/TaskCard';

const TaskManager = () => {
  const [tasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description 1', date: '01/09/2021, 05:30:00' },
    { id: 2, title: 'Task 2', description: 'Description 2', date: '01/09/2021, 05:30:00' },
    { id: 3, title: 'Task 3', description: 'Description 3', date: '01/09/2024, 05:30:00' },
  ]);

  const handleAddTask = () => {
    // Add task logic
  };

  return (
    <div className="task-manager-container">
      {/* Header */}
      <div className="header">
        <div className="icon">📅</div>
        <button className="logout-button">Logout</button>
      </div>

      {/* Add Task Button */}
      <button className="add-task-button" onClick={handleAddTask}>Add Task</button>

      {/* Search and Sort */}
      <div className="filter-section">
        <div className="search-bar">
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" placeholder="Search..." />
        </div>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort By:</label>
          <select id="sort">
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        <h3>TODO</h3>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
