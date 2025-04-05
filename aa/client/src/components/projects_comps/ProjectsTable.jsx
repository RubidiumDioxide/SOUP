import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'; 
import Project from "./Project"; 
//import Add from "./Add"; 
import Search from './Search'; 


export default function ProjetcsTable({type}) {
  const [projects, setProjects] = useState([]);
  const [refreshCond, setRefreshCond] = useState([false]);
  const [searchCond, setSearchCond] = useState([false]); 
  const [isAdding, setIsAdding] = useState(false); 
  const userId = sessionStorage.getItem("savedUserID");
  const [searchForm, setSearchForm] = useState({
    id : 0,
    name : "", 
    description : "", 
    creator : 0, 
    creatorName : ""
  }); 

  var uri = (type=="my")?`/api/Projects/ForDisplay/Creators/${userId}`:'/api/Projects/ForDisplay'; 

  useEffect(()=>{
    fetch(uri)
    .then(response => response.json())
    .then(data => setProjects(data)); 
    setRefreshCond([false]); 
  }, refreshCond)

  useEffect(()=>{
    fetch('/api/Projects/Search/ForDisplay', { 
      method: "POST",
      headers: {
          "Content-Type" : "application/json"
      },
      body: JSON.stringify(searchForm) 
      })
    .then(response => response.json())
    .then(data => setProjects(data)); 
    setSearchCond([false]); 
  }, searchCond)

  function onAction(){
    setRefreshCond([true]); 
  }

  function onSearch(searchForm){
    setSearchForm(searchForm); 
    setSearchCond([true]);
  }

  /*function changeAddState(){
    setIsAdding(!isAdding); 
  }*/

  return (
    <>
      <Search
        onSearch={onSearch}
      />

      {(type=="my")? 
      <button class='rounded-button'>
        <Link to="/newproject">New Project</Link>
      </button>
      :
      null
      }

      {(projects.length == 0)? 
      <p>No projects yet</p>  
      :
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
    }
  </>
  )
}
