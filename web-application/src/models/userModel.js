const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

exports.createUser = (username, password, callback) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      callback(err, null);
      return;
    }

    // Store the hash in your database
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, "User created successfully");
    });
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

