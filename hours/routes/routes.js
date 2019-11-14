const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Hours = require('../schema/schema');
const Utilities = require('../../utilities/utilities');

/**** DELETE THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.delete('/hours/:id', async (req, res) => {
    try {
        const data = await Hours.deleteOne({
            restaurant_id: req.params.id
        });
        res.json({
            count: data.deletedCount
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** CREATE THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.post('/hours/:id', async (req, res) => {
    // make sure new restaurant delivery times contains the restaurant id
    let newHoursObj = Object.assign(req.body, {
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });

    try {
        const data = await Hours.create(newHoursObj);
        res.json(data);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** UPDATE THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.put('/hours/:id', async (req, res) => {
    try {
        const data = await Hours.updateOne({
            restaurant_id: req.params.id
        });
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** GET THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.get('/hours/:id', async (req, res) => {
    try {
        const result = await Hours.findOne({
            restaurant_id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.get('/hours', async (req, res) => {
    try {
        const result = await Hours.find({});
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.use('/', (req, res) => {
    res.send("Hours are up and running");
});

module.exports = router;