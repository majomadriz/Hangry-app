const Usuario = require('mongoose').model('Users');

// Para autenticar el usuario
module.exports.login = function(req, res, next) {
    console.log(req.body);
    Usuario.authenticate(req.body.email, req.body.password, function(error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            var userResponse = user.toObject();
            delete userResponse.password;
            req.session.userId = user._id;
            return res.json({
                success: true,
                data: userResponse
            });
        }
    })
}