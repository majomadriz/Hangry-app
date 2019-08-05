const userRoutes = require("./user/userRoute");
const categoryRoutes = require("./category/categoryRoute");
const ingredientRoutes = require("./ingredient/ingredientRoute");
const dishRoutes = require("./dish/dishRoute");
const appRoutes = (app, requiresLogin) => {
    app.use('/api/user', userRoutes(requiresLogin));
    app.use('/api/category', categoryRoutes(requiresLogin));
    app.use('/api/ingredient', ingredientRoutes(requiresLogin));
    app.use('/api/dish', dishRoutes(requiresLogin));
};

module.exports = appRoutes;