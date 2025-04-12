const mongoose = require('mongoose') ;
const { type } = require('os');



const userSchema = mongoose.Schema({

    fullname : String,
    email : String ,
    password : String ,
    cart : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Product"
       
    }],

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
      },
      
   
    orders : {
        type : Array ,
        default : [] 
    },
    contact : Number ,
    picture : String ,

})

module.exports = mongoose.model('user', userSchema) ;