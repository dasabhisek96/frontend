import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskDashboard from './components/TaskDashboard';
import TaskManager from'./components/TaskManager';
import ParentComponent from './components/ParentComponent';
import DetailsComponents from './components/DetailsComponents';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/edittasks" element={<ParentComponent />} />
          <Route path="/details" element={<DetailsComponents />} />
          <Route path="/addtasks" element={<TaskManager />} />
          {/* You can add more routes like signup */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
