import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';

const ParentComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask] = useState({
    id: 6,
    title: 'Task 6',
    description: 'Description 6',
  });

  const handleSaveTask = (updatedTask) => {
    console.log('Updated Task:', updatedTask);
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit Task</button>
      {showModal && (
        <EditTaskModal
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ParentComponent;
