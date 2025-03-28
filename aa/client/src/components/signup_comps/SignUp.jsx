import React, { useEffect, useState } from "react";

import './SignUp.css'


const uri = '/api/users'; 

export default function SignUp({changeAppState}) { 
    const [signUpForm, setSignUpForm] = useState({
        name : "",
        password : "",  
      })

    function handleChange(e){
        setSignUpForm({
          ...signUpForm, 
          [e.target.name]: e.target.value
        })
    }

    function handleSignUpForm(e){
        e.preventDefault(); 
        console.log(JSON.stringify(signUpForm));
        fetch(uri, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json" 
            }, 
            body: JSON.stringify(signUpForm), 
        })
            .then(response => response.json())
            .then(changeAppState("registered_user"))
    }

    return (
        <div class='signup'>
            <h4>Sign up</h4>
            <form onSubmit={handleSignUpForm} class='signup-div'>
                <input class='rounded-input' name="name" type="text" required minLength="1" maxLength="20" placeholder="your username" onChange={handleChange}/>
                <input class='rounded-input' name="password" type="text" required minLength="4" maxLength="20" placeholder="very strong password" onChange={handleChange}/>
                <button class='rounded-button' type="submit">Sign me up fam</button>
            </form>
        </div>
    );
}
