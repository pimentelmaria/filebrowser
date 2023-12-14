// app.js

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use session for persistent login sessions
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Include your routes
app.use('/', authRoutes);

// Set up Sequelize with MySQL
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define User and Folder models
const User = require('./models/user')(sequelize);
const Folder = require('./models/folder')(sequelize);

// Sync models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

// Simple route for home page
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('home', { user: req.user });
  } else {
    res.render('login');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Other middleware and configuration...

// Start your server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
