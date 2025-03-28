import { Descriptions } from 'antd';
import {React, useEffect, useState} from 'react'

export default function Add({projectId, onAction}) {
    const [teammates, setTeammates] = useState([]); 
    const [user, setUser] = useState({});
    const [addForm, setAddForm] = useState({
        name : "",
        description : "", 
        assigneeName : "" 
    }); 

    useEffect(() => {
        fetch(`/api/Users/${sessionStorage.getItem('savedUserID')}`)
            .then(response => response.json())
            .then(data => setUser(data))

        fetch(`/api/Teams/ForDisplay/Project/${projectId}`)
            .then(response => response.json())
            .then(data => setTeammates(data)); 
    }, [])

    function handleFormChange(e){
        setAddForm({
          ...addForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleAddForm(e) {
        e.preventDefault();
    
        console.log({
            id : 0, 
            projectId : projectId, 
            assigneeId : 0, // no need to provide, controller method gets user on it's own 
            name : addForm.name,
            description : addForm.description, 
            isComplete : false
        }, addForm);

        fetch(`/api/Tasks/${addForm.assigneeName}`, {
            method : "POST", 
            headers : {
                "Content-Type" : "application/json"
            },             
            body : JSON.stringify({
                id : 0, 
                projectId : projectId, 
                creatorId : user.id, 
                assigneeId : 0, // no need to provide, controller method gets user on it's own 
                name : addForm.name,
                description : addForm.description, 
                isComplete : false
            })
        })
            .then(onAction)
    }

    return (
        <div>
            <form onSubmit={handleAddForm}>
                <input class='rounded-input' type="text" name="name" placeholder="task name" value={addForm.name} onChange={handleFormChange}/>

                <input class='rounded-input' type="text" name="description" placeholder="task description" value={addForm.description} onChange={handleFormChange}/>

                <select class='rounded-select' name="assigneeName" onChange={handleFormChange}>
                    {teammates.map(teammate => 
                        <option key={teammate.id} value={teammate.userName.toString()}>{teammate.userName}</option>
                    )}    
                </select>
                
                <button class='rounded-button' type="submit">Add Task</button>
            </form>
        </div>
    )
}