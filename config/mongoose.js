const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friendface_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to DB"));

db.once('open', function(){
    console.log('Connectd to DB');
});

module.exports = db;