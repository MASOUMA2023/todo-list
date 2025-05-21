
import React, {useState, useEffect} from "react";


function TodosViewForm ({sortField, setSortField, sortDirection, setSortDirection, queryString,setQueryString}) {
    const [localQueryString, setLocalQueryString] = useState(queryString);

    useEffect(()=>{
        const debounce = setTimeout(()=>{
            setQueryString(localQueryString)
        }, 500)

        return ()=>{
            clearTimeout(debounce)
        }
    }, [localQueryString, setQueryString])

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

              <input id="search" type="text" value={localQueryString} onChange={(e)=> setLocalQueryString(e.target.value)}
               style={{marginLeft:"0.5rem"}}
              />
              <button type="button" onClick={()=>setLocalQueryString("")} style= {{marginLeft: "0.5rem"}}>Clear</button>

           </div>

            <div style={{marginTop: "1rem"}}>
           <label htmlFor="sortField">Sorted By: </label>

           <select id="sortField" value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="created Time">Time added</option>
            <option value="title">Title</option>

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