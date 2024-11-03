const express = require("express");
const router = express.Router();
const path = require('path')
const checkauth = require("../Middleware/checkuser");
const UserModel = require("../Model/user")


const userRoutes = (app) => {
  router.get('/',checkauth.lowcheck,UserModel.home)
  // router.get('/products',checkauth.auth,UserModel.products)
  router.get('/products/:id',checkauth.lowcheck,UserModel.products_detail)
  router.get('/cart',checkauth.hightcheck,UserModel.cart)
  router.post('/products/add',checkauth.hightcheck,UserModel.addcart)
  router.post('/products/delete',checkauth.hightcheck,UserModel.deletecart)


  router.get('/registry', (req, res) => {
    res.render('../../views/Users/registry.ejs',{message:null});
  })
  router.post('/registry',UserModel.registry)

  router.get('/login', (req, res) => {
    res.render('../../views/Users/login.ejs',{message:null});
  })
  router.post('/login',UserModel.login)
  router.get('/logout',UserModel.logout)
  // router.post('/sortseach',checkauth.auth,UserModel.sortseach)
  // router.post('/longseach',checkauth.auth,UserModel.longseach)

  // router.get('/registry',UserModel.get_registry)

  router.get('/404',UserModel.error)

  
  return app.use("/", router)
}
module.exports = userRoutes

