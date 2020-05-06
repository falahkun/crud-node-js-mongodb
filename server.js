const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./app/routes/routes');
const fs = require('fs');
const path = require('path');

let mongoUrl = "mongodb://localhost:27017/crud";

const mongoDB = mongoUrl;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;;

const db = mongoose.connection;

db.on('Error', console.error.bind(console, "Koneksi error!"));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

// app.get('/images', (req, res) => {
//     fs.readFile("publics/images/" + req.params.image, function(err, data) {
//         if(err) 
//         res.end();
//     });
// })

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});