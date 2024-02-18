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
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    // let newPerson = {
    //   name: newName.name.trim(),
    //   number: newName.number.trim(),
    // };
    // let person = persons.filter((person) => person.name === newName.name)[0];
    // console.log({person}, person.id)
    // if (person) {
    //   if (
    //     window.confirm(
    //       `${person.name} is already added to the phonebook, replace the old one with the new one?`
    //     )
    //   ) {
    //     let updatedPerson = {
    //       ...person,
    //       number: newName.number,
    //     };
    //     console.log({ updatedPerson });

    //     // axios.put(url, changedNote).then(response => {
    //     //   setNotes(notes.map(note => note.id !== id ? note : response.data))
    //     // })
    //     axios
    //       .put(`http://localhost:3001/persons/${person.id}`, updatedPerson)
    //       .then((res) =>
    //         setPersons(
    //           persons.map((p) => (p.id !== person.id ? person : res.data))
    //         )
    //       ).catch((error) => {
    //         console.log('fail', error.message)
    //         setPersons(persons.filter((person) => person.id !== updatedPerson.id))
    //       })
    //   }
    // }
    const newPerson = {
      name: newName.name.trim(),
      number: newName.number.trim(),
    };
    const personObject = { ...newName, number: newName.number };
    console.log(personObject);
    const person = persons.find((person) => person.name === newName.name);
    console.log({ person });
    const url = `http://localhost:3001/notes/${person.id}`;

    axios
      .put(url, personObject)
      .then((res) =>
        setPersons(
          persons.map((person) => (person.id !== id ? person : res.data))
        )
      ).catch((err)=> {
        console.log(err)
        setPersons(persons.filter((p)=> p.id !== person.id))
      })
    axios.post("http://localhost:3001/persons", newPerson).then((response) => {
      setPersons(persons.concat(response.data));
    });
  };

  // console.log(persons);
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

  // const addPhoneBook = (e) => {
  //   e.preventDefault();
  //   let newNameTrimmed = newName.name.trim();
  //   let newNumberTrimmed = newName.number.trim();
  //   let newNameToLowerCase = newNameTrimmed.toLowerCase();
  //   if (
  //     typeof newName.name !== "string" ||
  //     newName.name.length === 0 ||
  //     newName.number.length === 0
  //   ) {
  //     alert("name or number is not valid");
  //     return;
  //   }

  //   let person = persons.find((person)=> person.name === newName.name.trim())
  //   console.log({person})

  //   // let updatedPerson = persons.find((person)=> person.id === id)
  //   // console.log(updatedPerson)

  //  persons.forEach(({ name, _, id }) => {
  //     let url = `http://localhost:3001/persons/${id}`;
  //     let personLowerCase = name.toLowerCase();
  //     if (personLowerCase.includes(newNameToLowerCase)) {
  //       let findPerson = persons.find((person) => person.id === id);
  //       let changedPerson = { ...findPerson, number: person.number };
  //       axios
  //         .put(url, changedPerson)
  //         .then((res) =>
  //           setPersons(
  //             persons.map((person) => (person.id !== id ? person : res.data))
  //           )
  //         );
  //       alert(
  //         `${newNameToLowerCase} is already added to phonebook replace the old number with a new one`
  //       );
  //       return null;
  //     }

  //   });

  //   axios
  //   .post(baseUrl, person)
  //   .then((res) => {
  //     console.log('res.data',res.data)
  //     const {name} = res.data
  //     setPersons([...persons, res.data])
  //     setNotification(`Added ${name}`)
  //       setSuccess(true)
  //     setTimeout(() => {
  //       setNotification(null)
  //       setSuccess(false)
  //     }, 1000);
  //   });
  //   setPersons([...persons, person]);
  //   setNewName({ name: "", number: "" });
  // };
  // console.log(filteredPerson)

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

// import { useState } from "react";
// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: "Arto Hellas", number: "122-333-00" },
//   ]);
//   const [newName, setNewName] = useState({ name: "", number: "" });
//   const [filter, setFilter] = useState('')

//   const addphoneBook = (e) => {
//     e.preventDefault();
//     let trimedNewName = newName.name.trim();
//     let trimedNewNumber = newName.number.trim();

//     let person = {
//       name: trimedNewName,
//       number: trimedNewNumber,
//     };

//     const newNameLowerCase = trimedNewName.toLowerCase();
//     if (
//       typeof trimedNewName !== "string" ||
//       trimedNewName.length == 0 ||
//       trimedNewNumber.length == 0
//     ) {
//       alert("Invalid Name or number");
//       return;
//     }
//     persons.forEach((person) => {
//       const personNameLowerCase = person.name.toLowerCase();
//       if (personNameLowerCase.includes(newNameLowerCase.toLowerCase())) {
//         alert(`${trimedNewName} is already added to the console`);
//         return;
//       }
//     });

//     setPersons(persons.concat(person));
//     setNewName({ name: "", number: "" });
//   };

//   const trimFilter = filter.toLowerCase().trim()
//   const filteredPersons = persons.filter((person)=> person.name.toLowerCase().includes(trimFilter))

//   return (
//     <div>
//       <h2>Phonebook</h2>
//      filter shown data <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}/>
//       <form onSubmit={addphoneBook}>
//         <h1>add a new</h1>
//         <div>
//           name:{" "}
//           <input
//             value={newName.name}
//             onChange={(e) => setNewName({ ...newName, name: e.target.value })}
//           />
//         </div>
//         <div>
//           number:{" "}
//           <input
//             value={newName.number}
//             onChange={(e) => setNewName({ ...newName, number: e.target.value })}
//           />
//         </div>
//         <div>
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       <div>
//         {filteredPersons.map((person, index) => (
//           <div key={`person${index}`}>{person.name} {person.number}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
