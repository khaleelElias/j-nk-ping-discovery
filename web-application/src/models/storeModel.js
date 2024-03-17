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
    callback(null, results[0] ?? null);
    
  });
};

exports.addFavoriteStore = (userId, storeId, callback) => {
  const query = 'INSERT INTO favorites (user_id, store_id) VALUES (?, ?)';
  db.query(query, [userId, storeId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, 'Store added to favorites successfully');
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

  exports.removeFavoriteStore = (userId, storeId, callback) => {
    const query = 'DELETE FROM favorites WHERE user_id = ? AND store_id = ?';
    db.query(query, [userId, storeId], (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, 'Store removed from favorites successfully');
    });
  };

  exports.isStoreFavorited = (userId, storeId, callback) => {
    db.query('SELECT * FROM favorites WHERE user_id = ? AND store_id = ?', [userId, storeId], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        const isFavorited = results.length > 0;
        callback(null, isFavorited);
      }
    });
  };
  