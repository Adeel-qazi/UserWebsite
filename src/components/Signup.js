import React, {useState} from 'react'           //there are two buttons in navbar when someone logins after that user would be accessible this is credential
import { useNavigate } from 'react-router-dom';        // in my login page.  use useNavigate instead useHistory

const Signup = (props) => {                     //made a component for user so that user could signup and user's endpoint create a new user in thunderClient  and importing alert by the help of props
 

  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})   //email and password in object
   
  let history = useNavigate();                    //use useNavigate instead useHistory is hook for localStorage in my login page

 const handleSubmit = async(e)=> {
 e.preventDefault();                          //there is no need to reload again and again over    //hit login's endpoint with the help of fetch api
 const {name, email, password} = credentials;     //destructuring

 const response = await fetch("http://localhost:5000/api/auth/createuser", {   //  take endpoint(API)  of add in thunderclient    fetch api
     method: 'POST',                                                    // getting login in server    
     headers: {                                                         //take the login's endpoint and content and token in header in thunderclient
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({name,email,password})    //sending username and password in body
   });

   const json = await response.json();
   console.log(json);
   if(json.success){
     //save the auth taken and redirect
     localStorage.setItem('token', json.authtoken);   //saved auth token in localStorage
     history("/")       // use history("/") rather than history.push("/")  in my signup page
     props.showAlert("Account Created Successfully","success")   //showing message and type in alert
    }
   else{
     props.showAlert("Invalid Credentials","danger")   //showing message and type in alert
   }
 
 }

 const onChange = (e)=>{
     setCredentials({...credentials, [e.target.name]: e.target.value})      //setting   //... spread operator.  always stayed value in credential but next properties add or overerite
     }                                                                              //whatever name is changing is equal to value
     
     
  return (
    <div className="container mt-3">
      <h2>create an account to use Notebook</h2>
      <form onClick={handleSubmit}>
      <div className="mb-3">                            {/*copy form from bootstrap*/}
        <label htmlFor="name" className="form-label">Name</label>
        <input type="name" className="form-control"  id="name" name="name" onChange={onChange} />
        </div>

        <div className="mb-3">               
        <label htmlFor="email" className="form-label">Email address </label>
        <input type="email" className="form-control"  id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">we will never share your email with anyone else</div>
        </div>

        <div>
        <label htmlFor="password" className="form-label">Password </label>
        <input type="password" className="form-control"  id="password" name="password" onChange={onChange} minLength = {5} required/>
        </div> 

        <div>
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="cpassword" className="form-control"  id="cpassword" name="cpassword" onChange={onChange} minLength = {5} required/>
        </div> 

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup
