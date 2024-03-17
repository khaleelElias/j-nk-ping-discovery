// You need to implement userModel.js and its methods
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

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
      res.status(201).send({ message });
    }
  });
};

exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  userModel.deleteUser(userId, (err, message) => {
    if (err) {
      res.status(500).send({ message: err.message || "An error occurred while deleting the user." });
    } else {
      res.send({ message });
    }
  });
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { newUsername, newPassword } = req.body;

  if (!newUsername || !newPassword) {
    return res.status(400).send({ message: "New username and password are required." });
  }

  userModel.updateUser(userId, newUsername, newPassword, (err, message) => {
    if (err) {
      res.status(500).send({ message: err.message || "An error occurred while updating the user." });
    } else {
      res.send({ message });
    }
  });
};


exports.authenticateUser = (username, password, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          callback(err, null);
          return;
        }

        if (isMatch) {
          callback(null, 'Authentication successful');
        } else {
          callback(new Error('Authentication failed'), null);
        }
      });
    } else {
      callback(new Error('User not found'), null);
    }
  });
};