import React from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p className="task-date">Created at: {task.date}</p>
      <div className="task-actions">
        <button className="delete-button">Delete</button>
        <button className="edit-button">Edit</button>
        <button className="details-button">View Details</button>
      </div>
    </div>
  );
};

export default TaskCard;
