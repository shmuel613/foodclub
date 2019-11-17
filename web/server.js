const express = require('express');
const app = express();
const port = 8091;
const fetch = require("node-fetch");

const servicePorts = {
    restaurants: 3000,
    hours: 4000,
    menus: 5000,
    orders: 8080,
    customers: 7000
};

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

app.listen(port, () => console.log(`web api listening on port ${port}!`));