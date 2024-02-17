import React from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      <div>
        {persons.map((person, index) => (
          <div key={index}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
