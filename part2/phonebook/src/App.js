import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ filterName, setFilterName ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    //console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumChange = (event) => {
    //console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
    }

    if (newName.trim().length && newNumber.trim().length) {
      if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) < 0) {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
      else
        window.alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName}/>
      <h3>Add a new</h3>
      <PersonForm obj={{addPerson,
                        newName,
                        newNumber,
                        handleNameChange,
                        handleNumChange}}/>
      <h3>Numbers</h3>
      <Persons obj={{persons,
                     filterName}} />
    </div>
    
  )
}

export default App