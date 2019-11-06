const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Orders = require('../schema/schema');
const Utilities = require('../../utilities/utilities');

const checkModifyOkay = async (res, restId, orderId) => {
    const result = await Orders.findOne({
        restaurant_id: restId,
        _id: orderId
    });

    if (result.delivery_status !== 'queueing' && result.delivery_status !== 'processing') {
        res.json({
            type: 500,
            error: "Order can no longer be modified or cancelled"
        });
        return false;
    }

    return true;
};

/**** DELETE THE ORDERS OF A SPECIFIC RESTAURANT ****/
router.delete('/orders/:id', (req, res) => {
    Orders.deleteOne({
        restaurant_id: req.params.id
    }, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.deletedCount
            });
        }
    });
});

/**** DELETE THE SPECIFIC ORDER OF A SPECIFIC RESTAURANT ****/
router.delete('/orders/:id/item/:orderId', async (req, res) => {
    if (checkModifyOkay(res, req.params.id, req.params.orderId)) {
        Orders.deleteOne({
            restaurant_id: req.params.id,
            _id: req.params.orderId
        }, (err, data) => {
            if (!Utilities.handleErrorResponse(res, err)) {
                res.json({
                    count: data.deletedCount
                });
            }
        });
    }
});

/**** CREATE THE ORDERS OF A SPECIFIC RESTAURANT ****/
router.post('/orders/:id/customer/:customerId', (req, res) => {
    // make sure new order contains the restaurant id
    const now = new Date();
    let newOrdersObj = Object.assign(req.body, {
        restaurant_id: mongoose.Types.ObjectId(req.params.id),
        customer_id: mongoose.Types.ObjectId(req.params.customerId),
        created_on: now,
        modified_on: now
    });

    Orders.create(newOrdersObj, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json(data);
        }
    });
});

/**** UPDATE A SPECIFIC ORDER FROM A SPECIFIC CUSTOMER OF A SPECIFIC RESTAURANT ****/
router.put('/orders/:id/customer/:customerId/item/:orderId', async (req, res) => {
    if (await checkModifyOkay(res, req.params.id, req.params.orderId)) {
        const now = new Date();
        const updatedOrder = Object.assign({}, req.body, {
            modified_on: now
        });

        Orders.updateOne({
            restaurant_id: req.params.id,
            _id: req.params.orderId,
            customer_id: req.params.customerId
        }, updatedOrder, (err, data) => {
            if (!Utilities.handleErrorResponse(res, err)) {
                res.json({
                    count: data.nModified
                });
            }
        });
    }
});

/**** UPDATE A SPECIFIC ORDER OF A SPECIFIC RESTAURANT ****/
router.put('/orders/:id/item/:orderId', async (req, res) => {
    const now = new Date();
    const updatedOrder = Object.assign({}, req.body, {
        modified_on: now
    });

    Orders.updateOne({
        restaurant_id: req.params.id,
        _id: req.params.orderId
    }, updatedOrder, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.nModified
            });
        }
    });
});

/**** GET THE DELIVERY ORDERS OF A SPECIFIC RESTAURANT ****/
router.get('/orders/:id', async (req, res) => {
    const result = await Orders.findOne({
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });
    res.json(result);
});

router.get('/orders', async (req, res) => {
    const result = await Orders.find({});
    res.json(result);
});

router.use('/', (req, res) => {
    res.send("Orders are up and running");
});

module.exports = router;