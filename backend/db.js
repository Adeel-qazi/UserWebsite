const mongoose = require('mongoose');      //ist file     // connect to database    seprate the routes   seprate the mongoose's model
const mongoURI = "mongodb://localhost:27017/notebook"    //take it from mongodb compass   how do we connect to mongodb server first of all we bring it here mongoose
                                                          
                                                            // mongoose returns promise                                                 
const connectToMongo = ()=>{                           //this is a arrow function how to connect to database                                               
    mongoose.connect(mongoURI, ()=>{                    //this is a function that takes two arguments like string, and callback(arrow) function
        console.log("connected to Mongo successfully")
    })

}
module.exports = connectToMongo;                         //it exports module     