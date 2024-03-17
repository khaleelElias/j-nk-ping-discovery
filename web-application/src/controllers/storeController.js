
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

exports.createStore = (req, res) => {
    storeModel.createStore((err, stores) => {
      if (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving stores." });
      } else {
        res.send(stores.id);
      }
    });
  };
// module.exports = function({ storeModel }) {

//     const exports = {}

//     exports.getAllStores = function(callback) {
//         console.log("this happend ");
//         storeModel.getAllStores(callback)
//     }

//     exports.createStore = function(store, callback) {

        
//         storeModel.createStore(store, callback)

//     }

//     exports.getStoreByName = function(name, callback) {
//         storeModel.getStoreByName(name, callback)
//     }

//     return exports
// }