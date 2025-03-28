import {React, useState} from 'react'

export default function Invite({projectId, onAction}) {
    const userId = Number(sessionStorage.getItem("savedUserID"));  

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
    
        console.log({
            id : 0, 
            projectId : projectId, 
            senderId : userId, 
            receiverId : 0, // no need to provide, controller method gets user on it's own 
            role : inviteForm.role,
            type : "invite" 
        }, inviteForm.receiverName); 

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
                <input class='rounded-input' type="text" name="receiverName" placeholder="username" value={inviteForm.receiverName} onChange={handleFormChange}/>
                
                <select class='rounded-select' name="role" onChange={handleFormChange}>
                    <option value='Lead'>Lead</option>
                    <option value='Developer'>Developer</option>
                    <option value='Designer'>Designer</option>
                </select>

                <button class='rounded-button' type="submit">Send invite to user</button>
            </form>
        </div>
    )
}