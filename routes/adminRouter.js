const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const isLoggedin = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const upload = require('../config/multer-config');

// Dashboard Route
router.get("/", isLoggedin, async function (req, res) {
    res.render("dashboard");
});

// Form to Create Product
router.get('/create', function (req, res) {
    res.render('createProduct');
});

// Handle Form Submission
router.post('/create', upload.single("image"), async (req, res) => {
    try {
        const {
            name,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor,
            age,
            vaccination,
            size,
            traits,
            description
        } = req.body;

        const newProduct = new productModel({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            textcolor,
            panelcolor,
            age,
            vaccination,
            size,
            traits: traits ? traits.split(",").map(str => str.trim()) : [],
            description
        });

        await newProduct.save(); // ✅ Save the instance you just created

        req.flash('success', 'Product created successfully');
        res.redirect('/shop');

    } catch (err) {
        console.error("❌ Error in product creation:", err);
        res.status(500).send("Something went wrong");
    }
});

module.exports = router;
