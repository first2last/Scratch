const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const cookieParser = require("cookie-parser") ;
const bcrypt = require('bcrypt') ;
const path = require('path') ;
const db = require("./config/mongoose-connection.js") ;
const usersRouter = require('./routes/usersRouter.js') ; 
const ownerRouter = require('./routes/ownerRouter.js') ; 
const productsRouter = require('./routes/productsRouter.js') ; 
app.use(express.json()) ;
app.use(express.static(path.join(__dirname , 'public'))) ;
app.use(express.urlencoded({extended : true})) ;
app.use(cookieParser()) ;
app.set('view engine' , "ejs")  ;
app.use('/products' , productsRouter) ;
app.use('/owner' , ownerRouter) ;
app.use('/users' , usersRouter) ;


app.get('/' , function(req, res){
    res.render('index') ;
})

app.listen(3000 , function(req , res){
    console.log("server running ....."); 
    
})
