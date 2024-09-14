import React from 'react';
import '../styles/TaskDetailsModal.css';

const TaskDetailsModal = ({ task, onClose }) => {
  return (
    <div className="details-modal-overlay">
      <div className="details-modal-content">
        <h2>Task Details</h2>
        <div className="task-details">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Created at:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        </div>
        <div className="details-modal-actions">
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
