const express = require('express') ;
const router = express.Router() ;
const isloggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
router.get('/', function(req, res) {
    res.render('register');
});


router.get('/shop' , isloggedIn ,  async function(req , res){
    let products = await productModel.find()
    res.render('shop' ,{ products }) ; 
})

module.exports = router ;