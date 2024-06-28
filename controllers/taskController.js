const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ completed: 1, createdAt: 'desc' });
        res.render('tasks', { tasks });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.render('task', { task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.redirect('/tasks');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.toggleTaskCompletion = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.completed = !task.completed;
        await task.save();
        
        if (req.headers.accept.includes('json')) {
            res.status(200).json({ message: 'Task status updated successfully', task });
        } else {
            res.redirect(`/tasks/${taskId}`);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
