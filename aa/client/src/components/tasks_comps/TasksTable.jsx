import React, { useEffect, useState } from "react";
import Task from "./Task"; 
import Add from "./Add"; 

export default function TasksTable({isCreator, projectId, type}) {
  const [tasks, setTasks] = useState([]);
  const [refreshCond, setRefreshCond] = useState([false]);   
  const [isAdding, setIsAdding] = useState(false); 
  const userId = sessionStorage.getItem('savedUserID');

  var uri
  if(type=="project's"){
    uri = `/api/Tasks/ByProject/ForDisplay/${projectId}`
  }
  if(type=="my"){
    uri = `/api/Tasks/ByAssignee/ForDisplay/${userId}`
  }

  useEffect(()=>{
    fetch(uri)
    .then(response => response.json())
    .then(data => setTasks(data)); 
    setRefreshCond([false]); 
  }, refreshCond)

  function onAction(){
    setRefreshCond([true]); 
  }

  function changeAddState(){
    setIsAdding(!isAdding); 
  }

return (
  <div>
    {isCreator? <div>
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
  </div>
  );
} 