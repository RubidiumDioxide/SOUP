import {React, useState} from 'react'

export default function Add({ projectId }) { 
    const [attachForm, setAttachForm] = useState({
        githubName : '', 
        githubCreator : ''  
    }); 
    
    function handleFormChange(e){
        setAttachForm({
          ...attachForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleAttachForm(e) {
        e.preventDefault();
        
        fetch(`/api/Projects/AttachRepository/${projectId}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              id : 0,  
              githubName : attachForm.githubName, 
              githubCreator : attachForm.githubCreator 
            })                
        })
    }

    return (
        <div>
            <h4>Note that you can only enter these values once! </h4>
            <form onSubmit={handleAttachForm}>
                <div class='app-div'>
                  <input class='rounded-input' type="text" name="githubName" placeholder="github repository name" value={attachForm.githubName} onChange={handleFormChange}/>
                  <input class='rounded-input' type="text" name="githubCreator" placeholder="repository creator username" value={attachForm.githubCreator} onChange={handleFormChange}/>
                </div>

                <div lass='app-div'>
                  <button class='rounded-button' type="submit">Attach</button>
                </div>
            </form>
        </div>
    )
} 
