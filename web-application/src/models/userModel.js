const db = require('./db');
const bcrypt = require('bcrypt');



exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
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
      res.redirect('/login'); // Redirect to the login page
    }
  });
};


exports.deleteUser = (userId, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, 'User deleted successfully');
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
      res.redirect('/userPage'); // Redirect to a page showing the user's updated information
    }
  });
};

