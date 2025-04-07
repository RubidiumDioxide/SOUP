import React, { useEffect, useState } from "react"; 
import {Link} from "react-router-dom";

import Edit from './Edit';
import Request from "./Request"; 
import Attach from './Attach'; 
import TeamsTable from "../teams_comps/TeamsTable";
import TasksTable from "../tasks_comps/TasksTable";
import ActionsTable from "../actions_comps/ActionsTable";


export default function IndProject() { 
  const id = window.location.pathname.split('/')[3]; 
  const uri = `/api/projects/fordisplay/${id}`; 
  const [project, setProject] = useState(null); // gets ProjectForDisplayDto!
  const [repository, setRepository] = useState(null);    
  const [refreshCond, setRefreshCond] = useState([true]);
  const [isEditing, setIsEditing] = useState(false); 
  const [isRequesting, setIsRequesting] = useState(false); 
  const [isAttaching, setIsAttaching] = useState(false); 
  const [isCreator, setIsCreator] = useState(null);
  const [isInTeam, setIsInTeam] = useState(false); 
  const userID = Number(sessionStorage.getItem("savedUserID"));

  useEffect(()=>{
    fetch(uri)
      .then(response => response.json())
      .then(p => setProject(p))
    
    setRefreshCond([false]); 
  }, refreshCond) 

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
    
      fetch(`/api/repositories/${id}`) 
      .then(response => {
        if (response.status === 404) {
          console.error('Repository not found.');
          return null; 
        }
        return response.json();
      })
      .then(data => {
        if (data !== null) {
          setRepository(data); 
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, [])

  function onAction(){
    if(isEditing){
      changeEditState(); 
    }
    if(isAttaching){
      changeAttachState(); 
    }    
    console.log("ok"); 
    setRefreshCond([true]);
  }

  function changeEditState(){
    setIsEditing(!isEditing); 
  }

  function changeRequestState(){
    setIsRequesting(!isRequesting); 
  }

  function changeAttachState(){
    setIsAttaching(!isAttaching); 
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
        
          {(!isCreator && !project.isComplete)?
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
            {(repository != null && repository != undefined)?
               <button class='github-rounded-button'>
                  <img src="src/assets/github_icon.png" alt="GitHub Logo" width="24" height="24"></img>
                  <Link to="#" onClick={() => window.location.href = `https://github.com/${repository.githubCreator}/${repository.githubName}`}>Go to project's Github repository</Link>
               </button>
              :
              <>
              {isCreator?
                <>
                <button class='rounded-button' onClick={changeAttachState}>Attach Repository</button>
                {isAttaching?
                  <Attach
                    projectId={id} 
                    onAction={onAction}
                  />
                  :
                  null
                } 
                </>
                :
                null
              }
              </>
            }
            </>
          :
          null
          }

          {(isCreator || isInTeam)? 
            <>
              <h4>Project's team</h4>
              <TeamsTable
                isCreator={isCreator}
                projectId={project.id}
                isProjectComplete={project.isComplete}
              /> 

              <h4>Tasks</h4>
              <TasksTable
                isCreator={isCreator}
                projectId={project.id}
                type="byproject" 
                isProjectComplete={project.isComplete}
              />

              <h4>Actions</h4>
              <ActionsTable
                projectId={project.id}
                taskId={null}
                actorId={null}
                isTaskComplete={null}
                type="byproject"
                onAction={onAction}
                isProjectComplete={project.isComplete}
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
