const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')
const User = require('../models/User');
const Task = require('../models/Task');


router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        // Fetch users with the role of 'Employee'
        const employees = await User.findAll({
            where: {
                role: 'Employee',
            },
            attributes: ['email'],
        });

        const tasks = await Task.findAll({
            where: {
                employerId: req.session.userId,
            }
        });
        
        return res.render('employer_dashboard', { employees:employees, tasks: tasks });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Server error');
    }
})

router.post('/dashboard', isAuthenticated, async (req, res) => {
    const { title, description, employee, dueDate } = req.body;

    try {
        // Find the employee by email
        const employeeUser = await User.findOne({ where: { email: employee } });

        // Check if the employee exists
        if (!employeeUser) {
            return res.status(400).json({ error: 'Employee not found with the provided email' });
        }

        // Create the task with employerId set to the logged-in user and employeeId set to the found user
        const newTask = await Task.create({
            title,
            description,
            dueDate,
            employeeId: employeeUser.userId,
            employerId: req.session.userId,
            status: 'Pending',
        });

        res.redirect('/employer/dashboard');

    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router