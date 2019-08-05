const mongoose = require('mongoose');
const nameSchema = 'Dishes';
var dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    steps: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
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
    ingredients: [{
        name: String,
        quantity: Number,
        price: Number,
    }],
}, {
    collection: dishSchema
});

module.exports = mongoose.model(nameSchema, dishSchema)