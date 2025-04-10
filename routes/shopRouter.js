const express = require('express');
const router = express.Router();
const Product = require('../models/product-model'); // Make sure your model file exports correctly

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('shop', { products });
    } catch (err) {
        console.log(err.message);
        req.flash("error", "Could not load shop.");
        res.redirect("/");
    }
});

module.exports = router;
