import {React, useState} from 'react'

export default function Invite({projectId, onAction}) {
    const userId = sessionStorage.getItem("savedUserID");  

    const [inviteForm, setInviteForm] = useState({
        receiverName : "",  
        role : "" , 
    }); 

    function handleFormChange(e){
        setInviteForm({
          ...inviteForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleInviteForm(e) {
        e.preventDefault();
    
        fetch(`/api/Notifications/${inviteForm.receiverName}`, {
            method : "POST", 
            headers : {
                "Content-Type" : "application/json"
            },             
            body : JSON.stringify({
                id : 0, 
                projectId : projectId, 
                senderId : userId, 
                receiverId : 0, // no need to provide, controller method gets user on it's own 
                role : inviteForm.role,
                type : "invite" 
            })
        })
    }

    return (
        <div>
            <form onSubmit={handleInviteForm}>
                <input type="text" name="receiverName" placeholder="username" value={inviteForm.receiverName} onChange={handleFormChange}/>
                <input type="text" name="role" placeholder="role" value={inviteForm.role} onChange={handleFormChange}/>
                <button type="submit">Send invite to user</button>
            </form>
        </div>
    )
}