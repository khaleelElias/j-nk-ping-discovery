const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');


// app.js
// Importing routes
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();


// Set up Handlebars as the view engine
app.engine('hbs', engine({
  extname: '.hbs', // Use .hbs files for views
  defaultLayout: 'main', // Use main.hbs as the default layout
}));
app.set('view engine', 'hbs');
app.set('views', './views'); // Specify where to find the view files

// Session middleware setup should be here
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' } // Make sure to set to false if you're not using HTTPS
}));

// Middleware to parse request bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serving static files
app.use(express.static('public'));

// Importing routes

// Using the imported routes
app.use('/user', userRoutes);
app.use('/stores', storeRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/', storeRoutes);


// Root route that renders the index view
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Hello, World!',
    isLoggedIn: req.session.user ? true : false 
  });
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
