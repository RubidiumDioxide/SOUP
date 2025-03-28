import React from 'react'; 
import Delete from './Delete'; 
import {Link} from 'react-router-dom'; 

// deconstructed props
export default function Team({team, team:{id, userId, userName, projectId, projectName, role}, onAction, captureEdit, isCreator}) {
  return (
    <tr key={id}>
      <td>
        <Link to={`/user/${userId}`}>{userName}</Link>
      </td>
      <td>{role}</td>
      {isCreator?
      <>
        <td>
         <Delete
           team={team} 
           onAction={onAction}
         />
        </td>
        <td>
          <button class='rounded-button' onClick={(e) => captureEdit(team)}>
            Change Role
          </button>
        </td>
      </>
      :
      null
    }   
    </tr>
  )
} 