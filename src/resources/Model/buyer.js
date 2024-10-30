const connection = require('../../config/connect_db')
const path = require('path')

const BuyerServices = {
    cart: (req, res) => {
        return res.render(path.join(__dirname+"../../views/Buyers/cart.ejs"),{data:nodata})
    },

    
}

module.exports = BuyerServices