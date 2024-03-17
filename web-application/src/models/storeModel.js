const db = require('./db');

exports.getAllStores = (callback) => {
  db.query('SELECT * FROM stores', (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

exports.createStore = (callback, newStoreData) => {
    db.query('INSERT INTO stores SET ?', newStoreData, (error, results) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, results.id);
      });
  };
  