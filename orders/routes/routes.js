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
router.delete('/orders/:id', async (req, res) => {
    try {
        const data = await Orders.deleteOne({
            restaurant_id: req.params.id
        });
        res.json({
            count: data.deletedCount
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** DELETE THE SPECIFIC ORDER OF A SPECIFIC RESTAURANT ****/
router.delete('/orders/:id/item/:orderId', async (req, res) => {
    if (checkModifyOkay(res, req.params.id, req.params.orderId)) {
        try {
            const data = await Orders.deleteOne({
                restaurant_id: req.params.id,
                _id: req.params.orderId
            });
            res.json({
                count: data.deletedCount
            });
        } catch (err) {
            Utilities.handleErrorResponse(res, err);
        }
    }
});

/**** CREATE THE ORDERS OF A SPECIFIC RESTAURANT ****/
router.post('/orders/:id/customer/:customerId', async (req, res) => {
    // make sure new order contains the restaurant id
    const now = new Date();
    let newOrdersObj = Object.assign(req.body, {
        restaurant_id: mongoose.Types.ObjectId(req.params.id),
        customer_id: mongoose.Types.ObjectId(req.params.customerId),
        created_on: now,
        modified_on: now
    });

    try {
        const data = await Orders.create(newOrdersObj);
        res.json(data);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** UPDATE A SPECIFIC ORDER FROM A SPECIFIC CUSTOMER OF A SPECIFIC RESTAURANT ****/
router.put('/orders/:id/customer/:customerId/item/:orderId', async (req, res) => {
    if (await checkModifyOkay(res, req.params.id, req.params.orderId)) {
        const now = new Date();
        const updatedOrder = Object.assign({}, req.body, {
            modified_on: now
        });

        try {
            const data = await Orders.updateOne({
                restaurant_id: req.params.id,
                _id: req.params.orderId,
                customer_id: req.params.customerId
            }, updatedOrder);
            res.json({
                count: data.nModified
            });
        } catch (err) {
            Utilities.handleErrorResponse(res, err);
        }
    }
});

/**** UPDATE A SPECIFIC ORDER OF A SPECIFIC RESTAURANT ****/
router.put('/orders/:id/item/:orderId', async (req, res) => {
    const now = new Date();
    const updatedOrder = Object.assign({}, req.body, {
        modified_on: now
    });

    try {
        const data = await Orders.updateOne({
            restaurant_id: req.params.id,
            _id: req.params.orderId
        }, updatedOrder);
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** GET THE DELIVERY ORDERS OF A SPECIFIC RESTAURANT ****/
router.get('/orders/:id', async (req, res) => {
    try {
        const result = await Orders.findOne({
            restaurant_id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.get('/orders', async (req, res) => {
    try {
        const result = await Orders.find({});
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.use('/', (req, res) => {
    res.send("Orders are up and running");
});

module.exports = router;