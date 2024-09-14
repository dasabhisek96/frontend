import React, { useState } from 'react';
import TaskDetailsModal from '../components/TaskDetailsModal';

const DetailsComponents = () => {
  const [showModal, setShowModal] = useState(false);
  const [task] = useState({
    id: 6,
    title: 'Task 6',
    description: 'Description 6',
    createdAt: '2021-09-01T05:30:00Z', // ISO format date string
  });

  return (
    <div>
      <button onClick={() => setShowModal(true)}>View Task Details</button>
      {showModal && (
        <TaskDetailsModal
          task={task}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};


    export default DetailsComponents  ;