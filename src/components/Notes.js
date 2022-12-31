import React, { useContext, useEffect, useRef, useState } from "react"; //rfce      made a component for notes of user
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";                                 //  import Noteitem from Noteitem component
import AddNote from "./AddNote";                                 //import AddNote from AddNote component
import { useNavigate } from "react-router-dom";            // in my login page.  use useNavigate instead useHistory

const Notes = (props) => {
  const context = useContext(noteContext);              //bring all notes here in Home component
  let history = useNavigate();   //
  const { notes, getNotes, editNote } = context;                  //destructuring   and taking notes, getNotes, editNote from NoteState in noteContext.provider value passing
  
  useEffect(() => {
    if(localStorage.getItem('token')){                     //if it is not null when i get notes or fetch all notes
      getNotes(); 
    }
    else{                                                  //otherwise i would redirect in login one page  (means) you have to log in
      history('/login')                                    // use history("/") rather than history.push("/")  in my signup page
    }
                                                        //fetch all notes using useEffect in NoteState
    // eslint-disable-next-line
  }, []);


  const ref = useRef(null);                              //open the modal
  const refClose = useRef(null);                         //for closing the modal
  const [note, setNote] = useState({ etitle: "", edescription:"", etag:""})   //made a state for click function
 
                                                         // when someone clicks on edit icon 
  const updateNote = (currentNote)=> {                   //it is a function to take a full note
   ref.current.click();                                   // where my ref is pointing.  open a Modal via a javascript    toggle is a function if it is show so hide and hide so show
  setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

                      
  
  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);  //edit the note before closing the modal box. passing arguments to editNote
    refClose.current.click();                                     //when someone clicks so disapper the modal box
    props.showAlert("Updated  Successfully","success")
 
                     
  }
                     
 const onChange = (e)=>{
 setNote({...note, [e.target.name]: e.target.value})                           //... spread operator.  always stayed value in note but next properties add or overerite
 }                                                                              //whatever name is changing is equal to value
                                         

  return (                                           
    <>
      <AddNote showAlert={props.showAlert} />        {/*showing message and type in alert and sending in addNote*/}                   {/*  //useRef is that giving reference to anyone element imported AddNote components in  Notes component */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
         Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true"  >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                      {/*Edit form*/}                      
            <form className=" my-3">                                          {/*copy form from bootstrap*/}
             
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}
                   aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                   </div>

           <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                 <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                  </div>
  
            </form>
            
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>    {/*closing the modal someone clicks on this button through ref  */}
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary"> Update Note</button>     {/*when someone clicks on button so running form*/}
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>You notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          //search each and every element  in note
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                                                                     //return Noteitem with props(note)   what is key? id of user's note
        })}
                     {/*key, updateNote and note are passing a props  as updateNote is a function passing as a props*/}
      </div>
    </>
  );
};

export default Notes;
