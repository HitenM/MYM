const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'nasa-app';
const usersCollectionName = 'users';

// Connect to MongoDB
MongoClient.connect(mongoUrl, function(err, client) {
  if (err) throw err;

  const db = client.db(dbName);
  const usersCollection = db.collection(usersCollectionName);

  console.log('Connected to MongoDB');

  // Display the login page
  app.get('/', function(req, res) {
    res.render('login');
  });

  // Handle login form submission
  app function(req, res) {
    const { username, password } = req.body;

    usersCollection.findOne({ username, password }, function(err, user) {
      if (err) throw err;

      if (user) {
        // User found, redirect to the NASA image of the day page
        res.redirect('/image');
      } else {
        // User not found, display an error message
        res.render('login', { errorMessage: 'Invalid username or password' });
      }
    });
  });

  // Display the registration page
  app.get('/register', function(req, res) {
    res.render('register');
  });

  // Handle registration form submission
  app.post('/register', function(req, res) {
    const { username, password } = req.body;

    // Check if the username is already taken
    usersCollection.findOne({ username }, function(err, user) {
      if (err) throw err;

      if (user) {
        // Username already taken, display an error message
        res.render('register', { errorMessage: 'Username already taken' });
      } else {
        // Username available, insert the new user into the database and redirect to the login page
        usersCollection.insertOne({ username, password }, function(err, result) {
          if (err) throw err;

          res.redirect('/');
        });
      }
    });
  });

  // Display the NASA image of the day page
  app.get('/image', function(req, res) {
    // Make a request to NASA's API
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    // Render the page after the image is loaded
    const renderPage = function(data) {
      res.render('image', { imageUrl: data.url, imageTitle: data.title });
    };

    // Make the request to NASA's API and render the page
    require('https').get(apiUrl, function(response) {
      let data = '';

      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function() {
        renderPage(JSON.parse(data));
      });
    });
  });

  // Start the server
  app.listen(port, function() {
    console.log(`Server listening on port ${port}`);
  });
});

