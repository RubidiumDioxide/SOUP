import {React, useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom'; 

// deconstructed props
export default function Notification({notification, notification:{id, projectId, senderId, receiverId, role, type}, onAction}) {
  const [project, setProject] = useState({}); 
  const [refreshCond, setRefreshCond] = useState([true]);

  //load project 
  useEffect(() =>{
    fetch(`/api/Projects/${projectId}`, {
      method: "GET"})
      .then(response => response.json())
      .then(p => setProject(p)); 
  }, []); 

  function Accept(){
    var team; 
    
    if(type == "invite"){
      team = {
        id : 0, 
        userId : receiverId, 
        userName: "",  // not needed for POST
        projectId : projectId,
        projectName : "", //not needed for POST 
        role : role 
      } 
    }
    else if(type == "request"){
      team = {
        id : 0, 
        userId : senderId, 
        userName: "",  // not needed for POST
        projectId : projectId,
        projectName : "", //not needed for POST 
        role : role 
      }  
    }

    console.log(team); 

    fetch(`/api/Teams`, {
      method : "POST", 
      headers : {
        "content-Type" : "application/json"
      }, 
      body: JSON.stringify(team)
    })
      .then(response => response.ok?
      // DELETE request to delete invite entry  
        fetch(`/api/Notifications/${id}`, {
          method : "DELETE", 
          headers: {
            "Content-Type" : "application/json"  
          }
        })  
          .then(onAction)
        :
        null
      ); 
  } 

  function Decline(){
    // DELETE request to delete invite entry  
    fetch(`/api/Notifications/${id}`, {
      method : "DELETE", 
      headers: {
        "Content-Type" : "application/json"  
      }
    })  
      .then(onAction); 
  } 



  // replace senderId with getting user earlier and showing senderName


  return (
    {project}? 
    // if project loaded
    <div>
      <p>
        {type=="invite"?
        <>
          You were invited to participate in 
          <Link to={`/project/${projectId}`}> {project.name} </Link>
          as a {role}!
        </>
        :
        null}
        {type=="request"?
        <>
          <Link to={`/user/${senderId}`}> {senderId} </Link>  
          sent a request to participate in your project  
          <Link to={`/project/${projectId}`}> {project.name} </Link>
          as a {role}. 
        </>
        :
        null}

      </p>
      <p>
        <button onClick={Accept}>
          Accept
        </button>
        <button onClick={Decline}>
          Decline
        </button>
      </p>
    </div>
    :
    // if not 
    <p>{"Sorry, I messed up the loading :( text me @rubidiumoxide"}</p>  
  )
} 
