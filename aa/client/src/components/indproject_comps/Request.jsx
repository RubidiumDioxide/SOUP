import React, { useState } from 'react'

export default function Request({project, senderId}) {
  const [requestForm, setRequestForm] = useState({
    senderId : senderId, 
    role : "" 
  })

    function handleRequestChange(e){
      setRequestForm({
        ...requestForm, 
        [e.target.name]: e.target.value
      })
    }

    function handleRequestForm(e) { 
      e.preventDefault();

      console.log({
        id : 0, 
        projectId : project.id, 
        senderId : senderId, 
        receiverId : project.creatorId, 
        role : requestForm.role,
        type : "request" 
      })

      fetch(`/api/Notifications`, {
        method : "POST", 
        headers : {
            "Content-Type" : "application/json"
        },             
        body : JSON.stringify({
            id : 0, 
            projectId : project.id, 
            senderId : senderId, 
            receiverId : project.creatorId, 
            role : requestForm.role,
            type : "request" 
        })
        })
    }

    return (
        <div>
            <form onSubmit={handleRequestForm}>
                <input type="text" name="role" placeholder="role" value={requestForm.description} onChange={handleRequestChange}/>
                <button type="submit">Send request to project's creator</button>
            </form>
        </div>
    )
} 