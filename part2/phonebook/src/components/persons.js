import React from 'react';

const Persons = ({persons,deleteperson}) => {
    return ( 
        <>
        {persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            <button onClick={()=>deleteperson(person.id)}>delete</button>
            </li>
          ))}
        </>
     );
}
 
export default Persons;