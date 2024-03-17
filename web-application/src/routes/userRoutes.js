const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/create', (req, res) => {
    res.render('createAccount');
  });
  
  router.get('/login', (req, res) => {
    res.render('login');
  });
  

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

  router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).send('Could not log out.');
        } else {
          return res.redirect('/login');
        }
      });
    } else {
      return res.redirect('/login');
    }
  });

  router.get('/userPage', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('userPage', {
      isLoggedIn: true,
      user: req.session.user
    });
  });
  
  router.post('/create', userController.createUser);
  
  router.post('/login', userController.authenticateUser);

  router.post('/update/:userId', userController.updateUser);

  router.post('/delete/:userId', userController.deleteUser);

  

module.exports = router;

