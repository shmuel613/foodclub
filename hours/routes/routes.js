const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Hours = require('../schema/schema');
const Utilities = require('../../utilities/utilities');

/**** DELETE THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.delete('/hours/:id', (req, res) => {
    Hours.deleteOne({
        restaurant_id: req.params.id
    }, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.deletedCount
            });    
        }    
    });    
});    

/**** CREATE THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.post('/hours/:id', (req, res) => {
    // make sure new restaurant delivery times contains the restaurant id
    let newHoursObj = Object.assign(req.body, {
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });    

    Hours.create(newHoursObj, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json(data);
        }    
    });    
});    

/**** UPDATE THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.put('/hours/:id', (req, res) => {
    Hours.updateOne({
        restaurant_id: req.params.id
    }, req.body, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.nModified
            });    
        }    
    });    
});    

/**** GET THE DELIVERY HOURS OF A SPECIFIC RESTAURANT ****/
router.get('/hours/:id', async (req, res) => {
    const result = await Hours.findOne({
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });
    res.json(result);
});

router.get('/hours', async (req, res) => {
    const result = await Hours.find({});
    res.json(result);
});

router.use('/', (req, res) => {
    res.send("Hours are up and running");
});

module.exports = router;