const systemconfig = require("../../config/system")

const dashboardRouters = require("./dashboard.route")
const productRoutes = require("./products.route")

 
module.exports = (app) => {
    const PATH_ADMIN = systemconfig.prefixadmin


    app.use(PATH_ADMIN + "/dashboard", dashboardRouters)
    app.use(PATH_ADMIN + "/products", productRoutes)
}