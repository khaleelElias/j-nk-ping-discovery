const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Define routes here
// Route to display the create account page
router.get('/create', (req, res) => {
    res.render('createAccount');
  });
  
  // Route to display the login page
  router.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Route for user to update their information
  // Assume user ID is available somehow, e.g., through a session or a parameter
  router.get('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    userModel.getUserById(userId, (err, user) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.render('userPage', { user: user });
      }
    });
  });
  
  // POST endpoint for creating an account
  router.post('/create', userController.createUser);
  
  // userRoutes.js
  router.post('/login', userController.authenticateUser);

  // POST endpoint for updating user information
  router.post('/update/:userId', userController.updateUser);
  

module.exports = router;

