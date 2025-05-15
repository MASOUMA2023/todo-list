import React from "react";


function TodosViewForm ({sortField, setSortField, sortDirection, setSortDirection, queryString,setQueryString}) {
    const preventRefresh = (e)=>{
        e.preventDefault();
    }
    const handleSortFieldChange = (e)=>{
        setSortField(e.target.value)
    }
    const handleSortDirectionChange =(e)=>{
        setSortDirection(e.target.value)
    }

    return (
        <form onSubmit={(e)=>e.preventDefault()}>

           <div>
              <label htmlFor="search" >Search Todos</label>
              <input id="search" type="text" value={queryString} onChange={(e)=> setQueryString(e.target.value)}
               style={{marginLeft:"0.5rem"}}
              />
              <button type="button" onClick={()=>setQueryString("")} style= {{marginLeft: "0.5rem"}}>Clear</button>
           </div>

            <div style={{marginTop: "1rem"}}>
           <label htmlFor="sortField">Sorted By: </label>
           <select id="sortField" value={sortField} onChange={handleSortFieldChange}>
            <option value="title">Title</option>
            <option value="createdTime">Time added</option>
           </select>

           <label htmlFor="sortDirection" style={{ marginLeft: "1rem" }}> Direction:{""} </label>
        <select id="sortDirection" value={sortDirection} onChange={handleSortDirectionChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
            </div>
        </form>
    )
}

export default TodosViewForm;