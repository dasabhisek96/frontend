import React, { useState } from 'react';
import '../styles/TaskDashboard.css';

function TaskDashboard() {
  // Dummy data for tasks
  const [tasks] = useState([
    { id: 1, status: 'TODO', title: 'Task 3', description: 'Description 3', createdAt: '01/09/2024, 05:30:00' },
    { id: 2, status: 'TODO', title: 'Task 1', description: 'Description 1', createdAt: '01/09/2021, 05:30:00' },
    { id: 3, status: 'TODO', title: 'Task 2', description: 'Description 2', createdAt: '01/09/2021, 05:30:00' },
    { id: 4, status: 'IN_PROGRESS', title: 'Task 4', description: 'Description 4', createdAt: '01/09/2024, 05:30:00' },
    { id: 5, status: 'IN_PROGRESS', title: 'Task 5', description: 'Description 5', createdAt: '01/09/2024, 05:30:00' },
    { id: 6, status: 'DONE', title: 'Task 6', description: 'Description 6', createdAt: '01/09/2021, 05:30:00' },
  ]);

  // Handling task actions can be added here
  const handleDelete = (id) => {
    console.log(`Task ${id} deleted`);
  };

  const handleEdit = (id) => {
    console.log(`Task ${id} edited`);
  };

  const handleViewDetails = (id) => {
    console.log(`Viewing details of task ${id}`);
  };

  return (
    <div className="task-dashboard">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <button className="logout-button">Logout</button>
      </nav>

      <div className="header">
        <button className="add-task-button">Add Task</button>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <select className="sort-dropdown">
          <option value="recent">Sort By: Recent</option>
          <option value="oldest">Sort By: Oldest</option>
        </select>
      </div>

      <div className="task-columns">
        <div className="task-column">
          <h3 className="column-header">TODO</h3>
          {tasks.filter(task => task.status === 'TODO').map(task => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <small>Created at: {task.createdAt}</small>
              <div className="task-actions">
                <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="view-button" onClick={() => handleViewDetails(task.id)}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-column">
          <h3 className="column-header">IN PROGRESS</h3>
          {tasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <small>Created at: {task.createdAt}</small>
              <div className="task-actions">
                <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="view-button" onClick={() => handleViewDetails(task.id)}>View Details</button>
              </div>
            </div>
          ))}
        </div>

        <div className="task-column">
          <h3 className="column-header">DONE</h3>
          {tasks.filter(task => task.status === 'DONE').map(task => (
            <div key={task.id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <small>Created at: {task.createdAt}</small>
              <div className="task-actions">
                <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="view-button" onClick={() => handleViewDetails(task.id)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskDashboard;
