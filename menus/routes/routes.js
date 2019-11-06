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
router.delete('/menus/:id/item/:itemId', (req, res) => {
    Menus.updateOne({
        restaurant_id: req.params.id,
    }, {
        $pull: {
            "menu_items": {
                "_id": mongoose.Types.ObjectId(req.params.itemId)
            }
        }
    }, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.nModified
            });
        }
    });
});

/**** DELETE THE MENU OF A SPECIFIC RESTAURANT ****/
router.delete('/menus/:id', (req, res) => {
    Menus.deleteOne({
        restaurant_id: req.params.id
    }, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.deletedCount
            });
        }
    });
});

/**** CREATE THE MENU OF A SPECIFIC RESTAURANT ****/
router.post('/menus/:id', (req, res) => {
    // TODO: check to ensure each restaurant only has one menu
    // make sure new restaurant menu contains the restaurant id
    let newMenusObj = Object.assign(req.body, {
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });

    Menus.create(newMenusObj, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json(data);
        }
    });
});

/**** UPDATE THE MENU OF A SPECIFIC RESTAURANT ****/
router.put('/menus/:id', (req, res) => {
    Menus.updateOne({
        restaurant_id: req.params.id
    }, req.body, (err, data) => {
        if (!Utilities.handleErrorResponse(res, err)) {
            res.json({
                count: data.nModified
            });
        }
    });
});

/**** ADD A NEW RATING TO A SPECIFIC MENU ITEM OF A SPECIFIC RESTAURANT ****/
router.put('/menus/:id/item/:itemId/rating', (req, res) => {
    Menus.updateOne({
            "menu_items._id": mongoose.Types.ObjectId(req.params.itemId)
        }, {
            $push: {
                "menu_items.0.rating": req.body.rating
            }
        },
        (err, data) => {
            if (!Utilities.handleErrorResponse(res, err)) {
                res.json({
                    count: data.nModified
                });
            }
        });
});


/**** GET THE MENU OF A SPECIFIC RESTAURANT ****/
router.get('/menus/:id', async (req, res) => {
    const result = await Menus.findOne({
        restaurant_id: mongoose.Types.ObjectId(req.params.id)
    });
    res.json(result);
});

router.get('/menus', async (req, res) => {
    const result = await Menus.find({});
    res.json(result);
});

router.use('/', (req, res) => {
    res.send("Menus are up and running");
});

module.exports = router;