import { Descriptions } from 'antd';
import React, { useState } from 'react'

const uri = '/api/users';

export default function Edit({user, refresh}) {
  const [editForm, setEditForm] = useState({
    id : user.id, 
    name : user.name,
    password : user.password 
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
            .then(refresh())
    }

    return (
        <div>
            <h4>Edit project name & description</h4>
            <form onSubmit={handleEditForm}>
                <input type="text" name="name" value={editForm.name} onChange={handleEditChange}/>
                <input type="text" name="password" value={editForm.password} onChange={handleEditChange}/>
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
} 