const express = require("express");
const router = express.Router();
// const path = require('path')
// const checkauth = require("../Middleware/checkuser");
const UserModel = require("../Model/user")


const userRoutes = (app) => {
  router.get('/',UserModel.home)
  // router.get('/products',checkauth.auth,UserModel.products)
  router.get('/products/:id',UserModel.products_detail)
  router.get('/cart/:id',UserModel.cart)
  router.post('/products/add',UserModel.addcart)
  router.post('/cart/delete',UserModel.deletecart)
  // router.post('/seach',checkauth.auth,UserModel.seach)
  // router.post('/sortseach',checkauth.auth,UserModel.sortseach)
  // router.post('/longseach',checkauth.auth,UserModel.longseach)

  // router.get('/registry',UserModel.get_registry)

  router.get('/404',UserModel.error)

  
  return app.use("/", router)
}
module.exports = userRoutes

