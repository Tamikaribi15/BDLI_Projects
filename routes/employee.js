const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const Task = require('../models/Task');
const User = require('../models/User');
const Notification = require('../models/Notification');


router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: {
                employeeId: req.session.userId,
            }
        });

        const notifications = await Notification.findAll({
            where: {
                createdFor: req.session.userId,
            }
        })

        // Separate tasks by status
        const pendingTasks = tasks.filter(task => task.status === 'Pending');
        const completedTasks = tasks.filter(task => task.status === 'Completed');

        return res.render('employee_dashboard', { pendingTasks: pendingTasks, completedTasks: completedTasks,notifications: notifications });

    } catch (error) {
        console.error(error);
    }
})

router.post('/dashboard', isAuthenticated, async (req, res) => {
    
    try {
        const { taskId, status } = req.body;

        const task = await Task.findByPk(taskId);

        // ======If the task is not found, return a 404 error
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task fields with the new data
        task.status = status || task.status;

        // ======== Save the updated task back to the database
        await task.save();

        const notifications = await Notification.findAll({
            where: {
                createdFor: req.session.userId,
            }
        })
        
        await Notification.create({
            message: "Task status has changed",
            createdFor: notifications.createdBy ,
            createdBy: req.session.userId
        });
        return res.redirect('/employee/dashboard');

    } catch (error) {
        console.error(error);
    }
})


module.exports = router