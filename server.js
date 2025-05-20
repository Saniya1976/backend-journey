const express = require('express');
const morgan = require('morgan');


const mongoose = require('mongoose');
const User = require('./models/user');

const dbconnection=require('./config/db'); // Assuming you have a db.js file for database connection
const server = express();

// Built-in middleware to parse JSON bodies
server.use(express.json());

// Built-in middleware to parse URL-encoded bodies (like form submissions)
server.use(express.urlencoded({ extended: true }));

// Third-party middleware for logging HTTP requests
server.use(morgan('dev'));

// Custom middleware example: logs the current timestamp for every request
server.use((req, res, next) => {
  console.log("hello babe this is middleware");
  next(); // pass control to the next middleware or route handler
});

// Root route handler
server.get('/', (req, res) => {
  res.send('hello world');
});

// About page route handler
server.get('/about', (req, res) => {
  res.send('hello babe this is about page');
});

// 404 Middleware (catch-all for undefined routes)
server.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error-handling middleware (for any errors thrown in routes/middleware)
server.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

server.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});
