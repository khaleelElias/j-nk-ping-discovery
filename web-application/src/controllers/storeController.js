
// const storeModel = rquire("./models/storeModel")
// You need to implement userModel.js and its methods
const storeModel = require('../models/storeModel');

exports.listStores = (req, res) => {
  storeModel.getAllStores((err, stores) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving stores." });
    } else {
      res.render("stores",{ stores });
    }
  });
};

exports.getStore = (req, res) => {
  storeModel.getStoreByTitle(req.params.title,(err, store) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving stores." });
    } else {
      res.render("storeDetails",{ store });
    }
  });
};

exports.createStore = (req, res) => {
    storeModel.createStore((err, stores) => {
      if (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving stores." });
      } else {
        res.send(stores.id);
      }
    });
  };