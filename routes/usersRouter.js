const express = require('express');
const {registerUser , loginUser , logout} = require('../controllers/authController') ;

const router = express.Router();
router.use(express.json());

router.get("/", function (req, res) {
    res.send("YO");
});

router.post('/register',  registerUser);


router.post('/login' , loginUser) ;


router.get('/logout' , logout) ; 
module.exports = router;
