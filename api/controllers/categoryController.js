const Category = require('mongoose').model('Categories');

const getCategoryController = async(req, res) => {
    return Category.find().exec()
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

const createCategoryController = (req, res) => {
    let category = req.body;
    let newCategory = new Category(category);
    Category.create(newCategory, (err, obj) => {
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

module.exports = { getCategoryController, createCategoryController };