const mongoose = require('mongoose');

// {
//     "name": "pizza penne",
//     "phone": "cucumber",
//     "address": "down the drain",
//     "description": "The best pizza place in town!"
// }

let customers = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: [Number]
    }
});

let Customers = mongoose.model('Customers', customers);

module.exports = Customers;