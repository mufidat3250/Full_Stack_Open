import React from "react";

const Persons = ({ persons, handleDelete}) => {
  return (
    <div>
      <div>
        {persons.map((person, index) => {
         
         return <div key={index}>
          {person.name} {person.number}
          <button style={{outline:'none', border:'none', backgroundColor:'lightgray', padding:'0.3rem', borderRadius:'4px', marginTop:'4px'}} onClick={()=>handleDelete(person.id)}>Delete</button>
        </div>
        })}
      </div>
    </div>
  );
};

export default Persons;
