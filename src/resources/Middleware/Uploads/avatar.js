
const multer = require("multer")
    
const storage = multer.diskStorage({
  destination:(req,file,res)=>{
      let path = './src/public/images/Avatar'
      res(null,path)
  },
  filename:(req,file,res)=>{

    let filename = req.user.id+".jpg"
    res(null,filename)

  }
})

const avatar =multer({storage:storage})
    



module.exports = avatar