// You need to implement userModel.js and its methods
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const db = require("../models/db");



exports.createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    let errors = [];
    if (!username) errors.push("Username is required.");
    if (!password) errors.push("Password is required.");
    return res.status(400).render("createAccount", { errors, username, password });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      return res.status(500).render("createAccount", { errors: ["Internal server error"], username, password });
    }

    if (results.length > 0) {
      return res.status(400).render("createAccount", { errors: ["Username already exists."], username, password });
    } else {
      userModel.createUser(username, password, (err, message) => {
        if (err) {
          return res.status(500).render("createAccount", { errors: [err.message || "Internal server error"], username, password });
        } else {
          return res.redirect('/user/login');
        }
      });
    }
  });
};


exports.deleteUser = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/login');
  }

  userModel.deleteUser(req.session.user.id, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      req.session.destroy(); 
      return res.redirect('/user/login');
    }
  });
};


exports.updateUser = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/login');  
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
      return res.redirect('/user/login'); 
    }
  });
};


exports.authenticateUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).render("login", { errors: ["Username and password are required"], username, password });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      return res.status(500).render("login", { errors: ["Internal server error"], username, password });
    }

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).render("login", { errors: ["Invalid username or password"], username, password });
        }

        req.session.user = { id: results[0].id, username: username };
        return res.redirect('/');
      });
    } else {
      return res.status(404).render("login", { errors: ["User not found"], username, password });
    }
  });
};




