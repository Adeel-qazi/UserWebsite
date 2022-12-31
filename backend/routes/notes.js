                                                  //4 file                //creating api  and using router      writing endpoint for notes
const express = require('express');
const router = express.Router();                                          //there is router inside express
const fetchuser = require('../middleware/fetchuser');                     //import fetchuser from middleware
const Note = require('../models/Note'); 
const { body, validationResult } = require('express-validator');          // you validate(confirm) the input and report any errors before creating the user:

     //creating our own APIs through Express  
//  this is endpoint
//Route 1: Get All Notes using : Get "/api/notes/createuser", Login required    if you entered token in header so you got complete notes(fetchallnotes)
router.get('/fetchallnotes',fetchuser, async (req,res)=>{                 // fetch all notes from database. that user who already loged in       //before i was using app.get('/', (req,reas)=>{res.send() } )
 try {
     const notes = await Note.find({user: req.user.id})                   // user in request.user.id    fetch all notes
    res.json(notes)
    
} catch (error) {                                                        //end try then start catch     //catch the error and showing the error in terminal
            
    console.error(error.message);                                          //locked error in console
    res.status(500).send("Internal Server Error");
    
}
} )    




//this is second endpoint
//Route 2:add a new Note  using : Post "/api/notes/addnote", Login required    add the notes
router.post('/addnote',fetchuser,[                                           //required for enter the notes    // fetch all notes from database. that user who already loged in  
    body('title','Enter a valid title').isLength({ min: 3 }),  
    body('description','Description must be al least 5 characters').isLength({ min: 5 }),
 ], async (req,res)=>{                                                       // Finds the validation errors in this request and wraps them in an object with handy functions. i can't enter duplicate value
     try{     //start try
    const {title, description, tag} = req.body;                              // destructure.  get new note and must valid the input by validation.
 
    const errors = validationResult(req);                                    //if i make error in thunder's request body, so below line is noted you are getting js object through express validator
        if (!errors.isEmpty()) {                                             //if errors.empty doesn't return true(200 ok) so send (400 bad request) after that send the errors 
          return res.status(400).json({ errors: errors.array() });
        }                                                                  
        const note = new Note({                                              //if here is no error so i would make new note
         title, description, tag, user: req.user.id                              //returns promise
        })
        const savedNote = await note.save();                                  //return note
    
        res.json(savedNote)

        }catch(error){                                                        //end try then start catch     //catch the error and showing the error in terminal
            
             console.error(error.message);                                    //locked error in console
             res.status(500).send("Internal Server Error");

        }
   } )



   //Route 3:update an existing Note using: PUT "/api/notes/updatenote/id", Login required      we use put request for updation
   router.put('/updatenote/:id',fetchuser, async (req, res) =>{                        //same people would update that loged in and update your note
    const {title,  description, tag} = req.body;      //withdraw all things from req.body with the help of destructuring 
    try {     //if mongodb is down
        
    
    //create a newNote object
    const newNote = {};
    if (title){newNote.title = title};      //if title exists so newNote.title is equal to title
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};  
    
     
     let note = await Note.findById(req.params.id);    //find the note to be updated and update it      findbyid take id
     if(!note){return res.status(404).send("Not Found")}
     
     if(note.user.toString() !== req.user.id){          //check the user (:id) and if some (loged in user is not equal to req.user.id) that means someone trying to access someone's note that means someone attacked 
        return res.status(401).send("Not Allowed");
     }
       //if note exists
     note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})    //findbyidandupdate first take id and second parameter   and update new note
     res.json({note});
    } catch (error) {                                                        //end try then start catch     //catch the error and showing the error in terminal
            
        console.error(error.message);                                          //locked error in console
        res.status(500).send("Internal Server Error");
        
    }
    })                                                    




    //Route 4: Delete an existing Note using: Delete "/api/notes/deletenote/id", Login required  
   router.delete('/deletenote/:id',fetchuser, async (req, res) =>{                       

   try {     //if mongodb is down 
    
  
    //verify the user that person is deleting the note , is this note to him?
    
     
     let note = await Note.findById(req.params.id);    //find the note to be deleted and delete it      findbyid take id
     if(!note){return res.status(404).send("Not Found")}
      
     //allow deletion only if user owns this note
     if(note.user.toString() !== req.user.id){          //check the user (:id) and if some (loged in user is not equal to req.user.id) that means someone trying to access someone's note that means someone attacked 
        return res.status(401).send("Not Allowed");
     }
       //if note exists           //delete the note
     note = await Note.findByIdAndDelete(req.params.id)    //findbyidanddelete first take id and second parameter
     res.json({"success": "Note has been deleted", note: note});
    } catch (error) {                                                        //end try then start catch     //catch the error and showing the error in terminal
            
        console.error(error.message);                                          //locked error in console
        res.status(500).send("Internal Server Error");
        
    }
    })  

                    
module.exports = router                                                                 //if i update the note thunderclient so first of all go to fetchallnotes and pick the id of some note then put in update note rather than (:id),
                                                                                       //  after that retyped the note in json content then send after that check go to fetchallnotes either update the note or not