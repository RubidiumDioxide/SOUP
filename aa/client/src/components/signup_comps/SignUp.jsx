import React, { useEffect, useState } from "react";


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
        
        fetch(uri, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json" 
            }, 
            body: JSON.stringify(signUpForm), 
        })
        .then(response => {
            if(response.ok){
                fetch(uri + `/Find/${signUpForm.name}`, {
                    method: "GET", 
                    headers: {
                        "Content-Type" : "application/json" 
                    } 
                })
                    .then(response =>{
                        if(response.ok){
                            response.json().then(user =>{
                                changeAppState("registered_user", user.id); 
                                alert("successful signup");
                            })
                        }
                        else{
                            changeAppState("observer", null);
                            alert("signup failed");
                        }
                    })      
            }
        })
    }

    return (
        <div>
            <h4>Sign up</h4>
            <form onSubmit={handleSignUpForm} >
                <div class='app-div'>
                    <input class='rounded-input' name="name" type="text" required minLength="1" maxLength="20" placeholder="your username" onChange={handleChange}/>
                    <input class='rounded-input' name="password" type="text" required minLength="4" maxLength="20" placeholder="very strong password" onChange={handleChange}/>
                </div>

                <div class='app-div'> 
                    <button class='rounded-button' type="submit">Sign me up fam</button>
                </div>
               
            </form>
        </div>
    );
}
