const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Restaurant = require('../schema/schema');
const fetch = require("node-fetch");
const Utilities = require('../../utilities/utilities');

function checkRequiredFields(req, res) {
    if (req.body && !req.body.name) {
        Utilities.handleErrorResponse(res, {
            type: 'Missing Name',
            error: 'Missing restaurant name.  Restaurant could not be created.'
        });
        return false;
    } else if (req.body && !req.body.phone) {
        Utilities.handleErrorResponse(res, {
            type: 'Missing Phone',
            error: 'Missing restaurant phone number.  Restaurant could not be created.'
        });
        return false;
    } else if (req.body && !req.body.address) {
        Utilities.handleErrorResponse(res, {
            type: 'Missing Address',
            error: 'Missing restaurant address.  Restaurant could not be created.'
        });
        return false;
    }
    return true;
}

/**** DELETE A SPECIFIC RESTAURANT ****/
router.delete('/restaurants/:id', (req, res) => {
    // TODO: convert to use Promise.all for removing restaurant data in other services
    //first delete specific restaurant data from all other services
    fetch(`http://0.0.0.0:4000/hours/${req.params.id}`, { // hours service
        method: 'DELETE',
        body: {}
    }).then(response => {
        // TODO: handle errors from delete requests
        if (response.status === 200) {
            fetch(`http://0.0.0.0:5000/menus/${req.params.id}`, { // hours service
                method: 'DELETE',
                body: {}
            }).then(response => {
                if (response.status === 200) {
                    Restaurant.deleteOne({
                        _id: req.params.id
                    }, (err, data) => {
                        if (!Utilities.handleErrorResponse(res, err)) {
                            res.json({
                                count: data.deletedCount
                            });
                        }
                    });
                }
            });
        }
    });

});

/**** CREATE A SPECIFIC RESTAURANT ****/
router.post('/restaurants', (req, res) => {
    if (checkRequiredFields(req, res)) {
        Restaurant.create(req.body, (err, data) => {
            if (!Utilities.handleErrorResponse(res, err)) {
                res.json(data);
            }
        });
    }
});

/**** UPDATE A SPECIFIC RESTAURANT ****/
router.put('/restaurants/:id', (req, res) => {
    if (checkRequiredFields(req, res)) {
        Restaurant.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, req.body, (err, data) => {
            if (!Utilities.handleErrorResponse(res, err)) {
                res.json({
                    count: data.nModified
                });
            }
        });
    }
});

/**** ADD A NEW RATING TO A RESTAURANT ****/
router.put('/restaurants/:id/rating', (req, res) => {
    Restaurant.update({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, {
        $push: {
            "rating": req.body.rating
        }
    }, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.nModified
            });
        }
    });
});

/**** GET A SPECIFIC RESTAURANT ****/
router.get('/restaurants/:id', async (req, res) => {
    const result = await Restaurant.findOne({
        _id: mongoose.Types.ObjectId(req.params.id)
    });
    res.json(result);
});

router.get('/restaurants', async (req, res) => {
    const result = await Restaurant.find({});
    res.json(result);
});

router.use('/', (req, res) => {
    res.send("Restaurants are up and running");
});

module.exports = router;