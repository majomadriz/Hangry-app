const express = require('express');
const router = express.Router();
const { getIngredientController, getOneIngredientController, createIngredientController, getIngredientCategoryController, createIngredientCategoryController } = require('../../controllers/ingredientController');

var routes = function(requiresLogin) {
    router.get('/', async(req, res) => {
        let response = await getIngredientController(req, res);
        res.json(response);
    });

    router.post('/', async(req, res, next) => {
        createIngredientController(req, res, next);
    });

    router.get('/category', async(req, res) => {
        let response = await getIngredientCategoryController(req, res);
        res.json(response);
    });

    router.post('/category', async(req, res, next) => {
        createIngredientCategoryController(req, res, next);
    });

    router.get('/:id', async(req, res) => {
        let response = await getOneIngredientController(req, res);
        res.json(response);
    });
    return router;
};

module.exports = routes;