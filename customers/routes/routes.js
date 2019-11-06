const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Customers = require('../schema/schema');
const Utilities = require('../../utilities/utilities');

/**** DELETE A CUSTOMER ****/
router.delete('/cusomters/:id', (req, res) => {
    Customers.deleteOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.deletedCount
            });
        }
    });
});

/**** CREATE A CUSTOMER ****/
router.post('/customers', (req, res) => {
    Customers.create(req.body, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json(data);
        }
    });
});

/**** UPDATE A CUSTOMER ****/
router.put('/customers/:id', (req, res) => {
    Customers.updateOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, req.body, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.nModified
            });
        }
    });
});

/**** GET THE DELIVERY CUSTOMERS OF A SPECIFIC RESTAURANT ****/
router.get('/customers/:id', async (req, res) => {
    const result = await Customers.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    });
    res.json(result);
});

router.get('/customers', async (req, res) => {
    const result = await Customers.find({});
    res.json(result);
});

router.use('/', (req, res) => {
    res.send("Customers are up and running");
});

module.exports = router;