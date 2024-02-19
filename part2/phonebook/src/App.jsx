import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Personform from "../components/Personform";
import Persons from "../components/Persons";
import axios from "axios";
import Notification from "../components/Notification";

const App = () => {
  let baseUrl = "http://localhost:3001/persons";

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("Some error happend.....");
  const getAll = () => {
    axios
      .get(baseUrl)
      .then((response) => setPersons(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAll();
  }, [])



  const addPerson = (e) => {
    e.preventDefault();
  const personToAdd = {
      name: newName.name.trim(),
      number: newName.number.trim(),
    };
    const person = persons.find((person)=> person.name === newName.name);
    console.log('NewName',newName)
    const personObject = { ...newName, number: newName.number };
  
    axios.post("http://localhost:3001/persons", personToAdd).then((response) => {
      setPersons(persons.concat(response.data));
    });
  };


  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((res) => res)
      .catch((error) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
  };



  return (
    <div>
      <Filter filter={filter} handleFilter={setFilter} />
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Personform
        newName={newName}
        nameChange={setNewName}
        numberChange={setNewName}
        addPhone={addPerson}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

