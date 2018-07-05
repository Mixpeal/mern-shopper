const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

//DATABASE CONFIG 
const db = require('./config/key').mongoURI;

//connect to mongo
mongoose.connect(db)
    .then(()=> console.log("mongoDB is connected"))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));