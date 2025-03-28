import { Descriptions } from 'antd';
import {React, useState} from 'react'

export default function Add({projectId, onAction}) {
    const [teammates, setTeammates] = useState([]); 
    const [addForm, setAddForm] = useState({
        name : "",
        description : "", 
        assigneeName : "" 
    }); 

    useEffect(() => {
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
    
        fetch(`/api/Tasks/${addForm.assigneeName}`, {
            method : "POST", 
            headers : {
                "Content-Type" : "application/json"
            },             
            body : JSON.stringify({
                id : 0, 
                projectId : projectId, 
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

                <select name="assigneeId">
                    {teammates.map(teammate => 
                        <option name="assigneeName" value={teammate.userName}>{teammate.userName}</option>
                    )}    
                </select>
                
                <button type="submit">Send invite to user</button>
            </form>
        </div>
    )
}