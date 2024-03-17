const { Store } = require('express-session');
const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;




exports.createUser = (username, password, callback) => {
  if (!username || !password) {
    return callback(new Error("Username and password are required"), null);
  }

  // Check if user already exists
  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) return callback(error, null);
    if (results.length > 0) return callback(new Error("Username already exists"), null);

    // Proceed with user creation
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return callback(err, null);

      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (error, results) => {
        if (error) return callback(error, null);
        return callback(null, "User created successfully");
      });
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

exports.updateUser = (userId, newUsername, newPassword, callback) => {
  bcrypt.hash(newPassword, saltRounds, (err, hash) => {
    if (err) {
      callback(err, null);
      return;
    }

    const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
    db.query(query, [newUsername, hash, userId], (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, "User updated successfully");
    });
  });
};

exports.deleteUser = (userId, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, 'User deleted successfully');
  });
};

exports.getFavoriteStores = (userId, callback) => {
  const query = `
    SELECT s.* FROM favorites f
    JOIN stores s ON f.store_id = s.id
    WHERE f.user_id = ?`;
  db.query(query, [userId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

