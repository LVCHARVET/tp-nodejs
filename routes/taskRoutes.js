const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks/:id/update', taskController.updateTask);
router.post('/tasks/:id/complete', taskController.toggleTaskCompletion);
router.post('/tasks/:id/incomplete', taskController.toggleTaskCompletion);
router.post('/tasks/:id/delete', taskController.deleteTask);

module.exports = router;
