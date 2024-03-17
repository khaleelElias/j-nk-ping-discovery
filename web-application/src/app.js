const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

// app.js
// Importing routes
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');

// Set up Handlebars as the view engine
app.engine('hbs', engine({
  extname: '.hbs', // Use .hbs files for views
  defaultLayout: 'main', // Use main.hbs as the default layout
}));
app.set('view engine', 'hbs');
app.set('views', './views'); // Specify where to find the view files

// Middleware to parse request bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serving static files
app.use(express.static('public'));

// Using the imported routes
app.use('/users', userRoutes);
app.use('/stores', storeRoutes);

// Root route that renders the index view
app.get('/', (req, res) => {
  res.render('index', { title: 'Hello, World!' });
});

// 404 Error handler
app.use((req, res) => {
  res.status(404).render('error', { title: '404: Page Not Found' });
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
