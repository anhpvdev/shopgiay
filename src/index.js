const PORT = 8081
const express = require('express')
const app = express()

// app.set('view engine', 'ejs');
// app.set('views', './resources/views')
// config
const config = require("./config/config")
config(app)

// routes
const UserRoutes = require("./resources/Controller/user")
UserRoutes(app)
// const BuyerRoutes = require("./resources/Controller/buyer")
// BuyerRoutes(app)

app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`))
