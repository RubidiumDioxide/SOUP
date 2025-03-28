import React from 'react'

const uri = '/api/Teams';

export default function Delete({team, team:{id, userId, userName, projectId, projectName, role}, onAction}) {

    function handleDeleteForm(e) {
        e.preventDefault(); 
        fetch(uri + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
        })
            .then(onAction)
    }

    return (
        <div>
            <button class='rounded-button' onClick={handleDeleteForm}>
                Evict
            </button>
        </div>
    )
} 