const express = require('express');
const app = express();
const port = 8091;

/**** ROUTES HANDLING ****/
const routes = require('./routes/routes');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(routes);

app.listen(port, () => console.log(`web api listening on port ${port}!`));