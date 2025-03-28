// redundant; planning on deleting later 

import React, { useState, useRef, setState } from 'react'
import Project from './Project'
import Edit from './Edit'
import Add from './Add'

export default function Projects({projects, onAction, type}) {
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding, setIsAdding] = useState(false); 
  const [editForm, setEditForm] = useState({
      id : "",
      name : "",
      description : "",  
    })
  const [addForm, setAddForm] = useState({
      name : "",
      description : "", 
    })

  // edit
  function handleEditChange(e){
    setEditForm({
      ...editForm, 
      [e.target.name]: e.target.value
    })
  }

  function changeEditState(project){
    if(project.id === editForm.id){
      setIsEditing(isEditing => !isEditing) 
    }
    else if (isEditing === false){
      setIsEditing(isEditing => !isEditing)
    }
  }

  function captureEdit(clickedProject){
    let filtered = projects.filter(project => project.id === clickedProject.id); 
    setEditForm(filtered[0]);  
  }

  function handleUpdate(updatedProject){
    setIsEditing(false); 
    onAction(); 
  }

  // delete
  function handleDelete(deletedProject){
    onAction(); 
  }

  //add 
  function handleAddChange(e){
    setAddForm({
      ...addForm, 
      [e.target.name]: e.target.value
    })
  }

  function changeAddState(){
    setIsAdding(isAdding => !isAdding) 
  }

  function handleAdd(newProject){
    setIsAdding(false); 
    onAction(); 
  }

  return (
    <div>
    {(type == "my")? <div>
      <button
      onClick={() => {
        changeAddState(); 
      }}
      >
      Add
      </button>
      {isAdding?
       (<Add
          addForm={addForm}
          handleAddChange={handleAddChange}
          handleAdd={handleAdd}
        />) : null}
    </div> : null}
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
            captureEdit={captureEdit}
            changeEditState={changeEditState}
            handleDelete={handleDelete}
            type={type}
          />)}
      </tbody>
    </table>
  </div>
  )
}
