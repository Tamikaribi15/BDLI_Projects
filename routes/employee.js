const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const Task = require('../models/Task');
const User = require('../models/User');


router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                employeeId: req.session.userId,
            }
        });

        // Separate tasks by status
        const pendingTasks = tasks.filter(task => task.status === 'Pending');
        const completedTasks = tasks.filter(task => task.status === 'Completed');

        return res.render('employee_dashboard', { pendingTasks: pendingTasks, completedTasks:completedTasks });

    } catch (error) {
        console.error(error);
    }
})


module.exports = router