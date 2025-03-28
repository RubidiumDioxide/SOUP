import React, { useState } from 'react'

const uri = '/api/projects';

export default function Edit({project, onAction}) {
  const [editForm, setEditForm] = useState({
    id : project.id, 
    name : project.name, 
    description : project.description,   
    creator : project.creator 
  })

    function handleEditChange(e){
      setEditForm({
        ...editForm, 
        [e.target.name]: e.target.value
      })
    }

    function handleEditForm(e) {
        e.preventDefault();
        fetch(uri + `/${editForm.id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm),
        })
            .then(response => response.json())
            .then(onAction)
    }

    return (
        <div>
            <h4>Edit project name & description</h4>
            <form onSubmit={handleEditForm}>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange}/>
                <input type="text" name="description" value={editForm.description} onChange={handleEditChange}/>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
} 