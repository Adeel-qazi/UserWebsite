const mongoose = require('mongoose');          //5 file             //creating mongoose's model
const {Schema} = mongoose;                                          //import schema from mongoose    //putting the notes
                                                                    // a schema describes pattern of thought    as a logical collection of database object
                                                                   //user log in again and again over
const NotesSchema = new Schema({                                   //creating schema for notes
    //if our user enter the notes so No one seeing our notes       // for that i have to connect user to notes 
      //this is field. whom is this notes
                                                                     //i could store user here after creating user field
    user:{                                                           //i said that user would put others model key objectId    
        type: mongoose.Schema.Types.ObjectId,                       //like foreign key    //model's User is linking model's Notes 
        ref: 'user'                                                //user from model's user
    },

    title:{
    type: String,
    required: true                                 
   },

   description:{
    type: String,
    required: true
   },

   tag:{
    type: String,
    default: "general"
   },

date:{
    type: Date,
    default: Date.now
},
});
     //converted schema into model
module.exports = mongoose.model('notes', NotesSchema);    // it exports module 
