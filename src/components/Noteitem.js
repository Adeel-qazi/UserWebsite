import React, {useContext} from "react";                         //rafce  Noteitem  from notes of user     it is a component
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;                                //destructuring
  const { note, updateNote } = props;                            //updateNote is a function in Notes and using Modal                                
 
  return (
    <div className="col-md-3">
      <div className="card my-3">
                                                               {/*copy card form bootstrap   my-3 margin in y axes */}
        <div className="card-body">
          <div className="d-flex align-items-center">
     <h5 className="card-title">{note.title}</h5> 
     
      <i className="far fa-trash-alt mx-2 " onClick={()=>{deleteNote(note._id);
         props.showAlert("Deleted  Successfully","success") }}></i>        {/*icons connected to internet and showing message and type in alert*/} 
      
       <i className="far fa-edit mx-2" onClick= { ()=> {updateNote(note)}}></i>  {/*copy delete or edit icon from font icon. and mx mean margin of x axes*/}
        </div>                                                                                     {/*updateNote is a function in Notes and using Modal */}
          <p className="card-text"> {note.description} </p> 
        </div>
      </div>
    </div>  
  );
};

export default Noteitem;
