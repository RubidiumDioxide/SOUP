import {React, useEffect, useState} from 'react'

export default function AddFinish({projectId, taskId, onAction, type}) { 
    const userId = Number(sessionStorage.getItem('savedUserID'));   
    const [addForm, setAddForm] = useState({
        description : "", 
    }); 

    useEffect(() => {
        /*fetch(`/api/Users/${sessionStorage.getItem('savedUserID')}`)
            .then(response => response.json())
            .then(data => setUser(data))

        fetch(`/api/Teams/ForDisplay/Project/${projectId}`)
            .then(response => response.json())
            .then(data => setTeammates(data));*/ 
    }, [])

    function handleFormChange(e){
        setAddForm({
          ...addForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleAddForm(e) {
        e.preventDefault();

       fetch(`/api/Actions`, {
            method : "POST", 
            headers : {
                "Content-Type" : "application/json"
            },             
            body : JSON.stringify({
                id : 0, 
                projectId : projectId, 
                actorId : userId, 
                taskId : taskId, 
                description : addForm.description, 
                date : Date.now
            })
        })
            .then(onAction)

        if(type == "finish"){
            fetch(`/api/Tasks/Complete/${taskId}`, {
                method : "PUT", 
                headers : {
                    "Content-Type" : "application/json"
                } 
            })
                .then(onAction)
        }
    }

    return (
        <div>
            <form onSubmit={handleAddForm}>
                <input class='rounded-input' type="text" name="description" placeholder="task description" value={addForm.description} onChange={handleFormChange}/>
                
                <button class='rounded-button' type="submit">{(type == 'add')?'Add Action':'Add Finishing Action'}</button>
            </form>
        </div>
    )
}