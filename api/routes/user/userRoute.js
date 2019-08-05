const express = require('express');
const router = express.Router();
const { login } = require('../../controllers/userController');

var routes = function(requiresLogin) {
    router.post('/login', async(req, res, next) => {
        login(req, res, next);
    });
    return router;
};

module.exports = routes;