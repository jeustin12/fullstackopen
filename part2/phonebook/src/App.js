import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/form";
import Persons from "./components/persons";
import "./index.css";
import Notification from "./components/notification";
import { create, DeletePerson, getAll, update } from "./services/phoneservice";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [Filtername, setFiltername] = useState("");
  const [notification, setnotification] = useState(null);
  useEffect(() => {
    getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlefilterChange = (event) => {
    let value = event.target.value;
    setFiltername(value.toLowerCase());
  };
  const Notificate = (message, type = "success") => {
    setnotification({ message, type });
    setTimeout(() => {
      setnotification(null);
    }, 5000);
  };
  const addName = (event) => {
    event.preventDefault();
    const exist = persons.find(
      (element) => element.name.toLowerCase() === newName.toLowerCase()
    );
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (exist) {
      const ok = window.confirm(
        `The name ${newName} is alredy registered want to update?`
      );
      if (ok) {
        update(exist.id, nameObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== exist.id ? person : updatedPerson.data
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            Notificate(`${exist.name} has already been eliminated`, "error");
          });
      }
    } else {
      create(nameObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          Notificate(`${newName} created`, "success");
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          Notificate(`${error.response.data.error}`, "error");
        });
    }
    setNewName("");
    setNewNumber("");
  };
  const deletePerson = (id) => {
    let person = persons.find((element) => element.id === id);
    let ok = window.confirm(`Delete ${person.name}?`);
    if (ok) {
      DeletePerson(person.id)
        .then((response) => {
          // console.log(response)
          setPersons(persons.filter((person) => person.id !== id));
          Notificate(`${person.name} eliminated`);
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== id));
          Notificate(`${person.name} has already been eliminated`, "error");
        });
    }
  };

  const filternames =
    Filtername.length === 0
      ? persons
      : persons.filter(
          (p) => p.name.toLowerCase().indexOf(Filtername.toLowerCase()) > -1
        );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      filter shown wiht a :
      <Filter value={Filtername} onChange={handlefilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={filternames} deleteperson={deletePerson} />
      </ul>
    </div>
  );
};

export default App;
