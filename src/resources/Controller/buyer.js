const express = require("express");
const router = express.Router();
const path = require('path')
const checkauth = require("../Middleware/checkuser");
const BuyerModel = require("../Model/buyer")
const avatarupload = require("../Middleware/Uploads/avatar");



const BuyerRoutes = (app) => {
  // router.get('/profile',checkauth.buyer,BuyerModel.get_profile)
  // router.post('/profile',checkauth.buyer,BuyerModel.post_profile)
  // router.post('/avatar',checkauth.buyer,avatarupload.single("avatarfile"),BuyerModel.avatar)
  // router.get('/cart',checkauth.buyer,BuyerModel.cart)
  // router.get('/history',checkauth.buyer,BuyerModel.history)
  // router.get('/history/:id',checkauth.buyer,BuyerModel.history_detail)
  // router.get('/spending',checkauth.buyer,BuyerModel.spending)
  // router.post('/spending/month',checkauth.buyer,BuyerModel.spendingmonth)
  // router.post('/buy',checkauth.buyer,BuyerModel.buy)

  // router.get('/seller',checkauth.buyer,BuyerModel.get_seller)
  // router.post('/seller',checkauth.buyer,BuyerModel.post_seller)
  // return app.use("/buyer", router)
}
module.exports = BuyerRoutes

