const mongoose = require('mongoose') ;

 const productScehma = mongoose.Schema({
 
    image : Buffer ,
    name : String , 
    price : Number , 
    discount : {
        type : Number ,
        default : 0 
    },
    bgcolor : String ,
    textcolor : String ,
    panelcolor : String 

 }) ; 

 module.exports = mongoose.model("Product", productScehma);
