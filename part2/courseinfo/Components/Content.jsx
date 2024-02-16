import React from 'react'
import Part from "./Part";
const Content = ({ parts }) => {
    return (
      <div>
          {parts.map(({ name, exercises }, index) => (
          <Part name={name} exercises={exercises} key={`part-${index}`} />
        ))}
      </div>
    )
  }
  
  export default Content
  