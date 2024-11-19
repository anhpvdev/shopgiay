const path = require('path')
const mongoose = require('../../config/connect_db')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


const Adminschema = new mongoose.Schema({
  ten_dang_nhap: { type: String, required: true},
  mat_khau: { type: String, required: true },
})


const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/404.ejs"))
    },

    home: async (req, res) => {
      console.log(req.login)
        
      if(req.login){
        return res.render(path.join(__dirname+"../../views/Admin/home.ejs"),{data:[],user:req.login.id,sort:null})
       }else{
         return res.render(path.join(__dirname+"../../views/Admin/home.ejs"),{data:[],user:null,sort:null})
       }
    },

  
  

  logout: async (req, res) => {

    res.cookie('token', '');

        return res.redirect("/")
},

  login: async (req, res) => {
    var {name,pass} = req.body
    console.log(name,pass)
    
    const  listcart = mongoose.model('admins', Adminschema)

    try {
      const User = await listcart.findOne({ ten_dang_nhap: name });
  
      if (!User) {
        return res.render(path.join(__dirname+"../../views/Admin/login.ejs"),{message:"Tài khoản không tồn tại"})
      }else{
        if(User.mat_khau != pass){
          return res.render(path.join(__dirname+"../../views/Admin/login.ejs"),{message:"Mật khẩu không chính xác"})
        }


        const token = jwt.sign({ id: User._id }, 'admin_ke_tu', { expiresIn: '1h' });
        console.log(token)

        res.cookie('a_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          maxAge: 3600000 
        });

        return res.redirect("/admin/")
      }
  
    } catch (error) {
      console.log(error)
      return res.render(path.join(__dirname+"../../views/404.ejs"))
    }
},
   
    

}

module.exports = UserServices