const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth')


router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('employee_dashboard');
})


module.exports = router