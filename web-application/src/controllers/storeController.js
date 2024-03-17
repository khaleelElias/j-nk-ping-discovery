
// const storeModel = rquire("./models/storeModel")
// You need to implement userModel.js and its methods
const storeModel = require('../models/storeModel');

exports.listStores = (req, res) => {
  storeModel.getAllStores((err, stores) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving stores." });
    } else {
      // Pass the isLoggedIn status to the view
      res.render("stores", { 
        stores: stores,
        isLoggedIn: req.session.user ? true : false 
      });
    }
  });
};

exports.getStore = (req, res) => {
  storeModel.getStoreByTitle(req.params.title, (err, store) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving the store." });
    } else {
      // Pass the isLoggedIn status to the view
      res.render("storeDetails", { 
        store: store,
        isLoggedIn: req.session.user ? true : false 
      });
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