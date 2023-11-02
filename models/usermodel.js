const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    unique : true,
    required : true,
    validate : [validatir.isEmail,'must be a valid email']
  },
  password : {
    type : String,
    required: true
  }
    
});

module.exports = mongoose.model('User',userSchema);
