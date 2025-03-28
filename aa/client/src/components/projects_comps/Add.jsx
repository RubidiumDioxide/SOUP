import {React, useState} from 'react'

export default function Add({ onAction }) {
    const [addForm, setAddForm] = useState({
        id : 0, 
        name : "", 
        description : "", 
        creator: sessionStorage.getItem("savedUserID") 
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
            body: JSON.stringify(addForm),
        })
            .then(onAction)
    }

    return (
        <div>
            <h4>New Project</h4>
            <form onSubmit={handleAddForm}>
                <input type="text" name="name" placeholder="project name" value={addForm.name} onChange={handleFormChange}/>
                <input type="text" name="description" placeholder="description" value={addForm.description} onChange={handleFormChange}/>
                <button type="submit">Create Project</button>
            </form>
        </div>
    )
} 
