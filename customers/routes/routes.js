const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Customers = require('../schema/schema');
const Utilities = require('../../utilities/utilities');

/**** DELETE A CUSTOMER ****/
router.delete('/cusomters/:id', async (req, res) => {
    try {
        const data = await Customers.deleteOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json({
            count: data.deletedCount
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** CREATE A CUSTOMER ****/
router.post('/customers', async (req, res) => {
    try {
        const data = await Customers.create(req.body);
        res.json(data);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** UPDATE A CUSTOMER ****/
router.put('/customers/:id', async (req, res) => {
    try {
        const data = await Customers.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** GET THE DELIVERY CUSTOMERS OF A SPECIFIC RESTAURANT ****/
router.get('/customers/:id', async (req, res) => {
    try {
        const result = await Customers.findOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.get('/customers', async (req, res) => {
    try {
        const result = await Customers.find({});
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.use('/', (req, res) => {
    res.json({"status": "Customers are up and running"});
});

module.exports = router;