import React from 'react';

const PersonForm = ({obj}) => (
    <form onSubmit={obj.addPerson}>
        <div>name: <input value={obj.newName} onChange={obj.handleNameChange} /></div>
        <div>number: <input value={obj.newNumber} onChange={obj.handleNumChange} /></div>
        <div><button type="submit">add</button></div>
    </form>
)

export default PersonForm