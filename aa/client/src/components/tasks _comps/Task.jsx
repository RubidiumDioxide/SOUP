import React from 'react'; 
import {Link} from 'react-router-dom'; 

// deconstructed props
export default function Task({task, task:{id, projectId, assigneeId, name, description, isComplete}, onAction, isCreator}) {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <Link to={`/user/${assigneeId}`}>replace this text with assignee name later (w/fordisplaydto)</Link>
      </td>
      <td>{(isComplete===true)?"Done":"In progress"}</td>  
    </tr>
  )
} 