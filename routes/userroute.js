const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller.js');


//get all users 
router.route('/')
        .get(userController.getAllUsers);


//create a new user
router.route('/register')
        .post(userController.createNewUser);


// loin a user
router.route('/login')
        .post(userController.loginUser)


module.exports = router;
