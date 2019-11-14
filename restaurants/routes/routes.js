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
router.delete('/restaurants/:id', async (req, res) => {
    try {
        //first delete specific restaurant data from all other services
        const services = ['hours', 'menus', 'orders'];
        const responses = await Promise.all(services.map(service => {
            return fetch(`http://app-${service}:${Utilities.servicePorts[service]}/${service}/${req.params.id}`, {
                method: 'DELETE',
                body: {}
            });
        }));
        const response200 = responses.reduce((acc, response) => {
            if (response.status !== 200) {
                acc = false;
            }
            return acc;
        }, true);

        //if all references deleted, delete restaurant
        const data = await Restaurant.deleteOne({
            _id: req.params.id
        });
        res.json({
            count: data.deletedCount
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** CREATE A SPECIFIC RESTAURANT ****/
router.post('/restaurants', async (req, res) => {
    if (checkRequiredFields(req, res)) {
        try {
            const data = await Restaurant.create(req.body);
            res.json(data);
        } catch (err) {
            Utilities.handleErrorResponse(res, err);
        }
    }
});

/**** UPDATE A SPECIFIC RESTAURANT ****/
router.put('/restaurants/:id', async (req, res) => {
    if (checkRequiredFields(req, res)) {
        try {
            const data = await Restaurant.updateOne({
                _id: mongoose.Types.ObjectId(req.params.id)
            }, req.body);
            res.json({
                count: data.nModified
            });
        } catch (err) {
            Utilities.handleErrorResponse(res, err);
        }
    }
});

/**** ADD A NEW RATING TO A RESTAURANT ****/
router.put('/restaurants/:id/rating', async (req, res) => {
    try {
        const data = await Restaurant.update({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, {
            $push: {
                "rating": req.body.rating
            }
        });
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** GET A SPECIFIC RESTAURANT ****/
router.get('/restaurants/:id', async (req, res) => {
    try {
        const result = await Restaurant.findOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.get('/restaurants', async (req, res) => {
    try {
        const result = await Restaurant.find({});
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.use('/', (req, res) => {
    res.send("Restaurants are up and running");
});

module.exports = router;