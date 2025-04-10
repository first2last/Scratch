const express = require('express');
const { model } = require('mongoose');
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');


const router = express.Router();

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
   res.redirect('/owner/admin');

    } catch (err) {
        console.error("❌ Error in product creation:", err);
        res.status(500).send("Something went wrong");
    }
});




router.get("/", function (req, res) {
    res.send("YO");
})

module.exports = router; 