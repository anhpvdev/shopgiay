const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const checkAdmin = {
    hightcheck: (req, res,next) => {
        const token = req.cookies.a_token;

        if (!token) {
          return res.redirect('/admin/login')
        }else{

        // Xác thực token
        jwt.verify(token, 'admin_ke_tu', (err, decoded) => {
            if (err) {
                return res.redirect('/admin/login')
            }else{
            req.login = decoded;
            next(); 
           }
          });
        }
      
    },


    
}

module.exports = checkAdmin;