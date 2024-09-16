import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskDashboard from './components/TaskDashboard';
import TaskManager from'./components/TaskManager';
import EditTaskModal from './components/EditTaskModal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<TaskDashboard />} />
          <Route path="/edittasks/:id" element={<EditTaskModal />} />
          <Route path="/details/:id" element={<EditTaskModal />} />
          <Route path="/addtasks" element={<TaskManager />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
