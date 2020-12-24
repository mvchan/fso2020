import React from 'react';
import Person from './Person'

const Persons = ({obj}) => {

    const deletePerson = obj.deletePerson
    return (
        <>
        {obj.persons.filter(person => person.name.toLowerCase().includes(obj.filterName.toLowerCase()))
            .map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
        </>
    )
}

export default Persons