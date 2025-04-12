import {React, useState} from 'react'
import { DatabaseDash } from 'react-bootstrap-icons';

export default function Add({ onAction }) {
    const userId = Number(sessionStorage.getItem('savedUserID')); 
    const [addForm, setAddForm] = useState({
        name : "", 
        description : "", 
        dateDeadline : "", 
        isPrivate : false 
    }); 
    
    function handleFormChange(e){
        setAddForm({
          ...addForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleAddForm(e) {
        e.preventDefault();

        //tons of fetches (and by tons I mean one) 

        console.log({
          id : 0, 
          name : addForm.name, 
          description : addForm.description, 
          isComplete : false, 
          creator : userId, 
          dateBegan : "", 
          dateFinished : "",
          dateDeadline : addForm.dateDeadline, 
          isPrivate :  Boolean(addForm.isPrivate == "on")
        }); 

        // POST fetch for project (and, consequently, team(creator))
        fetch(`/api/Projects/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              id : 0, 
              name : addForm.name, 
              description : addForm.description, 
              isComplete : false, 
              creator : userId, 
              dateBegan : "", 
              dateFinished : "",
              dateDeadline : addForm.dateDeadline, 
              isPrivate : Boolean(addForm.isPrivate == "on")
            })                
        })
        .then(response => {
          if(response.ok){
            alert(`Проект ${addForm.name} был успешно создан`)
          }
          else{
            alert("Ошибка при создании проекта. Перепроверьте введенные данные")
          }
        })
    }

    return (
        <div>
            <h1>Start a New Project!</h1>
            <form onSubmit={handleAddForm}>
                { /* general */ }
                <div class='app-div'>
                  <input class='rounded-input' required type="text" name="name" placeholder="project name" value={addForm.name} onChange={handleFormChange}/>
                  <input class='rounded-input' required type="text" name="description" placeholder="project description" value={addForm.description} onChange={handleFormChange}/>
                  Deadline
                  <input class='rounded-input' type="date" name="dateDeadline" placeholder="deadline" value={addForm.deadLine} onChange={handleFormChange}/>
                  Private
                  <input class='rounded-input' type="checkbox" name="isPrivate" onChange={handleFormChange}/>
                </div>

                {/* submit for post */}
                <div lass='app-div'>
                  <button class='fancy-rounded-button' type="submit">New Project</button>
                </div>
            </form>
        </div>
    )
} 
