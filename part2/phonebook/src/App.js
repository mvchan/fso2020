import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import directoryService from './services/BackendService'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filterName, setFilterName ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ normalMessage, setNormalMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ refreshHook, setRefreshHook ] = useState(0);

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
        id: persons[persons.length-1].id + 1,
    }

    if (newName.trim().length && newNumber.trim().length) {
      if (persons.map(person => person.name.toLowerCase()).indexOf(newName.toLowerCase()) < 0) {
        directoryService
          .create(personObject)
          .then(addedPerson => {
            console.log('new person added: ',addedPerson)
            setNormalMessage(`Added ${addedPerson.name}`)       
            setTimeout(() => {setNormalMessage(null)}, 5000)
            setPersons(persons.concat(addedPerson))      
            setNewName('')
            setNewNumber('')})
          .catch(error => {
            console.log('add error result: ',error)
            setErrorMessage(`${newName} already exists in the server. Local data has been refreshed.`)       
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setRefreshHook(refreshHook+1)
        })
      }
      
      else {
        if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
          directoryService
            .update(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id,personObject)
            .then(updatedPerson => {
              console.log('update result: ',updatedPerson)
              setPersons(persons.filter(person => person.name !== newName).concat(updatedPerson))      
              setNewName('')
              setNewNumber('')
          })
        }
      }  
    }
  }

  const deletePerson = ({name,id}) => {
    if (window.confirm(`Delete ${name}?`)) {
      directoryService
        .remove(id)
        .then(result =>{
          console.log('delete result: ',result)
          setPersons(persons.filter(person => person.id !== id))})          
        .catch(error => {
          console.log('delete error caught: ',error)
          setErrorMessage(`Information of ${name} has already been removed from server.`)       
          setTimeout(() => {setErrorMessage(null)}, 5000)
          setPersons(persons.filter(person => person.id !== id))    
      })
    }
  }

  const personsHook = () => {
    console.log('effect for fetching persons called')
    directoryService
      .getAll()
      .then(fetchedPersons => {
        console.log('promise fulfilled')
        setPersons(fetchedPersons)
      })
  }

  useEffect(personsHook, [refreshHook])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={normalMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />
      <Filter filterName={filterName} setFilterName={setFilterName}/>
      <h3>Add a new</h3>
      <PersonForm obj={{addPerson,
                        newName,
                        newNumber,
                        handleNameChange,
                        handleNumChange}}/>
      <h3>Numbers</h3>
      <Persons obj={{persons,
                     filterName,
                     deletePerson}} />
    </div>
    
  )
}

export default App