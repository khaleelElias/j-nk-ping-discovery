
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
      res.render("storeDetails", { 
        store: store,
        isLoggedIn: req.session.user ? true : false 
      });
    }
  });
};


  exports.toggleFavoriteStore = (req, res) => {
    const userId = req.session.user.id;
    const storeId = req.params.storeId;
  
    storeModel.isStoreFavorited(userId, storeId, (err, isFavorited) => {
      if (err) {
        return res.status(500).render("stores", { errors: ["Internal server error"] });
      }
  
      if (isFavorited) {
        storeModel.getAllStores((err, stores) => {
          if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving stores." });
          } else {
            // Pass the isLoggedIn status to the view
            res.render("stores", { 
              errors: ["Store is already in favorites"],
              stores: stores,
              isLoggedIn: req.session.user ? true : false 
            });
          }
        })
      } else {
        storeModel.addFavoriteStore(userId, storeId, (err, message) => {
          if (err) {
            return res.status(500).render("stores", { errors: [err.message || "Internal server error"] });
          } else {
            return res.redirect('/stores'); 
          }
        });
      }
    });
  };
  
