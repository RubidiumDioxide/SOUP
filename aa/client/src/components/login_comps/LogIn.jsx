import React, { useEffect, useState } from "react";

import './Login.css';


const uri = '/api/users'; 

export default function Login({changeAppState}) { 
    const [logInForm, setLogInForm] = useState({
        name : "",
        password : "",  
      })

    function handleChange(e){
        setLogInForm({
          ...logInForm, 
          [e.target.name]: e.target.value
        })
    }


    function handleLogInForm(e){
        e.preventDefault(); 
        console.log(uri + `/Find/${logInForm.name}`);
        fetch(uri + `/Find/${logInForm.name}`, {
            method: "GET", 
            headers: {
                "Content-Type" : "application/json" 
            } 
        })
            .then(response =>{
                if(response.ok){
                    response.json().then(user =>{
                        changeAppState("registered_user", user.id); 
                    })
                }
                else{
                    changeAppState("observer", null);   
                }
            })
    }

    return (
        <div class='login'>
            <h4>Log In</h4>
            <form onSubmit={handleLogInForm} class='login-div'>
                <input class='rounded-input' name="name" type="text" required minLength="1" maxLength="20" placeholder="your username" onChange={handleChange}/>
                <input class='rounded-input' name="password" type="text" required minLength="4" maxLength="20" placeholder="your password" onChange={handleChange}/>
                <button class='rounded-button' type="submit">Let me in I don't bite I swear</button>
            </form>
        </div>
    );
}
