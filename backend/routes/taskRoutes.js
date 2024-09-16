const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

// Task routes (require authentication)
router.route('/')
  .get(auth, getTasks)  // Get all tasks for authenticated user
  .post(auth, createTask);  // Create new task

router.route('/:id')
  .get(auth, getTaskById)
  .put(auth, updateTask)  // Update task
  .delete(auth, deleteTask);  // Delete task

module.exports = router;
