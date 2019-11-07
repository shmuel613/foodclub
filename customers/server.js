const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 7000;

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

const mPath = 'mongodb://db-customers:27017/data';
const mOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'customers',
    pass: 'cust0m3rs'
};

mongoose.connect(mPath, mOptions);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error connecting to db-customers', err);
});

db.once('open', () => {
    console.log('customer database up and running!');
    app.listen(port, () => console.log(`Customer listening on port ${port}!`));
});
