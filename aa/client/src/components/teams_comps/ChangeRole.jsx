import {React, useState} from 'react'

const uri = '/api/Teams';

export default function ChangeRole({team, onAction}) {
    const [editForm, setEditForm] = useState({
        userId : team.userId,
        userName: team.userName,  //not needed 
        projectID : team.projectId, 
        projectName : team.projectName, //not needed
        role : team.role  
    });  

    function handleFormChange(e){
        setEditForm({
          ...editForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleEditForm(e) {
        e.preventDefault();
        
        fetch(uri + `/${team.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm),
        })
            .then(onAction); 
    }

    return (
        <div>
            <h4>Edit name & description</h4>
            <form onSubmit={handleEditForm}>
                <input type="text" name="role" value={editForm.role} onChange={handleFormChange}/>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
} 