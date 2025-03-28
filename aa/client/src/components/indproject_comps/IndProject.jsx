import React, { useEffect, useState } from "react"; 
import {Link} from "react-router-dom";

import Request from "./Request"; 
import TeamsTable from "../teams_comps/TeamsTable";
import TasksTable from "../tasks _comps/TasksTable";

import './IndProject.css';


export default function IndProject() { 
  const id = window.location.pathname.split('/')[3]; 
  const uri = `/api/projects/fordisplay/${id}`; 
  const [project, setProject] = useState(null); // gets ProjectForDisplayDto!   
  const [refreshCond, setRefreshCond] = useState([true]);
  const [isEditing, setIsEditing] = useState(false); 
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
          <Request
            project={project}
            senderId={userID}  
          />
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
