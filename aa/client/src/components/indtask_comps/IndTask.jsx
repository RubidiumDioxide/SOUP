import React, { useEffect, useState } from "react"; 
import {Link} from "react-router-dom";


export default function IndTask() { 
  const id = window.location.pathname.split('/')[3]; 
  const [task, setTask] = useState(null); // gets TaskForDisplayDto!   
  const [refreshCond, setRefreshCond] = useState([true]);
  const [isEditing, setIsEditing] = useState(false); 
  const [isCreator, setIsCreator] = useState(null); 
  const [isAssignee, setIsAssignee] = useState(null); 
  const [isInTeam, setIsInTeam] = useState(false); 
  const userID = Number(sessionStorage.getItem("savedUserID"));

  useEffect(()=>{
    //get task
    fetch(`/api/tasks/fordisplay/${id}`)
      .then(response => response.json())
      .then(t => setTask(t))

    //get isCreator
    fetch(`/api/tasks/${id}`)
      .then(response => response.json())
      .then(t => setIsCreator(t.creatorId == userID))

    //get isAssignee
    fetch(`/api/tasks/${id}`)
    .then(response => response.json())
    .then(t => setIsAssignee(t.assigneeId == userID))

    //for now, only the assignee and the creator of the task can see it. may change so that everyone in team can see it
    /*fetch(`/api/users/isinteam/${Number(sessionStorage.getItem("savedUserID"))}/${id}`)
      .then(response => { 
        if(response.ok){
          setIsInTeam(true); 
        }
        else{
          setIsInTeam(false); 
        }
      })*/
  }, []) 

  function onAction(){
    setRefreshCond([true]);
  }

  function changeEditState(){
    setIsEditing(!isEditing); 
  }

  return (
      (task && (isCreator || isAssignee))?
        //if task is loaded and should be viewed 
        <div>
          <h1>{task.name}</h1>
          <p>
            A part of <Link to={`/project/${task.projectId}`}>{task.projectId} replace id with name through redacting dto</Link>
            </p>
          <h4>{task.description}</h4>
          <p> 
            Assigned to <Link to={`/user/${task.assigneeId}`}>{task.assigneeName}</Link> by <Link to={`/user/${task.creatorId}`}>{task.creatorName}</Link>
          </p> 
          
          {(isAssignee || isCreator)?  
            <button class='rounded-button'> 
              Finish task               
            </button>
            :
            null
          }

          {isCreator? 
            /*<button class='rounded-button'> 
              Delete task               
            </button>*/
            <></>
            :
            null
          }
        </div>
      :  
        //if not
      <p>{"Sorry, I messed up the loading :( text me @rubidiumoxide"}</p>    
    );
}
