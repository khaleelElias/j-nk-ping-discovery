// You need to implement userModel.js and its methods
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require("../models/db");


exports.listUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
    } else {
      res.send(users);
    }
  });
};

exports.createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Username and password are required." });
  }

  userModel.createUser(username, password, (err, message) => {
    if (err) {
      res.status(500).send({ message: err.message || "An error occurred while creating the user." });
    } else {
      res.redirect('/user/login'); // Redirect to the login page after successful creation
    }
  });
};

// userController.js
exports.deleteUser = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/login');
  }

  userModel.deleteUser(req.session.user.id, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      req.session.destroy(); // Log the user out after deleting the account
      return res.redirect('/user/login');
    }
  });
};


exports.updateUser = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/login');  // Redirect to login if not logged in
  }

  const { newUsername, newPassword } = req.body;

  if (!newUsername || !newPassword) {
    return res.status(400).send({ message: "New username and password are required." });
  }

  userModel.updateUser(req.session.user.id, newUsername, newPassword, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      req.session.user=null;
      return res.redirect('/user/login'); // Redirect to the user page after update
    }
  });
};


exports.authenticateUser = (req, res) => {
  const { username, password } = req.body;
  console.log("Attempting to log in with", username, password);

  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      return res.status(500).send({ message: error.message });
    }

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }

        if (isMatch) {
          req.session.user = { id: results[0].id, username: username };
          return res.redirect('/'); 
        } else {
          return res.status(401).send({ message: 'Authentication failed' });
        }
      });
    } else {
      return res.status(404).send({ message: 'User not found' });
    }
  });
};


