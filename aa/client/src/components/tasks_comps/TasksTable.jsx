import React, { useEffect, useState } from "react";
import Task from "./Task"; 
import Add from "./Add"; 

export default function TasksTable({isCreator, projectId, type, isProjectComplete}) {
  const [tasks, setTasks] = useState([]);
  const [refreshCond, setRefreshCond] = useState([false]);   
  const [isAdding, setIsAdding] = useState(false); 
  const [isInTeam, setIsInTeam] = useState(false); 
  const userId = sessionStorage.getItem('savedUserID');

  var uri
  if(type=="byproject"){
    uri = `/api/Tasks/ByProject/ForDisplay/${projectId}`
  }
  if(type=="byassignee"){
    uri = `/api/Tasks/ByAssignee/ForDisplay/${userId}`
  }

  useEffect(()=>{
    fetch(uri)
    .then(response => response.json())
    .then(data => setTasks(data)); 
    setRefreshCond([false]); 

    fetch(`/api/users/isinteam/${Number(sessionStorage.getItem("savedUserID"))}/${projectId}`)
    .then(response => { 
      if(response.ok){
        setIsInTeam(true); 
      }
      else{
        setIsInTeam(false); 
      }
    })
  }, refreshCond)

  function onAction(){
    setRefreshCond([true]); 
  }

  function changeAddState(){
    setIsAdding(!isAdding); 
  }

return (
  <div>
    {(isInTeam && !isProjectComplete)? <div>
      <button class='rounded-button' onClick={changeAddState}>
        New task
      </button>
      
      {isAdding?
      (<Add
          projectId={projectId}
          onAction={onAction}
        />)
      : null}

    </div> : null}

    {(tasks.length == 0)?
    <p>No tasks yet</p>
    : 
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Assigned to</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task =>
          <Task
            key={[task.id]}
            task={task}
            onAction={onAction}
            isCreator={isCreator}
          />)}
      </tbody>
    </table>
    }
  </div>
  );
} 