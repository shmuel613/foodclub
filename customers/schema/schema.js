const mongoose = require('mongoose');

// {
//     "first": "Spencer",
//     "last": "Jones",
//     "employee_id": "123ABC",
//     "company_name": "AwesomeCo",
//     "phone": "123456789",
//     "email": "customer@awesomeco.com",
//     "address": "123 Where The Action Is Lane"
// }

let customers = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }
});

let Customers = mongoose.model('Customers', customers);

module.exports = Customers;
