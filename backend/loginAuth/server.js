const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URL; 

//connect to mongodb

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
//looging when connection established

connection.once('open', () => {
    console.log("MongoDB databse connection established!")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
