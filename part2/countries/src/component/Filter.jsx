import React from 'react'

const Filter = ({filter, handleChange}) => {
    return (
        <div>
      Find contries:{" "}
      <input type="text" value={filter} onChange={handleChange} />
    </div>
    )
}

export default Filter
