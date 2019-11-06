//  {
//     "order_items": [
//     {
//         "menu_item_id": {menu_item_id},
//         "quantity": 2,
//         "notes": "Extra cheese please"
//     },
//     {
//         "menu_item_id": {menu_item_id},
//         "quantity": 1
//     }
// ],
//     "notes": "Please deliver with utensils",
// };

const mongoose = require('mongoose');

let order_items = new mongoose.Schema({
    menu_item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    }
});

let orders = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    order_items: [order_items],
    notes: {
        type: String
    },
    created_on: {
        type: Date,
        required: true
    },
    modified_on: {
        type: Date,
        required: true
    },
    delivery_status: {
        type: String,
        enum: ['queueing', 'processing', 'delivering', 'delivered'],
        default: 'queueing'
    }
});

let Orders = mongoose.model('Orders', orders);

module.exports = Orders;