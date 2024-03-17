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

exports.getStoreByTitle = (title,callback) => {
  console.log(title,"this trhis ")
  db.query('SELECT * FROM stores WHERE title = ?', [title], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    console.log(results, "tobbin2");
    callback(null, results[0] ?? null);
    
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
  