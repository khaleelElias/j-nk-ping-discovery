const express = require('express');
const router = express.Router();
const storeModel = require('../models/storeModel')


router.get('/', (req, res) => {
  storeModel.getAllStores((err, stores) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving stores", error: err });
    } else {
      res.status(200).json(stores);
    }
  });
});



module.exports = router;

