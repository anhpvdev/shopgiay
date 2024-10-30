const path = require('path')
const mongoose = require('../../config/connect_db')
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
    email: { type: String, required: true, unique: true },
    mat_khau: { type: String, required: true },
    dia_chi: { type: String },
    so_dien_thoai: { type: String },
    gio_hang: [
      {
        san_pham_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        so_luong: { type: Number, required: true },
        gia: { type: Number, required: true }
      }
    ]
})


const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/404.ejs"))
    },
    home: async (req, res) => {

        const  listproduct = mongoose.model('sanphams', Productschema)
            listproduct.find({}).then((dataa)=>{
                console.log(dataa)
                return res.render(path.join(__dirname+"../../views/Users/home.ejs"),{data:dataa})
            })
    },

    products_detail: async (req, res) => {
        
        var idpr= req.params.id
        console.log(idpr)
        const  listproduct = mongoose.model('sanphams', Productschema)
            listproduct.findById(idpr).then((dataa)=>{
                console.log(dataa)
                return res.render(path.join(__dirname+"../../views/Users/detail.ejs"),{data:dataa})
            })
    },
    cart: async (req, res) => {
        
        var idus= req.params.id
        console.log(idus)
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findById(idus).then((dataa)=>{
                console.log(dataa.gio_hang)
                return res.render(path.join(__dirname+"../../views/Users/cart.ejs"),{data:dataa.gio_hang})
            })
    },

    addcart: async (req, res) => {
        var {userid,id,number,price} = req.body
        console.log(userid,id,number,price)
        
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findOneAndUpdate(
            { _id: userid,
            "gio_hang.san_pham_id": id
             },
            {
                $inc: { "gio_hang.$.so_luong": number }
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
                          san_pham_id: id,
                          so_luong: number,
                          gia: price
                        }
                      }
                    },
                    { new: true }
                  ).then((dataa)=>{
                    return res.redirect("/cart/67223e3208d044b09d3f1154")
                  });
            }else{
                return res.redirect("/cart/67223e3208d044b09d3f1154")
            }
            
        })

    },

    deletecart: async (req, res) => {
        var {userid,id} = req.body
        console.log(userid,id)
        
        const  listcart = mongoose.model('nguoidungs', Userschema)
        listcart.findOneAndUpdate(
            { _id: userid },
            {
              $pull: {
                gio_hang: { san_pham_id: id } // Loại bỏ sản phẩm có san_pham_id tương ứng
              }
            },
            { new: true }
          ).then((dataa)=>{
            return res.redirect("/cart/67223e3208d044b09d3f1154")
          });
       

    },
   
    

}

module.exports = UserServices