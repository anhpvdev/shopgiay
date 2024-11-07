const path = require('path')
const mongoose = require('../../config/connect_db')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { change_password } = require('./buyer')


const Productschema = new mongoose.Schema({
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

const Userschema = new mongoose.Schema({
    ten_dang_nhap: { type: String, required: true, unique: true },
    mat_khau: { type: String, required: true },
    dia_chi: { type: String },
    so_dien_thoai: { type: String },
    gio_hang: [
      {
        san_pham_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        ten:{ type: String , required: true},
        so_luong: { type: Number, required: true },
        gia: { type: Number, required: true },
        hinh_anh:{ type: String , required: true},
        kich_thuoc:{ type: Number, required: true },
      }
    ]
})


const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/404.ejs"))
    },
    home: async (req, res) => {
      console.log(req.login)
        
        const  listproduct = mongoose.model('sanphams', Productschema)
            listproduct.find({}).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null})
               }
               
            })
    },

    products_detail: async (req, res) => {
        
        var idpr= req.params.id
        console.log(idpr)
        const  listproduct = mongoose.model('sanphams', Productschema)
            listproduct.findById(idpr).then((dataa)=>{
                console.log(dataa)
                if(req.login){
                  return res.render(path.join(__dirname+"../../views/Users/detail.ejs"),{data:dataa,user:req.login.id})
                }else{
                  return res.render(path.join(__dirname+"../../views/Users/detail.ejs"),{data:dataa,user:null})
                }
            })
    },
    cart: async (req, res) => {
        
        var idus= req.login.id
        console.log(idus)
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findById(idus).then((dataa)=>{
                console.log(dataa.gio_hang)
                return res.render(path.join(__dirname+"../../views/Users/cart.ejs"),{data:dataa.gio_hang,user:idus})
            })
    },

    addcart: async (req, res) => {
      var userid = req.login.id
      console.log(userid)
      var {product,name,size,num,price,image} = req.body
        console.log(product,size,num,price,image)
        
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findOneAndUpdate(
            { _id: userid,
            "gio_hang.san_pham_id": product,
            "gio_hang.kich_thuoc": size
             },
            {
                $inc: { "gio_hang.$.so_luong": num }
            },
            { new: true }
        ).then((dataa)=>{
            console.log(dataa)
            if(dataa == null){
                listcart.findOneAndUpdate(
                    { _id: userid },
                    {
                      $push: {
                        gio_hang: {
                          san_pham_id: product,
                          ten: name,
                          hinh_anh: image,
                          kich_thuoc:size,
                          so_luong: num,
                          gia: price
                        }
                      }
                    },
                    { new: true }
                  ).then((dataa)=>{
                    return res.redirect("/cart")
                  });
            }else{
                return res.redirect("/cart")
            }
            
        })

    },

    deletecart: async (req, res) => {
      var idus= req.login.id
        var {id,size} = req.body
        console.log(idus,id,size)
        
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findOneAndUpdate(
            { _id: idus},
            {
              $pull: {
                gio_hang: { san_pham_id: id,
                           kich_thuoc: size
                 } 
              }
            },
            { new: true }
          ).then((dataa)=>{
            return res.redirect("/cart")
          });
       

    },

    updatecart: async (req, res) => {
      var userid = req.login.id

      var {product,size,num} = req.body
      console.log(product,size,num,userid)
   
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findOneAndUpdate(
            { _id: userid,
            "gio_hang.san_pham_id": product,
            "gio_hang.kich_thuoc": size
             },
            {
                $inc: { "gio_hang.$.so_luong": num }
            },
            { new: true }
        ).then((dataa)=>{
            console.log(dataa)
            if(dataa == null){
              return res.redirect('/404')
            }else{
              return res.redirect('/cart')
            }
            
        })
       

    },


    registry: async (req, res) => {
      var {name,pass} = req.body
      console.log(name,pass)
      
      const  listcart = mongoose.model('nguoidungs', Userschema)

      try {
        const existingUser = await listcart.findOne({ ten_dang_nhap: name });
    
        if (existingUser) {
          return res.render(path.join(__dirname+"../../views/Users/registry.ejs"),{message:"Tài khoản đã tồn tại"})
        }else{
          const newUser = new listcart({
            ten_dang_nhap: name, // Sử dụng email làm tên đăng nhập
            mat_khau: pass,
            dia_chi: '', 
            so_dien_thoai: '',
            gio_hang: [] 

          });
      
          await newUser.save();
          res.render(path.join(__dirname+"../../views/Users/registry.ejs"),{message:"Tài khoản đã được tạo thành công."})
        }
    
      } catch (error) {
        console.log(error)
        return res.render(path.join(__dirname+"../../views/404.ejs"))
      }
  },

  logout: async (req, res) => {

    res.cookie('token', '');

        return res.redirect("/")
},

  login: async (req, res) => {
    var {name,pass} = req.body
    console.log(name,pass)
    
    const  listcart = mongoose.model('nguoidungs', Userschema)

    try {
      const User = await listcart.findOne({ ten_dang_nhap: name });
  
      if (!User) {
        return res.render(path.join(__dirname+"../../views/Users/login.ejs"),{message:"Tài khoản không tồn tại"})
      }else{
        if(User.mat_khau != pass){
          return res.render(path.join(__dirname+"../../views/Users/login.ejs"),{message:"Mật khẩu không chính xác"})
        }


        const token = jwt.sign({ id: User._id }, 'thuy_ke_tu', { expiresIn: '1h' });
        console.log(token)

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          maxAge: 3600000 
        });

        return res.redirect("/")
      }
  
    } catch (error) {
      console.log(error)
      return res.render(path.join(__dirname+"../../views/404.ejs"))
    }
},
   
    

}

module.exports = UserServices