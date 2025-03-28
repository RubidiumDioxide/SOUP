import React, { useEffect, useState } from "react";
import SignUp from '../signup_comps/SignUp'; 
import LogIn from '../login_comps/LogIn'; 

const uri = '/api/users'; 

export default function Welcome({changeAppState}) { 
  const [welcomeState, setWelcomeState] = useState("none"); //possible values: none, login, signup  

    return (
        <div>
          <p>Hiiiiiiiii</p>  
          <p>
            <button class='rounded-button' onClick={() => {setWelcomeState("login")}}>
              Log In
            </button>
            <button class='rounded-button' onClick={() => {setWelcomeState("signup")}}>
              Sign Up            
            </button>
          </p>
          
          {(welcomeState === "signup")? 
            <SignUp changeAppState={changeAppState}/>          
            :
            null
          }
          {(welcomeState === "login")? 
            <LogIn changeAppState={changeAppState}/>          
            :
            null
          }
        </div>
    );
}
