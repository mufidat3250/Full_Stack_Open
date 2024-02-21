import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Personform from "../components/Personform";
import Persons from "../components/Persons";
import axios from "axios";
import Notification from "../components/Notification";
import perseronSevices from "../src/services";

const App = () => {
  let baseUrl = "http://localhost:3001/persons";

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const getAll = () => {
    perseronSevices.getAll().then((res) => setPersons(res.data));
  };

  useEffect(() => {
    getAll();
    }, []);


  const addPerson = (e) => {
    e.preventDefault();
    const targetPerson = persons.filter((person) => person.name === newName.name);
    const personObject = { ...newName, number: newName.number };
    const personToAdd = {
      name:newName.name.trim(),
      number:newName.number.trim()
    }
    if(targetPerson.length > 0){
      if (
        window.confirm(
          `${targetPerson[0].name} is already added to phonebook replace the old number with a new one`
        )
      ) {
        perseronSevices
          .update(targetPerson[0].id, personObject)
          .then((res) =>{
            console.log(`${res.data.name} successfully updated`)
            setPersons(persons.map((person)=> person.id !== targetPerson[0].id? person : res.data))
            setErrorMessage(`${targetPerson[0].name} is Updated successfully`)
            setNewName({name:'', number:''})

            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            
          })
          .catch((err) => {
            alert(`${targetPerson[0].name} has already being deleted from the back end`)
            setPersons(persons.filter((person)=> person.id !== targetPerson[0].id))
          });
      }
    }else {
        
      perseronSevices
      .create(personToAdd)
      .then((res)=> {
        setPersons(persons.concat(res.data))
        setNewName({name:'', number:''})
        setErrorMessage(`Added ${personToAdd.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        
      })
      .catch((error)=> {
        alert(`${targetPerson.name} has already being deleted from the server`)
        console.log(error)
      })
    }

  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    const deletedPerson = persons.filter((person)=> person.id === id)
    console.log(deletedPerson)
    const personId = deletedPerson[0].id
    const name = deletedPerson[0].name
    perseronSevices
      .delete_(`${baseUrl}/${personId}`)
      .then((res) => console.log({ res }))
      .catch((error) => {
        console.log(error);
        setErrorMessage(`[ERROR] Information of ${name} has being removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const returnNote = () => {
    if (notes.length > 0) {
      return notes.map((note, index) => (
        <Note
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          key={`note${index}`}
        />
      ));
    } else {
      return <p>...Loading</p>;
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={setFilter} />
      <h2>Phonebook</h2>
      <Personform
        newName={newName}
        nameChange={setNewName}
        numberChange={setNewName}
        addPhone={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};
