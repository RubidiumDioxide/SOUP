import React from 'react'
import {Link} from 'react-router-dom'; 

// deconstructed props
export default function Project({project, project:{id, name, description, creatorId, creatorName, isComplete, dateBegan, dateFinished, dateDeadline}}) {
  return (
    <tr key={id}>
      <td>
        <Link to={`/project/${id}`}>{name}</Link>
      </td>
      <td>{description}</td>
      <td>
        <Link to={`/user/${creatorId}`}>{creatorName}</Link>
      </td>
      <td>{isComplete? "Finished":"In progress"}</td>
      <td>{dateBegan}</td>
      <td>{dateFinished? dateFinished:""}</td>
      <td>{dateDeadline? dateDeadline:""}</td>
    </tr>
  )
} 