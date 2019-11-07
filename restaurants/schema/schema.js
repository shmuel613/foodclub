const mongoose = require('mongoose');

// { 5dc33e52d2c18862310edd5d
//     "name": "pizza penne",
//     "phone": "cucumber",
//     "address": "down the drain",
//     "description": "The best pizza place in town!"
// }

let restaurants = new mongoose.Schema({
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

let Restaurants = mongoose.model('Restaurants', restaurants);

module.exports = Restaurants;