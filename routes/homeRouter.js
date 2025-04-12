const express = require('express');
const {registerUser , loginUser , logout} = require('../controllers/authController') ;

const router = express.Router();
router.use(express.json());



router.get('/' , function(req , res){
    res.render('index') ;
})




module.exports = router;
