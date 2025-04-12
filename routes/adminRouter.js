const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const { Admin } = require('mongodb');
const isLoggedin = require('../middlewares/isLoggedIn')
const productModel = require('../models/product-model');
const upload = require('../config/multer-config');
const { model } = require('mongoose');



router.get("/",  isLoggedin,  async function (req, res) {
  
    res.render("dashboard");
})


router.get('/create' , function(req , res){
    res.render('createProduct');
})


router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let { name, price, discount, bgcolor, textcolor, panelcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor,
        });

      

   req.flash('success' , 'Product created successfully');
   res.redirect('/admin/');

    } catch (err) {
        console.error("❌ Error in product creation:", err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router; 