import React from 'react'                                       //rafce
import {  Link, useLocation, useNavigate  }   from "react-router-dom";       //import react-router-dom from react router 
 

const Navbar = () => {
  let history = useNavigate();

  const handleLogout = ()=>{
  localStorage.removeItem('token');     //remove token item form localStorage
  history('/login')                    //redirect in login that you have to login 
  }
  
    let location = useLocation();                               // useLocation: this hook returns the current location object. This can be useful if you'd like to perform some side effect whenever the current location changes.

  return (                                                      //import navbar from bootstrap
   <>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/navbar">Notebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active": ""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about" ? "active": ""}`} to="/about">About</Link>
        </li>
        
       
      </ul>             {/*inside curley bracket if it is not null so he is login and showing Logout*/}
      {!localStorage.getItem('token')?<form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>    {/*there are two buttons in navbar when someone logins after that user would be accessible this is credential*/}
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>:<button  onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
   </>
  )
}

export default Navbar
