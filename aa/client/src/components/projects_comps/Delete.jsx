// redundant script, as you can't currently delete a project, only finish it. the script is also probably incompatible, but I'll keep it just in case. 

import React from 'react'

const uri = '/api/Projects';

export default function Delete({project, handleDelete}) {
    let {id, name, description} = project; 

    function handleDeleteForm(e) {
        e.preventDefault(); 
        fetch(uri + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(deletedProject => handleDelete(deletedProject))
    }

    return (
        <div>
            <button onClick={handleDeleteForm}>
                Delete
            </button>
        </div>
    )
} 