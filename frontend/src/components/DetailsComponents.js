import React, { useState } from 'react';
import TaskDetailsModal from '../components/TaskDetailsModal';

const DetailsComponents = () => {
  const [showModal, setShowModal] = useState(false);
  const [task] = useState({  });

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