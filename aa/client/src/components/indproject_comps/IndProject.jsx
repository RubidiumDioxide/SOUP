import React, { useEffect, useState } from "react"; 
import {Link} from "react-router-dom";

import Edit from './Edit';
import Request from "./Request"; 
import TeamsTable from "../teams_comps/TeamsTable";
import TasksTable from "../tasks_comps/TasksTable";
import ActionsTable from "../actions_comps/ActionsTable";


export default function IndProject() { 
  const id = window.location.pathname.split('/')[3]; 
  const uri = `/api/projects/fordisplay/${id}`; 
  const [project, setProject] = useState(null); // gets ProjectForDisplayDto!   
  const [refreshCond, setRefreshCond] = useState([true]);
  const [isEditing, setIsEditing] = useState(false); 
  const [isRequesting, setIsRequesting] = useState(false); 
  const [isCreator, setIsCreator] = useState(null);
  const [isInTeam, setIsInTeam] = useState(false); 
  const userID = Number(sessionStorage.getItem("savedUserID"));

  useEffect(()=>{
    fetch(uri)
      .then(response => response.json())
      .then(p => setProject(p))
  }, []) 

  useEffect(() => {
    fetch(uri)
      .then(response => response.json())
      .then(p => setIsCreator(p.creatorId == sessionStorage.getItem("savedUserID")))

    fetch(`/api/users/isinteam/${Number(sessionStorage.getItem("savedUserID"))}/${id}`)
      .then(response => { 
        if(response.ok){
          setIsInTeam(true); 
        }
        else{
          setIsInTeam(false); 
        }
      })
  }, [])

  function onAction(){
    setRefreshCond([true]);
  }

  function changeEditState(){
    setIsEditing(!isEditing); 
  }

  function changeRequestState(){
    setIsRequesting(!isRequesting); 
  }

  return (
      (project)?
        //if project is loaded 
        <div class='page'>
          <h1>{project.name}</h1>
          <p>A project started by 
            <Link to={`/user/${project.creatorId}`}>{project.creatorName}</Link>
          </p>
          <h4>{project.description}</h4> 
          
          {isCreator?
            <>  
              {(isEditing)? 
                <Edit
                  project={project}
                  onAction={onAction}
                /> : null}
              <button class='rounded-button' onClick={changeEditState}>
                Edit
              </button>
            </>
            :
            null
          }
        
          {(!isCreator)?
          <>
            <button class='rounded-button' onClick={changeRequestState}>
              Request
            </button>

            {isRequesting?
            <Request
              project={project}
              senderId={userID}  
            />
            :
            null
            } 
          </>
          :
          null}

          {(isCreator || isInTeam)? 
            <>
              <h4>Project's team</h4>
              <TeamsTable
                isCreator={isCreator}
                projectId={project.id}
              /> 

              <h4>Tasks</h4>
              <TasksTable
                isCreator={isCreator}
                projectId={project.id}
                type="byproject" 
              />

              <h4>Actions</h4>
              <ActionsTable
                projectId={project.id}
                taskId={null}
                actorId={null}
                isTaskComplete={null}
                type="byproject"
                onAction={onAction}
              />
            </>
            :
            null        
          }

        </div>
      :  
        //if not
      <p>{"Sorry, I messed up the loading :( text me @rubidiumoxide"}</p>    
    );
}
