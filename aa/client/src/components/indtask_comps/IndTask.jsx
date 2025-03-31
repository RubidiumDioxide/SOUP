import React, { useEffect, useState } from "react"; 
import {Link} from "react-router-dom";
import ActionsTable from "../actions_comps/ActionsTable"; 


export default function IndTask() { 
  const id = window.location.pathname.split('/')[3]; 
  const [task, setTask] = useState(null); 
  const [refreshCond, setRefreshCond] = useState([true]);
  const [isEditing, setIsEditing] = useState(false); 
  const [isCreator, setIsCreator] = useState(null); 
  const [isAssignee, setIsAssignee] = useState(null); 
  const [isInTeam, setIsInTeam] = useState(false); 
  const userId = Number(sessionStorage.getItem("savedUserID"));

  useEffect(()=>{
    //get task
    fetch(`/api/tasks/fordisplay/${id}`)
      .then(response => response.json())
      .then(t => setTask(t)); 

    //get isCreator && isAssignee 
    fetch(`/api/tasks/${id}`)
      .then(response => response.json())
      .then(t => {
        setIsCreator(t.creatorId == userId); 
        setIsAssignee(t.assigneeId == userId)
    }); 

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
          <h4>{task.isComplete?"Finished":"In progress"}</h4>
          <p>
            A part of <Link to={`/project/${task.projectId}`}>{task.projectName}</Link>
            </p>
          <h4>{task.description}</h4>
          <p> 
            Assigned to <Link to={`/user/${task.assigneeId}`}>{task.assigneeName}</Link> by <Link to={`/user/${task.creatorId}`}>{task.creatorName}</Link>
          </p> 

          <ActionsTable
              projectId={task.projectId}
              taskId={task.id}
              actorId={null}
              isTaskComplete={task.isComplete}
              type="bytask"
              onAction={onAction}
          />
        </div>
      :  
        //if not
      <p>{"Sorry, I messed up the loading :( text me @rubidiumoxide"}</p> 
    );
}
