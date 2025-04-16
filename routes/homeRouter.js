const express = require('express');
const router = express.Router();
const Product = require('../models/product-model'); // Import your model
const { registerUser, loginUser, logout } = require('../controllers/authController');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // ✅ Fetch from DB
        res.render('index', { products }); // ✅ Now products is defined
    } catch (err) {
        console.error("Home page error:", err);
        res.status(500).send("Server error loading homepage");
    }
});

module.exports = router;
