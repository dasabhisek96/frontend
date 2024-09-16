import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/TaskDashboard.css';

function TaskDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');  
        return;
      }

      try {
        const response = await fetch(`$(window.location.origin)/api/tasks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);  

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const handleAddTask = () => {
    navigate('/addtasks');
  };

  const handleEdit = (id) => {
    navigate(`/edittasks/${id}`);
  };

  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`$(window.location.origin)/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="task-dashboard">
      <nav className="navbar">
        <div className="logo">
          <i className="fas fa-calendar-alt"></i>
        </div>
        <button className="logout-button">Logout</button>
      </nav>

      <div className="header">
        <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
        <input type="text" placeholder="Search..." className="search-input" />
        <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Sort By: Recent</option>
          <option value="oldest">Sort By: Oldest</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-columns">
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="task-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3 className="column-header">{status.toUpperCase()}</h3>
                  {sortedTasks
                    .filter(task => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <small>Created at: {task.createdAt}</small>
                            <div className="task-actions">
                              <button className="delete-button" onClick={() => handleDelete(task._id)}>Delete</button>
                              <button className="edit-button" onClick={() => handleEdit(task._id)}>Edit</button>
                              <button className="view-button" onClick={() => handleViewDetails(task._id)}>View Details</button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskDashboard;
