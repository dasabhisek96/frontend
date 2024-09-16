const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const task = new Task({
    title,
    description,
    status,
    user: req.user._id,
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found or user not authorized' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found or user not authorized' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.user.toString() === req.user._id.toString()) {
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404).json({ message: 'Task not found or user not authorized' });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
