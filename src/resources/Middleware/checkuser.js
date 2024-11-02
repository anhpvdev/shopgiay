const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const checkUser = {
    hightcheck: (req, res,next) => {
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
          return res.redirect('/login')
        }else{

        // Xác thực token
        jwt.verify(token, 'thuy_ke_tu', (err, decoded) => {
            if (err) {
                return res.redirect('/login')
            }else{
            req.login = decoded;
            next(); 
           }
          });
        }
      
    },

    lowcheck: (req, res,next) => {
        const token = req.cookies.token;
     
        if (!token) {
          req.login = null
          next(); 
        }else{
            // Xác thực token
        jwt.verify(token, 'thuy_ke_tu', (err, decoded) => {
            if(err) {
              req.login = null
              next(); 
            }else{
              console.log(decoded)
                req.login = decoded
                next(); 
            }

          });
        }
      
    },


    
}

module.exports = checkUser;