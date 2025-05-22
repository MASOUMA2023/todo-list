
import React, {useState, useEffect} from "react";
import styled from 'styled-components'


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding:0.5rem
    `
    const StyledButton = styled.button`
    padding: 0.5rem 1rem;
    cursor: pointer;
    `
    const StyledInput = styled.input`
    padding: 0.5rem;
    font-size: 1rem;
    `
    const StyledDiv = styled.div`
    display:flex;
    gap:0.5rem;
    align-item:center;
    flex-wrap: wrap;
    `
    const StyledSelect = styled.select`
    padding: 0.5rem
    font=size: 1rem
    `

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
        <StyledForm onSubmit={(e)=>e.preventDefault()}>

           <StyledDiv>
              <label htmlFor="search" >Search Todos</label>

              <StyledInput id="search" type="text" value={localQueryString} onChange={(e)=> setLocalQueryString(e.target.value)}
               className="input-clear"
              />
              <StyledButton type="button" onClick={()=>setLocalQueryString("")} className="button-clear">Clear</StyledButton>

           </StyledDiv>

            <StyledDiv className="sorting-container">
           <label htmlFor="sortField">Sorted By: </label>

           <StyledSelect id="sortField" value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="created Time">Time added</option>
            <option value="title">Title</option>

           </StyledSelect>

           <label htmlFor="sortDirection" className="sort-direction"> Direction:{""} </label>
        <StyledSelect id="sortDirection" value={sortDirection} onChange={handleSortDirectionChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
            </StyledDiv>
        </StyledForm>
    )
}

export default TodosViewForm;