const express = require('express');          //third file            //creating api  and using router      creating endpoint for auth   package: npm install express
const User = require('../models/User');                              // import User from models's User
const router = express.Router();                                     //there is router inside express
const { body, validationResult } = require('express-validator');     // you validate(confirm) the input and report any errors before creating the user:
const bcrypt = require('bcryptjs');  //import bcrypt from site        and package: npm install bcrytjs                                 
const jwt = require('jsonwebtoken');     //import jwt from site        //it is a way to verify the user         package: npm install jsonwebtoken    jwt facitilate a secret conversation between client and server   there are three types of jwt 1st: token type 2nd: data  3rd: secret 
const fetchuser = require('../middleware/fetchuser');                  //import fetchuser from middleware


const JWT_SECRET = 'Adeel is a good bo$y';     

//Route 1: create a User using: Post  "/api/auth/createuser",          No login required        this is endpoint                                    
    router.post('/createuser', [                                        //name,email and password through the express validator   router is a function that takes 3 arguments end point, array and arrow function
        body('name','Enter a valid name').isLength({ min: 3 }),  
        body('email','Enter a valid email').isEmail(),
        body('password','password must be al least 5 characters').isLength({ min: 5 }),
    ], async (req, res)=>{                                              // Finds the validation errors in this request and wraps them in an object with handy functions. i can't enter duplicate value
        let success = false;                          // if wrong user signup so showing false in the alertbox and signup component in frontend
        const errors = validationResult(req);                          //if i make error in thunder's request body, so below line is noted you are getting js object through express validator
        if (!errors.isEmpty()) {                                       //if errors.empty doesn't return true(200 ok) so send (400 bad request) after that send the errors 
          return res.status(400).json({ success,errors: errors.array() });
        }  

        //check whether the user with this email exists already
        try{                                                            //if i got problem in database   suppose typed userd rather than user so would not store data in database
        let user = await User.findOne({email: req.body.email});        //check whether the user with this email exists already
       
        if(user){
            return res.status(400).json({success, error: "sorry a user with this email already exists"})  //response 400 bad request and send errors
        }

        const salt = await bcrypt.genSalt(10);                       //you got being generated salt   await means to stop until this promise is resolved 
        const secPass = await bcrypt.hash(req.body.password, salt);  //generate the password with the help of bcrypt.hash    what do salt do? it increase in original password so that attacker could not attack on password 
        
        user = await User.create({                                    //creating mongoose model's user             
            name: req.body.name,                                      //user.create returns promise to user //user's data is stored in database  //check in thunder or postman 
            password: secPass,                                        //creating User in req.body in thunderclient     secret password  
            email: req.body.email,                                   //store the data in database(mongodb)     
          });

              //i would send the tokken and send user's id in tokken 
             const data = {
                user:{
                    id: user.id
                }
              }
              const authtoken = jwt.sign(data, JWT_SECRET);            //sign to jsonwebtoken  one is data and other is secret message that is mentioned above                                                    
             
             // res.json(user); 
             success = true;                                       //showing data in  thunder's respoonse 
              res.json({success, authtoken})  //es6 using
        
            } catch (error) {                                          //catch the error and showing the error in terminal
            console.error(error.message);                              //locked error in console
            res.status(500).send("Internal Server Error");
         }                                                          
    })     //end router.post
   
   
   
   
    //this is second endpoint
    //Route 2 authenticate a User using: Post "/api/auth/login",  No login required    
    router.post('/login', [                                            //name,email and password through the express validator  
        body('email','Enter a valid email').isEmail(),
        body('password','password cannot be blank').exists(),
    ], async (req, res)=>{                                               // Finds the validation errors in this request and wraps them in an object with handy functions. i can't enter duplicate value
        let success = false; 
        //there are errors , return 400 bad request and the errors
        const errors = validationResult(req);                            //if i make error in thunder's request body, so below line is noted you are getting js object through express validator
        if (!errors.isEmpty()) {                                          //if errors.empty doesn't return true(200 ok) so send (400 bad request) after that send the errors 
          return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;                                 //withdraw email and password from request.body
        try{
            let  user = await User.findOne({email});                        //take out the user form database  
            if(!user){                                                      //if user doesnt exists so send 400 bad request and the errors
               success = false;
                return res.status(400).json({ error: "please try to login with correct credentials" });  //response 400 bad request and send errors
            }
        
        
        const passwordCompare = await bcrypt.compare(password, user.password); //compare user's password from entering password.       ist string 
        if(!passwordCompare){    //if password doesnt match
           success = false;
            return res.status(400).json({success, error: "please try to login with correct credentials"});
        }
        const data = {    
            user:{
                id: user.id
            }
          }

          const authtoken = jwt.sign(data, JWT_SECRET);                         //sign to jsonwebtoken  one is data and other is secret method                                                     
         // res.json(user);    
         success = true;                                                 //showing data in  thunder's respoonse 
          res.json({ success, authtoken})  //es6 using

        }catch (error) {                                                       //catch the error and showing the error in terminal
            console.error(error.message);                                     //locked error in console
            res.status(500).send("Internal Server Error");
         }
     })

    
    
    //this is endpoint
     // Route 3:  get login user details using: POST "/api/auth/getuser". login reqiured
     //we have to send here token then fetch all details from token
     router.post('/getuser', fetchuser, async (req, res) =>{                    //where i get such routes i would be need login now it would to do  entering fetch user after get user

     try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")              //there would be user's id in tokken   .select select all fields except -password 
      res.send(user);
    } catch (error) {                                                           //catch the error and showing the error in terminal
        console.error(error.message);                                          //locked error in console
        res.status(500).send("Internal Server Error");
     }
    })  
module.exports = router                                                         //user logged in through credentials
                                                                                 //user could create through api
                                                                                 //could fetch user's data if you have jwt-token 