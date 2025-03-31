import React from 'react'; 
import {Link} from 'react-router-dom'; 

export default function Action({action, action:{id, projectId, actorId, taskId, description, date}}) {
  return (
    <tr key={id}>
      <td>{description}</td>
      <td>{actorId}</td>
      <td>{date}</td> 
    </tr>
  )
} 