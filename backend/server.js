const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const users = require('./routes/api/users');
const app = express();
const port = process.env.PORT || 5000;

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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../todo-frontend/build'));
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
