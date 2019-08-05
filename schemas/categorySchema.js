const mongoose = require('mongoose');
const nameSchema = 'Categories';
var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    collection: categorySchema
});

module.exports = mongoose.model(nameSchema, categorySchema)