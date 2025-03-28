import React, { useEffect, useState } from "react";
import Project from "./Project"; 
import Add from "./Add"; 
import Edit from "./Edit";

import './Projects.css'


export default function ProjetcsTable({type}) {
  const [projects, setProjects] = useState([]);
  const [refreshCond, setRefreshCond] = useState([false]); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding, setIsAdding] = useState(false); 
  const [capturedProject, setCapturedProject] = useState(null);

  const userId = sessionStorage.getItem("savedUserID");

  var uri = (type=="my")?`/api/Projects/ForDisplay/Creators/${userId}`:'/api/Projects/ForDisplay'; 

  useEffect(()=>{
    fetch(uri)
    .then(response => response.json())
    .then(data => setProjects(data)); 
    setRefreshCond([false]); 
  }, refreshCond)

  function onAction(){
    setRefreshCond([true]); 
  }

  function changeAddState(){
    setIsAdding(!isAdding); 
  }

  function changeEditState(){
    setIsEditing(!isEditing); 
  }

  function captureEdit(clickedTeam){ 
    changeEditState(); 
    setCapturedTeam(clickedTeam); 
  }

  return (
    <>
      {(type=="my")? 
      <>
        <button class='rounded-button' onClick={changeAddState}>
          New Project
        </button>

        {isAdding?
        (<Add 
            onAction={onAction}
          />) 
          : 
          null}
      </> 
      : 
      null}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project =>
            <Project
              key={project.id}
              project={project}
            />)}
        </tbody>
      </table>
  </>
  )
}
