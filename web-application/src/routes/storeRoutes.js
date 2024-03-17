const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const storeModel = require('../models/storeModel')



// Define routes here

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/user/login');
}

router.get('/', storeController.listStores);
// router.get('/', (req, res) => {
//     var model = storeController.listStores(req, res)
//     console.log("hej", model);
//     res.render('stores', {model})
// });


router.post('/:storeId/favorite', isAuthenticated, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  storeModel.addFavoriteStore(req.session.user.id, req.params.storeId, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.redirect('/stores'); // Redirect back to stores or to a confirmation page
    }
  });
});

router.get('/api/stores', (req, res) => {
  storeModel.getAllStores((err, stores) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving stores", error: err });
    } else {
      res.status(200).json(stores);
    }
  });
});

router.post('/:storeId/unfavorite', isAuthenticated, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  storeModel.removeFavoriteStore(req.session.user.id, req.params.storeId, (err, message) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.redirect('/user/userPage'); // Redirect back to the user page or a confirmation page
    }
  });
});


router.get('/create', storeController.createStore);

router.get('/tete', (req, res) => {
    res.render('index', { title: 'tetete' });
  });

router.get('/:title', storeController.getStore);

module.exports = router;

