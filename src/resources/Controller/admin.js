const express = require("express");
const router = express.Router();
const path = require('path')
const checkauth = require("../Middleware/checkadmin");
const AdminModel = require("../Model/admin")


const userRoutes = (app) => {
  router.get('/',checkauth.hightcheck,AdminModel.home)
  router.get('/login', (req, res) => {
    res.render('../../views/Admin/login.ejs',{message:null});
  })
  router.post('/login',AdminModel.login)

  router.get('/404',AdminModel.error)

  
  return app.use("/admin/", router)
}
module.exports = userRoutes

