import React, { useContext, useState } from 'react'             //rafce 
import noteContext from "../context/notes/noteContext" 

const AddNote = (props) => {
  const context = useContext(noteContext);                                       //bring all notes here in Home component
  const {addNote} = context;                                                     //destructuring   and taking addNote from NoteState in noteContext.provider value passing
  
  const [note, setNote] = useState({title: "", description: "", tag: ""})   //made a state for click function
  
  const handleClick = (e)=>{
   e.preventDefault();
    addNote(note.title, note.description, note.tag);                              //running AddNote.   passing arguments in addNote() function in NoteState component
    setNote({title: "", description: "", tag: ""});     //clear the form after adding the note       
    props.showAlert("Added  Successfully","success")   //showing message and type in alert
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})                           //... spread operator.  always stayed value in note but next properties add or overerite
  }                                                                              //whatever name is changing is equal to value

  return (  
    <div>
       <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="container my-3">                                          {/*copy form from bootstrap*/}
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
  </div>
  
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
  </div>

  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required/>
  </div>
  
 
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>   {/*if someone clicks on button*/}
</form>                          {/*butoon disabled if whether title's length is less than 5 or description's length is less than 5*/}
</div>
    </div>
  )
}

export default AddNote
