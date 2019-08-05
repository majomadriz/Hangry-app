const express = require('express');
const router = express.Router();
const { createDishController, getDishController, getOneDishController, getByCategoryController } = require('../../controllers/dishController');

var routes = function(requiresLogin) {
    router.get('/', async(req, res) => {
        let response = await getDishController(req, res);
        res.json(response);
    });

    router.post('/', async(req, res, next) => {
        createDishController(req, res, next);
    });

    router.get('/:id', async(req, res, next) => {
        let response = await getOneDishController(req, res);
        res.json(response);
    });
    router.get('/findByCategory/:category', async(req, res, next) => {
        let response = await getByCategoryController(req, res);
        res.json(response);
    });
    return router;
};

module.exports = routes;