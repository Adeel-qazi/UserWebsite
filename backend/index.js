              //second file                             //basic task connect to mongoose       mongoose means to say.   //this is my task to  manage the database and you are running your application(mongo db) 
const connectToMongo = require('./db');                //import connectTomongo form db.js
const express = require('express');                     //express is a framework of node.js    nodejs is a open source runtime environment to run in browser
var cors = require('cors');                            //import cors from site cors in express


connectToMongo();                                      //thunderclient collection: creating a collection of endpoints that is concerned an application
const app = express()
const port = 5000                                      //port for backend 

app.use(cors());                                      //middleWare
    
app.use(express.json())                               //middeware  //if you want to use of  req.body in thunderClient

//Available Routes   
app.use('/api/auth',require('./routes/auth'))        //link to routes and this is endpoint of authentication
app.use('/api/notes',require('./routes/notes'))      //link to routes and this is endpoint of notes


//app.get('/', (req, res) => {
 // res.send('Hello Adeel!')     //this is endpoint
//})

app.listen(port, () => {                            // running the backend
  console.log(`Notebook backend listening at http://localhost:${port}`)
})