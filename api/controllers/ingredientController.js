const Ingredient = require('mongoose').model('Ingredients');
const IngredientCategory = require('mongoose').model('ingredientCategories');

const getIngredientController = async(req, res) => {
    return Ingredient.find().exec()
        .then(function(result) {
            return { success: true, data: result };
        })
        .catch(function(error) {
            console.log(error)
            return ({
                error: true,
                code: err.code,
                message: err.errmsg
            });

        });
}

const getOneIngredientController = async(req, res) => {
    return Ingredient.findOne({ _id: req.params.id }).exec()
        .then(function(result) {
            return { success: true, data: result };
        })
        .catch(function(error) {
            console.log(error)
            return ({
                error: true,
                code: error.code,
                message: error.errmsg
            });

        });
}

const createIngredientController = (req, res) => {
    let ingredient = req.body;
    let newIngredient = new Ingredient(ingredient);
    Ingredient.create(newIngredient, (err, obj) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                let message = 'Duplicated Attribute';
                if (err.errmsg.includes('nombre')) message = 'Duplicated Name';
                return res.json({
                    error: true,
                    code: err.code,
                    message: message
                });
            }
            return res.json({
                error: true,
                code: err.code,
                message: err.errmsg
            });
        }
        return res.json({ success: true, data: obj });
    });
}

const getIngredientCategoryController = async(req, res) => {
    return IngredientCategory.find().exec()
        .then(function(result) {
            return { success: true, data: result };
        })
        .catch(function(error) {
            console.log(error)
            return ({
                error: true,
                code: error.code,
                message: error.errmsg
            });

        });
}

const createIngredientCategoryController = (req, res) => {
    let ingredientCategory = req.body;
    let newIngredientCategory = new IngredientCategory(ingredientCategory);
    IngredientCategory.create(newIngredientCategory, (err, obj) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                let message = 'Duplicated Attribute';
                if (err.errmsg.includes('nombre')) message = 'Duplicated Name';
                return res.json({
                    error: true,
                    code: err.code,
                    message: message
                });
            }
            return res.json({
                error: true,
                code: err.code,
                message: err.errmsg
            });
        }
        return res.json({ success: true, data: obj });
    });
}

module.exports = { getIngredientController, getOneIngredientController, createIngredientController, getIngredientCategoryController, createIngredientCategoryController };