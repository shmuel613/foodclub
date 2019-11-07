const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

const mPath = 'mongodb://db-restaurants:27017/data';
const mOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'restaurants',
    pass: 'r3st4ur4nts'
};

mongoose.connect(mPath, mOptions);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error connecting to db-restaurants', err);
});

db.once('open', () => {
    console.log('restaurants database up and running!');
    app.listen(port, () => console.log(`Restaurants listening on port ${port}!`));
});
