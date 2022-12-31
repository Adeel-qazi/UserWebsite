                                                                                     // creating the state,  that is accessible all
import NoteContext from "./noteContext";                                             //import Context from noteContext
import { useState } from "react";                                                    //state and setState using useState 

const NoteState = (props)=>{                                                        //start the function  this is a function and want to provide the value in function , enter the  value in value equal to in NoteContext 
const host = "http://localhost:5000"                                               // keeping updating
    const notesInitial = [ ]                                                     //update the initial note from fetch api      
                                                                                   //in backend first of all i go to thunderclient => fetch all notes =>  copy user's all notes then paste in NoteState.js
      
      const [notes, setNotes] = useState(notesInitial)
                    
                                                                                  //add a note    this function would perform to add a note           //receiveing value title,desc,tag from handleclick function
      const getNotes = async()=>{                                                 //call getNotes in Notes.js    //required three things to add a note in add function
              //TODO: API call.     fetch all the notes                          //whatever note you want to push 
            
              const response = await fetch(`${host}/api/notes/fetchallnotes`, {   //  take endpoint(API)  of add in thunderclient    fetch api
                method: 'GET',                                                    // getting notes in server    
                
                headers: {                                                         //take the update's endpoint and content and token in header in thunderclient
                  'Content-Type': 'application/json',
                  "auth-token": localStorage.getItem('token')   // before authentication token is hard and came authentication token from localStorage 
                
                }
              });

              const json = await response.json()
              setNotes(json)                                                     //set the notes
            }


       //add a note    this function would perform to add a note                 //receiveing value title,desc,tag from handleclick function
       const addNote = async(title, description, tag)=>{                     //required three things to add a note in add function
        //TODO: API call                                                          //whatever note you want to push 
      
        const response = await fetch(`${host}/api/notes/addnote`, {                 //take endpoint  of add in thunderclient    fetch api
          method: 'POST',                                                           // post note from server or thunderclient
          
          headers: {                                                               //take the update's endpoint and content and token in header in thunderclient
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')   // before authentication token is hard and came authentication token from localStorage 
          
          },
          
          body: JSON.stringify({title, description, tag}) 
        });
        const note = await response.json();
        setNotes(notes.concat(note))                                                      // return an array   push the note. and update the notes
}


      // delete a note   this function would perform to delete a note 
      const deleteNote = async(id)=>{
        //TODO: API calling
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {        //take endpoint with token of update  in thunderclient    fetch api
          method: 'DELETE',                                                         //deleting note in database ,server or thunderclient
          
          headers: {                                                               //take the update's endpoint and content and token in header in thunderclient
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')    // before authentication token is hard and came authentication token from localStorage 
          }
          
        });

        const json = response.json();
        console.log(json);
       const newNotes = notes.filter((note)=>{return note._id !== id})              //filter take an arrow function
        setNotes(newNotes)
        
      }


      //edit a note        this function performs edit a note
      const editNote =async (id, title, description, tag) =>{
        // API calls                                                              //id= 638dad6aa427185efaed802a
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {        //take endpoint with token of update  in thunderclient    fetch api
          method: 'PUT',          
          
          headers: {                                                               //take the update's endpoint and content and token in header in thunderclient
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')      // before authentication token is hard and came authentication token from localStorage 
          
          },
          
          body: JSON.stringify({title, description, tag}) 
        });
        const json = await response.json();
        console.log(json)
      

        //logic to edit in thunderclient               .edit the note in modal box then  updating note immediately in frontend (desktop)
        let newNotes = JSON.parse(JSON.stringify(notes));    //create a note and stringigy transmitted into array and wrap up in JSON.parse. creating a deep copy in JSON.parse. 
        for (let index = 0; index < newNotes.length; index++) {      //update note on edit in user interface
          const element = newNotes[index];
        
          if(element._id === id){
            newNotes[index].title= title;
            newNotes[index].description= description;
            newNotes[index].tag= tag;
            break;
        }
          
        }
        setNotes(newNotes);
        
      }

    return(                                                                                //value passed as a props
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes }}>     {/*anything wrap in syntax and come out all childrens midst that syntax */}     {/*would provide note's context*/}
           {props.children}                                                                  {/*between that syntax*/}
        </NoteContext.Provider> 
    )
}  //end the function
export default NoteState;
