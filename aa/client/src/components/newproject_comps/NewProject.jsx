import {React, useState} from 'react'

export default function Add({ onAction }) {
    const userId = Number(sessionStorage.getItem('savedUserID')); 
    const [addForm, setAddForm] = useState({
        name : '', 
        description : '', 
    }); 
    
    function handleFormChange(e){
        setAddForm({
          ...addForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleAddForm(e) {
        e.preventDefault();

        //tons of fetches (and by tons I mean one) 

        // POST fetch for project (and, consequently, team(creator))
        fetch(`/api/Projects/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              Id : 0, 
              Name : addForm.name, 
              Description : addForm.description, 
              Creator : userId, 
              Repository : 0 
            })                
        })
    }

    return (
        <div>
            <h1>Start a New Project!</h1>
            <form onSubmit={handleAddForm}>
                { /* general */ }
                
                <div class='app-div'>
                  <input class='rounded-input' type="text" name="name" placeholder="project name" value={addForm.name} onChange={handleFormChange}/>
                  <input class='rounded-input' type="text" name="description" placeholder="project description" value={addForm.description} onChange={handleFormChange}/>
                </div>

                {/* submit for post */}
                <div lass='app-div'>
                  <button class='fancy-rounded-button' type="submit">New Project</button>
                </div>
            </form>
        </div>
    )
} 
