const mysql = require('mysql');
const fs = require('fs');
const stores = require('./stores.json');


const connection = mysql.createPool({
  connectionLimit: 20,
  host: 'db',  // This should match the service name in your docker-compose file
  user: 'user',
  password: 'password',
  database: 'mydatabase'
});


connection.query("CREATE TABLE IF NOT EXISTS stores ( \
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, \
  title VARCHAR(50) NOT NULL, \
  url VARCHAR(255) NOT NULL, \
  district VARCHAR(100), \
  content TEXT NOT NULL \
)", (error, results) => {
    if (error) {
        return console.error('error creating table:', error);
    }
    console.log('Table created or already exists');
});


connection.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`, (error, results) => {
  if (error) {
    return console.error('error creating users table:', error);
  }
  console.log('Users table created or already exists');
});


connection.query(`
  CREATE TABLE IF NOT EXISTS favorites (
    user_id INT UNSIGNED NOT NULL,
    store_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (user_id, store_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
  )
`, (error, results) => {
  if (error) {
    return console.error('error creating favorites table:', error);
  }
  console.log('Favorites table created or already exists');
});


stores.forEach(store => {
  const storeName = store.name || 'Default Name';
  
  connection.query('SELECT * FROM stores WHERE title = ?', [storeName], (error, results) => {
    if (error) {
      console.error('Error querying the database:', error);
      return;
    }

    if (results.length === 0) {
      console.log(`Inserting ${storeName}`);
      
      const storeUrl = store.url || 'Default URL';
      const storeDistrict = store.district || 'Default District';

      connection.query('INSERT INTO stores (title, url, district, content) VALUES (?, ?, ?, ?)', 
      [storeName, storeUrl, storeDistrict, 'Default content'], (insertError) => {
        if (insertError) {
          console.error('Error inserting store:', insertError);
        } else {
          console.log('Store inserted successfully');
        }
      });
    }
  });
});

module.exports = connection;
