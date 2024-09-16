
import React, { useState, useEffect } from 'react';
import '../styles/TaskManager.css';
import TaskCard from '../components/TaskCard';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = getToken();
        const response = await fetch(`$(window.location.origin)/api/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        
        console.log('Fetched tasks:', data);

       
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Expected an array but got', data);
          setTasks([]); 
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };


  const handleAddTask = async () => {
    if (newTask.title && newTask.description) {
      try {
        const token = getToken();
        const response = await fetch(`$(window.location.origin)/api/tasks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        const createdTask = await response.json();

        
        console.log('Task created:', createdTask);

        
        if (Array.isArray(tasks)) {
          setTasks((prevTasks) => [...prevTasks, createdTask]);
        } else {
          console.error('Tasks is not an array after adding a task');
          setTasks([createdTask]); 
        }

        
        setNewTask({ title: '', description: '' });
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      alert('Please fill in both the title and description.');
    }
  };

  return (
    <div className="task-manager-container">
      
      <div className="header">
        <div className="icon">📅</div>
        <button className="logout-button">Logout</button>
      </div>

     
      <div className="add-task-section">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="task-input"
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          className="task-input"
        />
        <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
      </div>

      
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

      
      <div className="task-list">
        <h3>TODO</h3>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          
          Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <p>No tasks found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default TaskManager;

