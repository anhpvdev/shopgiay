const mongoose = require('mongoose')


var __uri = "mongodb+srv://maviess10:8hUqo37WMHcOxm21@cluster0.ca8sz.mongodb.net/Shop"

// const userschema = new mongoose.Schema({
//     title: String,
//     year: Number
// })


mongoose.connect(__uri)

module.exports = mongoose
// .then((success) => {
//     const  listuser = mongoose.model('users', userschema)
//     listuser.find({}).then((dataa)=>{
//         for(let i=0;i<dataa.length;i++){
//             console.log(dataa[i])
//             console.log("__________")
//         }
//     })

// })
// .catch((err)=>console.log(err.message))

