const mongoose = require('mongoose');
const nameSchema = 'Users';
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    collection: nameSchema
});

//Autenticar el input contra la base de datos (busca el usuario para saber si existe y si la contrasena es correcta)
userSchema.statics.authenticate = function(email, password, callback) {
    const Usuario = require('mongoose').model('Users');
    Usuario.findOne({
            email: email
        })
        .exec(async function(err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('Usuario no encontrado.');
                err.status = 401;
                return callback(err);
            }
            if (user.password === password) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
}

module.exports = mongoose.model(nameSchema, userSchema)