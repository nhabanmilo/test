const express = require("express")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("express-flash")

require("dotenv").config()

const database = require("./config/database")

const systemconfig = require("./config/system")

const routeAdmin = require("./routes/admin/index.route")
const route = require("./routes/client/index.route")


database.connect()

const app = express()
const port = process.env.PORT

app.use(methodOverride("_method"))

app.use(bodyParser.urlencoded({ extended: false }))

//puplic
app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

app.use(cookieParser("LLLSLSLS"))
app.use(session({ cookie: { maxAge: 60000 } }))
app.use(flash())

app.locals.prefixadmin = systemconfig.prefixadmin


// app.use(express.static("public")) //link o file pug thoi, online no ko hieu public la gi
app.use(express.static(`${__dirname}/public`))

//route
route(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})