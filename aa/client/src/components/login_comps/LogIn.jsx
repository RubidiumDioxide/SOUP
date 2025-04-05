import React, { useEffect, useState } from "react";


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
        <div>
            <h4>Log In</h4>
            <form onSubmit={handleLogInForm}>
                <div class='app-div'>
                    <input class='rounded-input' name="name" type="text" required minLength="1" maxLength="20" placeholder="your username" onChange={handleChange}/>
                    <input class='rounded-input' name="password" type="text" required minLength="4" maxLength="20" placeholder="your password" onChange={handleChange}/> 
                </div>

                <div class='app-div'> 
                    <button class='rounded-button' type="submit">Let me in I don't bite I swear</button>
                </div>
            </form>
        </div>
    );
}
