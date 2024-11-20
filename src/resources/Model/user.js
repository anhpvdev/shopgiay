const path = require('path')
const mongoose = require('../../config/connect_db')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


const schema = require('../../config/schema')




const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/404.ejs"))
    },
    home: async (req, res) => {
      console.log(req.login)
        
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({}).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:null})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:null})
               }
               
            })
    },

    sort: async (req, res) => {
      console.log(req.login)
      let sort = req.query.sort
      let type = req.query.type
      var valuesort = null
      console.log(sort,type)
      if(type == 3){
        valuesort = {gia: 1}
      }
      if(type == 4){
         valuesort = {gia: -1}
      }
      if(type == 1){
        valuesort = {ten: 1}
      }
      if(type == 2){
         valuesort = {ten: -1}
      }


      if(sort == 'Adidas'){
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({ thuong_hieu: "Adidas" }).sort(valuesort).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:"Adidas"})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:"Adidas"})
               }
               
            })
      }

      if(sort == 'Nike'){
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({ thuong_hieu: "Nike" }).sort(valuesort).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:"Nike"})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:"Nike"})
               }
               
            })
      }

      if(sort == 'Puma'){
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({ thuong_hieu: "Puma" }).sort(valuesort).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:"Puma"})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:"Puma"})
               }
               
            })
      }

      if(sort == 'Gucci'){
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({ thuong_hieu: "Gucci" }).sort(valuesort).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:"Gucci"})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:"Gucci"})
               }
               
            })
      }

      if(sort == 'New Balance'){
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
            listproduct.find({ thuong_hieu: "New Balance" }).sort(valuesort).then((dataa)=>{
            
               if(req.login){
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:"New Balance"})
               }else{
                 return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:"New Balance"})
               }
               
            })
      }
      
      if(sort == undefined){
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
        listproduct.find({}).sort(valuesort).then((dataa)=>{
        
           if(req.login){
            return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:req.login.id,sort:null})
           }else{
             return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa,user:null,sort:null})
           }
           
        })
      }
        
    },

    products_detail: async (req, res) => {
        
        var idpr= req.params.id
        console.log(idpr)
        const  listproduct = mongoose.model('sanphams', schema.Productschema)
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
        const  listcart = mongoose.model('nguoidungs', schema.Userschema)
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
        
        const  listcart = mongoose.model('nguoidungs', schema.Userschema)
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
        
        const  listcart = mongoose.model('nguoidungs', schema.Userschema)
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
   
        const  listcart = mongoose.model('nguoidungs', schema.Userschema)
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
      
      const  listcart = mongoose.model('nguoidungs', schema.Userschema)

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
    
    const  listcart = mongoose.model('nguoidungs', schema.Userschema)

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