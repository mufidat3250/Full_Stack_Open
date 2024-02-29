import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Personform from "../components/Personform";
import Persons from "../components/Persons";
import Notification from "../components/Notification";
import perseronSevices from "../src/services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const getAll = () => {
    perseronSevices
      .getAll()
      .then(
        (data) => {
          data.length > 0 && data !== "undefined" && setPersons(data)
        });
  };
  useEffect(() => {
    getAll();
    setErrorMessage(null)
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const targetPerson = persons.filter(
      (person) => person.name === newName.name
    );
    const personObject = { ...newName, number: newName.number };
    const personToAdd = {
      name: newName.name.trim(),
      number: newName.number.trim(),
    };
    if (targetPerson.length > 0) {
      if (
        window.confirm(
          `${targetPerson[0].name} is already added to phonebook replace the old number with a new one`
        )
      ) {
        perseronSevices
          .update(targetPerson[0].id, personObject)
          .then((updatedPerson) => {
            console.log(`${updatedPerson.name} successfully updated`)
            setPersons(
              persons.map((person) =>
                person.id !== targetPerson[0].id ? person : updatedPerson
              )
            );
            setErrorMessage(`${targetPerson[0].name} is Updated successfully`);
            setNewName({ name: "", number: "" });

            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          })
          .catch((err) => {
            console.log(err.message);
            alert(
              `${targetPerson[0].name} has already being deleted from the back end`
            );
            setPersons(
              persons.filter((person) => person.id !== targetPerson[0].id)
            );
          });
      }
    } else {
      perseronSevices
        .create(personToAdd)
        .then((newPerson) => {
          console.log({newPerson})
          setPersons([...persons, newPerson])
          setNewName({ name: "", number: "" });
          setErrorMessage(`Added ${personToAdd.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          alert(
            `${targetPerson.name} has already being deleted from the server`
          );
          console.log(error);
        });
    }
  };


  const filteredPerson = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleDelete = (id) => {
    console.log({ id });
    const person = persons.filter((person) => person.id === id);
    const personId = person[0].id;
    const name = person[0].name;
    console.log({ personId, name });
    perseronSevices
      .deletePerson(id)
      .then((res) => {
        res;
        console.log({ res });
        setPersons(persons.filter((person)=> person.id !== id))
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          `[ERROR] Information of ${name} has being removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setPersons(persons.filter((person) => person.id !== id));
      });
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
