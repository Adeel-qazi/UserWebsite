//user log in again and again over          // 6 file
const { default: userEvent } = require('@testing-library/user-event');
const mongoose = require('mongoose');
const {Schema} = mongoose;    //import schema from mongoose 

//creating schema for user      // a schema describes pattern of thought    as a logical collection of database object
const UserSchema = new Schema({                         
name:{
    type: String,
    required: true
},

email:{
    type: String,
    required: true,    
    unique: true
},

password:{
    type: String,
    required: true
},

date:{
    type: Date,
    default: Date.now
},
});
           //converted schema into model
const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;              //it exports module