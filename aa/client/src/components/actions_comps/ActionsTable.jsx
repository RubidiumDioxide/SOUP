import React, { use, useEffect, useState } from "react";

import Action from "./Action"; 
import AddFinish from "./AddFinish"; 
//import Finish from "./Finish"; 


export default function ActionsTable({projectId, taskId, actorId, isTaskComplete, type, onAction}) {
  const [actions, setActions] = useState([]);
  const [refreshCond, setRefreshCond] = useState([false]);   
  const [isAdding, setIsAdding] = useState(false); 
  const [isFinishing, setIsFinishing] = useState(false); 


  var uri
  if(type=="byproject"){
    uri = `/api/Actions/ByProject/ForDisplay/${projectId}`
  }
  if(type=="bytask"){
    uri = `/api/Actions/ByTask/ForDisplay/${taskId}`
  }
  if(type=="byactor"){
    uri = `/api/Actions/ByActor/ForDisplay/${actorId}`
  }

  useEffect(()=>{
    fetch(uri)
    .then(response => response.json())
    .then(data => setActions(data)); 
    setRefreshCond([false]); 
  }, refreshCond)

  function onAction(){
    setRefreshCond([true]); 
  }

  function changeAdding(){
    if(isFinishing){
      setIsFinishing(false); 
    }
    
    setIsAdding(!isAdding); 
  }

  function changeFinishing(){
    if(isAdding){
      setIsAdding(false); 
    }
    
    setIsFinishing(!isFinishing); 
  }

return (
  <div>
    {(type == 'bytask')?
      (!isTaskComplete)? 
        <>
          <button class='rounded-button'onClick={changeFinishing}> 
            Finish Task              
          </button>

          <button class='rounded-button' onClick={changeAdding}> 
            Add Action to the Task           
          </button>
            
          {(isAdding || isFinishing)?
          <AddFinish
            projectId={projectId} 
            taskId={taskId} 
            onAction={onAction}
            type={(isFinishing)?"finish":"add"}
          />
          : 
          null}
        </> 
        :
        null
      :
      null  
    }

    {(actions.length == 0)? 
    <p>No actions yet</p>  
    : 
    <table>
      <thead>
        <tr>
          {(type != 'byproject' && type != 'bytask')?
            <th>Project</th>
            :
            null
          }
          {(type != 'bytask')?
            <th>Task</th>
            :
            null
          }
          <th>Description</th>
          <th>Actor</th>
          <th>Github Commit</th>
          <th>Date&Time</th>
        </tr>
      </thead>
      <tbody>
        {actions.map(action =>
          <Action
            key={[action.id]}
            action={action}
            type={type}
          />)}
      </tbody>
    </table>
    } 
  </div>
  );
} 