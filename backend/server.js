const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const users = require('./routes/api/users');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
app.use(cors());
app.use(express.json());

const url = require("./config/keys").mongoURI; 

//connect to mongodb

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

//looging when connection established
connection.once('open', () => {
    console.log("MongoDB databse connection established!")
});
mongoose.set('useFindAndModify', false);
//importing endpoints user

//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    console.log('from production');
    app.use(express.static(path.join(__dirname, '../todo-frontend/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../todo-frontend/build', 'index.html'));
    });
  }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
