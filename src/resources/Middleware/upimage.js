
const multer = require("multer")
    
const storage = multer.diskStorage({
  destination:(req,file,res)=>{
      let path = './src/public/images/Products'
      res(null,path)
  },
  filename:(req,file,res)=>{
    let filename = Date.now()+"_"+file.originalname

    console.log(Date.now())
    req.body.filename = filename
    res(null,filename)

  }
})

const product =multer({storage:storage})


module.exports = product