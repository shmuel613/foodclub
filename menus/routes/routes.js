const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Menus = require('../schema/schema');
const Utilities = require('../../utilities/utilities');

// TODO: add abilities to:
//  - add a single menu item
//  - update a single menu item
//  - add a single menu item price
//  - update a single menu item price
//  - delete a single price from a menu item
//  - add ordering so that the menu items can be listed in a prescribed order
//  - add ordering so that the pricing can be listed in a prescribed order

/**** DELETE THE MENU ITEM FROM MENU OF A SPECIFIC RESTAURANT ****/
router.delete('/menus/:id/item/:itemId', async (req, res) => {
    try {
        const data = await Menus.updateOne({
            restaurant_id: req.params.id,
        }, {
            $pull: {
                "menu_items": {
                    "_id": mongoose.Types.ObjectId(req.params.itemId)
                }
            }
        });
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** DELETE THE MENU OF A SPECIFIC RESTAURANT ****/
router.delete('/menus/:id', async (req, res) => {
    try {
        const data = await Menus.deleteOne({
            restaurant_id: req.params.id
        });
        res.json({
            count: data.deletedCount
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** CREATE THE MENU OF A SPECIFIC RESTAURANT ****/
router.post('/menus/:id', async (req, res) => {
    // TODO: check to ensure each restaurant only has one menu
    // make sure new restaurant menu contains the restaurant id
    let newMenusObj = Object.assign(req.body, {
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });

    try {
        const data = await Menus.create(newMenusObj);
        res.json(data);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** UPDATE THE MENU OF A SPECIFIC RESTAURANT ****/
router.put('/menus/:id', async (req, res) => {
    try {
        const data = await Menus.updateOne({
            restaurant_id: req.params.id
        });
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

/**** ADD A NEW RATING TO A SPECIFIC MENU ITEM OF A SPECIFIC RESTAURANT ****/
router.put('/menus/:id/item/:itemId/rating', async (req, res) => {
    try {
        const data = await Menus.updateOne({
            "menu_items._id": mongoose.Types.ObjectId(req.params.itemId)
        }, {
            $push: {
                "menu_items.0.rating": req.body.rating
            }
        });
        res.json({
            count: data.nModified
        });
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});


/**** GET THE MENU OF A SPECIFIC RESTAURANT ****/
router.get('/menus/:id', async (req, res) => {
    try {
        const result = await Menus.findOne({
            restaurant_id: mongoose.Types.ObjectId(req.params.id)
        });
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.get('/menus', async (req, res) => {
    try {
        const result = await Menus.find({});
        res.json(result);
    } catch (err) {
        Utilities.handleErrorResponse(res, err);
    }
});

router.use('/', (req, res) => {
    res.json({"status": "Menus are up and running"});
});

module.exports = router;