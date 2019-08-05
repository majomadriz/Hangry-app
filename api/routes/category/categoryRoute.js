const express = require('express');
const router = express.Router();
const { createCategoryController, getCategoryController } = require('../../controllers/categoryController');

var routes = function(requiresLogin) {
    router.get('/', async(req, res) => {
        let response = await getCategoryController(req, res);
        res.json(response);
    });

    router.post('/', async(req, res, next) => {
        createCategoryController(req, res, next);
    });
    return router;
};

module.exports = routes;