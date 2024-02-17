import { useState } from "react";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "122-333-00" },
  ]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState('')

  const addphoneBook = (e) => {
    e.preventDefault();
    let trimedNewName = newName.name.trim();
    let trimedNewNumber = newName.number.trim();

    let person = {
      name: trimedNewName,
      number: trimedNewNumber,
    };

    const newNameLowerCase = trimedNewName.toLowerCase();
    if (
      typeof trimedNewName !== "string" ||
      trimedNewName.length == 0 ||
      trimedNewNumber.length == 0
    ) {
      alert("Invalid Name or number");
      return;
    }
    persons.forEach((person) => {
      const personNameLowerCase = person.name.toLowerCase();
      if (personNameLowerCase.includes(newNameLowerCase.toLowerCase())) {
        alert(`${trimedNewName} is already added to the console`);
        return;
      }
    });

    setPersons(persons.concat(person));
    setNewName({ name: "", number: "" });
  };
  
  const trimFilter = filter.toLowerCase().trim()
  const filteredPersons = persons.filter((person)=> person.name.toLowerCase().includes(trimFilter))

  return (
    <div>
      <h2>Phonebook</h2>
     filter shown data <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
      <form onSubmit={addphoneBook}>
        <h1>add a new</h1>
        <div>
          name:{" "}
          <input
            value={newName.name}
            onChange={(e) => setNewName({ ...newName, name: e.target.value })}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newName.number}
            onChange={(e) => setNewName({ ...newName, number: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person, index) => (
          <div key={`person${index}`}>{person.name} {person.number}</div>
        ))}
      </div>
    </div>
  );
};

export default App;



