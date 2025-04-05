const mongoose = require('mongoose') ;
const { type } = require('os');



const userSchema = mongoose.Schema({

    fullname : String,
    email : String ,
    password : String ,
    cart : {
        type : Array ,
        default : [] 
    },
    isadmin : Boolean ,
    orders : {
        type : Array ,
        default : [] 
    },
    contact : Number ,
    picture : String ,

})

module.exports = mongoose.model(user , 'userSchema') ;