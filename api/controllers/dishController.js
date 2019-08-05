const Dish = require('mongoose').model('Dishes');


const getOneDishController = async(req, res) => {
    return Dish.findOne({ _id: req.params.id }).exec()
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

const getDishController = async(req, res) => {
    return Dish.find().exec()
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

const getByCategoryController = async(req, res) => {
    return Dish.find({ category: req.params.category }).exec()
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

const createDishController = (req, res) => {
    let dish = req.body;
    if (!req.body.ingredients.length > 0) {
        return res.json({
            error: true,
            code: err.code,
            message: err.errmsg
        });
    }
    let newDish = new Dish(dish);
    Dish.create(newDish, (err, obj) => {
        if (err) {
            console.log(err);
            return res.json({
                error: true,
                code: err.code,
                message: err.errmsg
            });
        }
        return res.json({ success: true, data: obj });
    });
}

module.exports = { getDishController, createDishController, getOneDishController, getByCategoryController };