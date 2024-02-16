import React from 'react'

const Total = ({parts}) => {
    
    let totalExercise = parts.reduce((acc, cur) => acc + cur.exercises, 0);
    return <p style={{ fontWeight: "bold" }}>total: {totalExercise} exercise</p>;
}

export default Total


