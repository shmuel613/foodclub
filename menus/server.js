const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

const mPath = 'mongodb://db-menus:27017/data';
const mOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'menus',
    pass: 'm3nus'
};

mongoose.connect(mPath, mOptions);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error connecting to db-menus', err);
});

db.once('open', () => {
    console.log('menus database up and running!');
    app.listen(port, () => console.log(`Menus listening on port ${port}!`));
});
