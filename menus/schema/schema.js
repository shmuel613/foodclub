const mongoose = require('mongoose');

// {
//     "menu_items": [{
//             "category": "pizza",
//             "name": "pizza parmegano",
//             "description": "a delicious-a pizza",
//             "prices": [{
//                     "price": 21.00,
//                     "size": "largo"
//                 },
//                 {
//                     "price": 17.00,
//                     "size": "mediumoso"
//                 },
//                 {
//                     "price": 12.00,
//                     "size": "teeny tiny"
//                 }
//             ],
//             "notes": "abasolutely delicious!"
//         },
//         {
//             "category": "calzone",
//             "name": "mushroom calzone",
//             "description": "a delicious-a calzone",
//             "prices": [{
//                     "price": 22.00,
//                     "size": "largo"
//                 },
//                 {
//                     "price": 18.00,
//                     "size": "mediumoso"
//                 },
//                 {
//                     "price": 14.00,
//                     "size": "teeny tiny"
//                 }
//             ],
//             "notes": "abasolutely delicious!!"
//         }
//     ],
//     "notes": "All food items freshly prepared"
// }

let price = new mongoose.Schema({
    price: {type: String, requied: true},
    size: {type: String}
});

let menu_item = new mongoose.Schema({
    category: {type: String},
    name: {type: String, required: true},
    description: {type: String},
    prices: [price],
    rating: [Number],
    notes: {type: String}
});

let menus = new mongoose.Schema({
    restaurant_id: mongoose.Schema.Types.ObjectId,
    menu_items: [menu_item],
    notes: {type: String}
});

let Menus = mongoose.model('Menus', menus);

module.exports = Menus;