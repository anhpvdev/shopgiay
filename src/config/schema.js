const mongoose = require('mongoose')


const Adminschema = new mongoose.Schema({
    ten_dang_nhap: { type: String, required: true},
    mat_khau: { type: String, required: true },
  })

  
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


  
module.exports = {Adminschema,Productschema,Userschema}