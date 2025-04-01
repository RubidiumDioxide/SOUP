import React from 'react'; 
import {Link} from 'react-router-dom'; 

export default function Action({action, action:{id, projectId, projectName, actorId, actorName, taskId, taskName, description, date}, type}) {
  return (
    <tr key={id}>
      {(type != 'byproject' && type != 'bytask')?
        <td><Link to={`/project/${projectId}`}>{projectName}</Link></td>
        :
        null
      }
      {(type != 'bytask')?
        <td><Link to={`/task/${taskId}`}>{taskName}</Link></td>
        : 
        null
      }
      <td>{description}</td>
      <td><Link to={`/user/${actorId}`}>{actorName}</Link></td>
      <td>{date}</td> 
    </tr>
  )
} 