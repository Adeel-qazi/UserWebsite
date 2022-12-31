import React, { useState } from 'react'         //there are two buttons in navbar when someone logins after that user would be accessible this is credential
import { useNavigate } from 'react-router-dom';        // in my login page.  use useNavigate instead useHistory

                                                   //made a component for user's Endpoint user login using cred in thunderClient
const Login = (props) => {                           
                                                     //changing the state using useState
  const [credentials, setCredentials] = useState({email: "", password: ""})   //email and password in object
   
  let history = useNavigate();                    //use useNavigate instead useHistory is hook for localStorage in my login page

    const handleSubmit = async (e)=> {
    e.preventDefault();                          //there is no need to reload again and again over    //hit login's endpoint with the help of fetch api
   
    const response = await fetch("http://localhost:5000/api/auth/login", {   //  take endpoint(API)  of add in thunderclient    fetch api
        method: 'POST',                                                    // getting login in server    
        headers: {                                                         //take the login's endpoint and content and token in header in thunderclient
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})    //sending username and password in body
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //save the auth taken and redirect
        localStorage.setItem('token', json.authtoken);   //saved authentication token in localStorage
        history("/")       // use history("/") rather than history.push("/")  in my signup page
        props.showAlert("Logeed IN Successfully","success")   //showing message and type in alert
      }
      else{
        props.showAlert("Invalid Details","danger")   //showing message and type in alert
      }
    
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})      //setting   //... spread operator.  always stayed value in credential but next properties add or overerite
        }                                                                              //whatever name is changing is equal to value
        

  return (
    <div className="container mt-3">
      <h2>login to continue to Notebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">                            {/*copy form from bootstrap*/}
        <label htmlFor="email" className="form-label">Email address </label>
        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">we will never share your email with anyone else</div>
        </div>

        <div>
        <label htmlFor="password" className="form-label">Password </label>
        <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
        </div> 

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
