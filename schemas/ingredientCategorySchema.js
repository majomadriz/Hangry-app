const mongoose = require('mongoose');
const nameSchema = 'ingredientCategories';
var ingredientCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    collection: nameSchema
});

module.exports = mongoose.model(nameSchema, ingredientCategorySchema)