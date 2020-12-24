import React from 'react';

const Person = ({person,deletePerson}) => (

    //button onClick must be a function since it is callback, otherwise it will execute on render
    <p>
        {person.name}: {person.number} <button onClick={() => deletePerson(person)}>delete</button>
    </p>
)

export default Person