import './App.css';
import {                                         //react router dom v6: we can change components in same place    //import react-router-dom from react router
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";             
                                         
import { useState } from 'react';             /*import useState from react for alert function*/
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';                     
import Login from './components/Login';               {/*there are two buttons in navbar when someone logins after that user would be accessible this is credential*/}






function App() {  

const [alert, setAlert] = useState('this is message');            {/*changing the state of alert*/}
const showAlert = (message, type)=>{                  //made a function of showAlert for showing alert
setAlert({
  message: message,
  type: type
})

setTimeout(()=>{
  setAlert(null);
}, 1000);

} 

  return (
  <>                                               {/*fragment tag*/}
  <NoteState>                                       {/*entire application is wrapped up in NoteState.      all components inside components inside whatever state variable's entered  in NoteState.  */}                                                                                              {/**/}
  <BrowserRouter>                                   {/*react router's setup*/}
        
         <Routes>
         <Route exact path='/navbar' element={<Navbar/>}/> 
         <Route exact path='/alert' element={<Alert alert={alert}/>}/>
         </Routes>
         
         <div className="container">
          <Routes>
           <Route exact path='/' element={ <Home showAlert={showAlert} />}/>   {/*showing alert in home page*/}
          <Route exact path='/about' element={<About/>}/> 
          <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>   {/*showing alert in login page*/}
          <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}/> {/*showing alert in sign page*/}
           </Routes>
           </div>
        </BrowserRouter>                          {/*use the context API in complex application*/}   
        </NoteState>                               {/*our react application is made in the combination of state and components*/}   
  
  </>
  
  
  );
}

export default App;
