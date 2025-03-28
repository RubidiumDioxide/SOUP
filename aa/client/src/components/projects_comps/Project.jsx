import React from 'react'
import {Link} from 'react-router-dom'; 

// deconstructed props
export default function Project({project, project:{id, name, description, creatorId, creatorName}}) {
  return (
    <tr key={id}>
      <td>
        <Link to={`/project/${id}`}>{name}</Link>
      </td>
      <td>{description}</td>
      <td>
        <Link to={`/user/${creatorId}`}>{creatorName}</Link>
      </td>
    </tr>
  )
} 