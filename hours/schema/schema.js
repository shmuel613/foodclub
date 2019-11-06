const mongoose = require('mongoose');

// {
//     "sunday_open": "09:00",
//     "sunday_close": "23:30",
//     "monday_open": "09:00",
//     "monday_close": "23:30",
//     "tuesday_open": "09:00",
//     "tuesday_close": "23:30",
//     "wednesday_open": "09:00",
//     "wednesday_close": "23:30",
//     "thursday_open": "09:00",
//     "thursday_close": "23:30",
//     "friday_open": "09:00",
//     "friday_close": "23:30",
//     "saturday_open": "09:00",
//     "saturday_close": "23:30",
//     "notes": "Closed on holidays"
// }

let hours = new mongoose.Schema({
    sunday_open: {
        type: String
    },
    sunday_close: {
        type: String
    },
    monday_open: {
        type: String
    },
    monday_close: {
        type: String
    },
    tuesday_open: {
        type: String
    },
    tuesday_close: {
        type: String
    },
    wednesday_open: {
        type: String
    },
    wednesday_close: {
        type: String
    },
    thursday_open: {
        type: String
    },
    thursday_close: {
        type: String
    },
    friday_open: {
        type: String
    },
    friday_close: {
        type: String
    },
    saturday_open: {
        type: String
    },
    saturday_close: {
        type: String
    },
    notes: {
        type: String
    }
});

let Hours = mongoose.model('Hours', hours);

module.exports = Hours;