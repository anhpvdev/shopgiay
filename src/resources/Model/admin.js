const path = require('path')
const mongoose = require('../../config/connect_db')
const schema = require('../../config/schema')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');






const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/404.ejs"))
    },

    home: async (req, res) => {
      console.log(req.login)

      const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({}).then((dataa)=>{
            
              return res.render(path.join(__dirname+"../../views/Admin/home.ejs"),{data:dataa.reverse(),user:req.login.id,sort:null})
               
            })
        
      
    },

    
    edit: async (req, res) => {
      let id = req.query.id
      console.log(id)

      const  listproduct = mongoose.model('sanphams', schema.Productschema)
          listproduct.findById(id).then((dataa)=>{
            // dataa.kich_thuoc = JSON.stringify(dataa.kich_thuoc)
              return res.render(path.join(__dirname+"../../views/Admin/detail.ejs"),{data:dataa})
          })
        
      
    },

    add: async (req, res) => {
      let id = req.query.id
     

      return res.render(path.join(__dirname+"../../views/Admin/add.ejs"),{data:[]})
        
      
    },

    pedit: async (req, res) => {
      var {id,name,brand,size,price,quantity} = req.body
      console.log(id,name,brand,size,price,quantity)
     
      const  listpr = mongoose.model('sanphams', schema.Productschema)
      listpr.findOneAndUpdate(
          { _id: id},
          {
            ten: name,
            thuong_hieu: brand,
            gia: price,
            kich_thuoc: JSON.parse(size),
            so_luong_ton: quantity,
          },
          { new: true }
      ).then((dataa)=>{
          console.log(dataa)
          if(dataa == null){
            return res.redirect('/404')
          }else{
            return res.redirect('/admin/edit?id='+id)
          }
          
      })
        
      
    },

    delete: async (req, res) => {
      var {id} = req.body
      console.log(id)
      if(!id){
        return res.redirect('/404');
      }else{
        const  listpr = mongoose.model('sanphams', schema.Productschema)
        listpr.findByIdAndDelete(id).then((data)=>{
          if(!data){
            return res.redirect('/404');
          }else{
            return  res.redirect('/admin');
          }
        })
             
            
      }
    
      
    },

    padd: async (req, res) => {
      var imagename = req.body.filename
      console.log(imagename)
      console.log("---------")
      var {name,brand,size,price,quantity} = req.body
      console.log(name,brand,size,price,quantity)

      const  listpr = mongoose.model('sanphams', schema.Productschema)
      
      const newProduct = new listpr({
        ten: name,
        thuong_hieu: brand,
        gia: price,
        kich_thuoc: JSON.parse(size),
        so_luong_ton: quantity,
        mau_sac: [],
        loai: "test",
        mo_ta: "",
        hinh_anh: [imagename],
        danh_gia: 0, 
        nhan_xet: []
      });

      newProduct.save().then((data)=>{
        console.log(data)
          if(!data) return res.redirect('/404');
          else return res.redirect('/admin');
        
      })

        
      
    },

  
  

  logout: async (req, res) => {

    res.cookie('a_token', '');

    return res.redirect("/admin/login")
  },

  login: async (req, res) => {
    var {name,pass} = req.body
    console.log(name,pass)
    
    const  listcart = mongoose.model('admins', schema.Adminschema)

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