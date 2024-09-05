const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
    res.render('login');
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.render('login', { noUser: "user doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.render('login', { noUser: 'incorrect login credentials' });
        }

        // Save user information in session
        req.session.userId = user.userId;
        req.session.role = user.role;
        if (user.role === 'Employer') {
            return res.redirect('employer/dashboard');
        }

        return res.redirect('employee/dashboard');
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.render('signup', { userExist: 'this User already exists' });
        }

        const user = await User.create({ name, email, password, role });
        if (user.role === 'Employer') {
            return res.redirect('employer/dashboard');
        }

        return res.redirect('employee/dashboard');

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.clearCookie('connect.sid');
        res.redirect('/')
    });
});


module.exports = router