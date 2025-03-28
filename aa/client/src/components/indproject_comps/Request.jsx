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
                <select class='rounded-select' name="role" onChange={handleRequestChange}>
                    <option value='Lead'>Lead</option>
                    <option value='Developer'>Developer</option>
                    <option value='Designer'>Designer</option>
                </select>

                <button class='rounded-button' type="submit">Send request to participate</button>
            </form>
        </div>
    )
} 