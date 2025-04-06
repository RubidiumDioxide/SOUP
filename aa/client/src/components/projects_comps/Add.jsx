/* mMARKED FOR DELETION */
import {React, useState} from 'react'

export default function Add({ onAction }) {
    const [addForm, setAddForm] = useState({
        name : "", 
        description : "", 
        isPrivate: false, 
        dateDeadline : "", 
    }); 
    
    function handleFormChange(e){
        setAddForm({
          ...addForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleAddForm(e) {
        e.preventDefault();

        fetch('/api/Projects', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id : 0, 
                name : addForm.name, 
                description : addForm.description, 
                creator : sessionStorage.getItem("savedUserID"), 
                isComplete : false,  
                dateBegan : "", 
                dateFinished : "",  
                dateDeadline : addForm.dateDeadline, 
                isPrivate : addForm.isPrivate 
            }) 
        })
            .then(onAction)
    }

    return (
        <div>
            <h4>New Project</h4>
            <form onSubmit={handleAddForm}>
                <input class='rounded-input' type="text" name="name" placeholder="project name" value={addForm.name} onChange={handleFormChange}/>
                <input class='rounded-input' type="text" name="description" placeholder="description" value={addForm.description} onChange={handleFormChange}/>
                <button class='rounded-button' type="submit">Create Project</button>
            </form>
        </div>
    )
} 
