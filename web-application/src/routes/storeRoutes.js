const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');


// Define routes here


router.get('/', storeController.listStores);
// router.get('/', (req, res) => {
//     var model = storeController.listStores(req, res)
//     console.log("hej", model);
//     res.render('stores', {model})
// });


router.get('/create', storeController.createStore);

router.get('/tete', (req, res) => {
    res.render('index', { title: 'tetete' });
  });

module.exports = router;

