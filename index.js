const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('./schemas/userSchema');
require('./schemas/categorySchema');
require('./schemas/ingredientCategorySchema');
require('./schemas/ingredientSchema');
require('./schemas/dishSchema');
const appRoutes = require('./api/routes/routes.js');

// Para conectarse a la base de datos en mongo: Reemplazar  <password> con la contraseña de la cuenta de mongo, luego reemplazar la palabra después del "/" con el nombre del cluster en mongo, el default es test
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://majomadriz97:Lemonade24@cluster0-i54go.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false
});

// Creando servidor
const app = express();
const publicFolder = path.join(__dirname, 'public');
const port = process.env.PORT || 7000;


app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.session.userId);
    next();
});

app.get('/', function(req, res) {
    if (req.session.userId) {
        res.sendFile(path.join(publicFolder, 'home.html'));
    } else {
        res.sendFile(path.join(publicFolder, 'index.html'));
    }
});

appRoutes(app);

app.use(express.static(publicFolder));

app.use((req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        return res.redirect('/');
    }
});
app.get('/home', function(req, res) {
    res.sendFile(path.join(publicFolder, 'home.html'));
});

app.get('/categoryRegister', function(req, res) {
    res.sendFile(path.join(publicFolder, 'categoryRegister.html'));
});

app.get('/dishRegister', function(req, res) {
    res.sendFile(path.join(publicFolder, 'dishRegister.html'));
});

app.get('/dishDetail', function(req, res) {
    res.sendFile(path.join(publicFolder, 'dishDetail.html'));
});

app.get('/dishList', function(req, res) {
    res.sendFile(path.join(publicFolder, 'dishList.html'));
});

app.get('/ingredientCategoryRegister', function(req, res) {
    res.sendFile(path.join(publicFolder, 'ingredientCategoryRegister.html'));
});

app.get('/ingredientList', function(req, res) {
    res.sendFile(path.join(publicFolder, 'ingredientList.html'));
});

app.get('/ingredientDetail', function(req, res) {
    res.sendFile(path.join(publicFolder, 'ingredientDetail.html'));
});

app.get('/ingredientRegister', function(req, res) {
    res.sendFile(path.join(publicFolder, 'ingredientRegister.html'));
});

// Ruta para cerrar sesion
app.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

app.listen(port, function() {
    console.log(`Servidor corriendo en puerto ${port}...`);
});