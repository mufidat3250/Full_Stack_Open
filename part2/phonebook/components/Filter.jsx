import React from 'react'

const Filter = ({filter, handleFilter}) => {
    return (
        <div>
     Filter Shown With <input type="text" value={filter} onChange={(e) => handleFilter(e.target.value)}/>
            
        </div>
    )
}

export default Filter
