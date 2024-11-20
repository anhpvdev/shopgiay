const path = require('path')
const mongoose = require('../../config/connect_db')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


const Adminschema = new mongoose.Schema({
  ten_dang_nhap: { type: String, required: true},
  mat_khau: { type: String, required: true },
})


const ListProductschema = new mongoose.Schema({
  ten: { type: String, required: true },
  thuong_hieu: { type: String, required: true },
  loai: { type: String, required: true },
  kich_thuoc: [{ type: Number, required: true }],
  mau_sac: [{ type: String, required: true }],
  gia: { type: Number, required: true },
  so_luong_ton: { type: Number, required: true },
  mo_ta: { type: String },
  hinh_anh: [{ type: String }],
  danh_gia: { type: Number, default: 0 },
  nhan_xet: [
    {
      nguoi_dung: { type: String },
      noi_dung: { type: String },
      so_sao: { type: Number, min: 1, max: 5 }
    }
  ]
})

const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/404.ejs"))
    },

    home: async (req, res) => {
      console.log(req.login)

      const  listproduct = mongoose.model('sanphams', ListProductschema)
            listproduct.find({}).then((dataa)=>{
            
              if(req.login){
                return res.render(path.join(__dirname+"../../views/Admin/home.ejs"),{data:dataa,user:req.login.id,sort:null})
               }else{
                 return res.render(path.join(__dirname+"../../views/Admin/home.ejs"),{data:dataa,user:null,sort:null})
               }
               
            })
        
      
    },

    
    edit: async (req, res) => {
      let id = req.query.id
      console.log(id)

      // const  listproduct = mongoose.model('sanphams', Productschema)
      //     listproduct.findById(idpr).then((dataa)=>{
      //         console.log(dataa)
      //         if(req.login){
      //           return res.render(path.join(__dirname+"../../views/Users/detail.ejs"),{data:dataa,user:req.login.id})
      //         }else{
      //           return res.render(path.join(__dirname+"../../views/Users/detail.ejs"),{data:dataa,user:null})
      //         }
      //     })
        
      
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