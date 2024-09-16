import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function EditTaskModal() {
  const { id } = useParams();  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`$(window.location.origin)/api/tasks/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }

        const data = await response.json();
        setTask(data);
        setLoading(false);
        
          
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`$(window.location.origin)/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task), // Send updated task details
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      alert('Task updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div>Loading task...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Task</h2>
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleSave}>Cancel</button>
    </div>
  );
}

export default EditTaskModal;
