const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const storeModel = require('../models/storeModel')




function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/user/login');
}

router.get('/', storeController.listStores);



router.post('/:storeId/favorite', isAuthenticated,storeController.toggleFavoriteStore, (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  storeModel.addFavoriteStore(req.session.user.id, req.params.storeId, (err, message) => {
    if (err) {
      return res.render('stores', {message: err.message});
    } else {
      return res.redirect('/stores');
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

