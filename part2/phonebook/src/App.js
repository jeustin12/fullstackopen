import React, { useState,useEffect} from "react";
import Filter from "./components/filter";
import PersonForm from "./components/form";
import Persons from "./components/persons";
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [Filtername, setFiltername] = useState("");
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {setPersons(response.data)})
  }, [])
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlefilterChange = (event) => {
    let value =event.target.value
    setFiltername(value.toLowerCase())
  };

  const addName = (event) => {
    event.preventDefault();
    if (persons.find((element) => element.name === newName)) {
      return alert(`The name ${newName} is alredy registeres`);
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };
  const filternames =
    Filtername.length === 0 ? 
      persons
    : persons.filter(p => p.name.toLowerCase().indexOf(Filtername.toLowerCase()) > -1 )    
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown wiht a :
      <Filter
        value={Filtername}
        onChange={handlefilterChange}
      />
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
        <Persons
        filternames={filternames}
        />
      </ul>
    </div>
  );
};

export default App;
