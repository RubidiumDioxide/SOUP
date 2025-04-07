import {React, useState} from 'react'

export default function Search({ onSearch }) {
    const [searchForm, setSearchForm] = useState({
        id : 0,
        name : "", 
        description : "", 
        creator : 0, 
        creatorName : "", 
        isComplete : false, 
        dateBegan : "", 
        dateFinished :"", 
        dateDeadline : "", 
        isPrivate : false    
      }); 

    function handleFormChange(e){
        setSearchForm({
          ...searchForm, 
          [e.target.name]: e.target.value
        })
      }    

    function handleSearchForm(e) {
        e.preventDefault();

        onSearch(searchForm);
    }

    return (
        <div>
            <form onSubmit={handleSearchForm}>
                <input class='small-rounded-input' type="text" name="name" placeholder="project name" value={searchForm.name} onChange={handleFormChange}/>
                <input class='small-rounded-input' type="text" name="description" placeholder="project description" value={searchForm.description} onChange={handleFormChange}/>
                <input class='small-rounded-input' type="text" name="creatorName" placeholder="projet creator name" value={searchForm.creatorName} onChange={handleFormChange}/>
                 
                <button class='small-rounded-button' type="submit">Search</button>
            </form>
        </div>
    )
} 
