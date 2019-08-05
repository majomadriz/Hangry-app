const mongoose = require('mongoose');
const nameSchema = 'Ingredients';
var ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    collection: ingredientSchema
});

module.exports = mongoose.model(nameSchema, ingredientSchema)