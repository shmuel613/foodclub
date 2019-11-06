const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

const mPath = 'mongodb://0.0.0.0:4500/data';
const mOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: 'hours',
    pass: 'h0urs'
};

mongoose.connect(mPath, mOptions);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error connecting to db-hours', err);
});

db.once('open', () => {
    console.log('hours database up and running!');
    app.listen(port, () => console.log(`Hours listening on port ${port}!`));
});
