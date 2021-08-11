import React from 'react';

const Persons = (props) => {
    return ( 
        <>
        {props.filternames.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
        </>
     );
}
 
export default Persons;