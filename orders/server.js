const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

const mPath = 'mongodb://db-orders:27017/data';
const mOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'orders',
    pass: '0rd3rs'
};

mongoose.connect(mPath, mOptions);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error connecting to db-orders', err);
});

db.once('open', () => {
    console.log('orders database up and running!');
    app.listen(port, () => console.log(`Orders listening on port ${port}!`));
});
