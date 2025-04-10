const mongoose = require('mongoose') ;
const { type } = require('os');



const ownerSchema = mongoose.Schema({

    fullname : {
        type : String ,
        minlength : 3,
        trim : true ,
    },
    email : String ,
    password : String ,
   
    products : {
        type : Array ,
        default : [] 
    },
   gstin : String ,
    picture : String ,

})

module.exports = mongoose.model('owner', ownerSchema) ;