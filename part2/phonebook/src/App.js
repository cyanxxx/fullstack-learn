import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Filter = ({filterName, handleChange, setFilterName}) => {
    return (<div>
        filter shown with <input value={filterName} onChange={handleChange(setFilterName)} />
    </div>)
}
const PersonForm  = ({persons, setPersons, handleChange}) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!checkSameName(newName)){
      setPersons([...persons, {name: newName, number: newNum, id: persons.length + 1}])
      setNewName("")
      setNewNum("")
    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }
  const checkSameName = (val) => {
    return persons.some(p => p.name === val)
  }
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange(setNewName)} />
        </div>
        <div>number: <input value={newNum} onChange={handleChange(setNewNum)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      const persons = response.data
      setPersons(persons)
    })
  }, [])
 
  const [filterName, setFilterName] = useState('')
  
  const handleChange = (action) => (e) => {
    const value = e.target.value
    action(value)
  }
  const filterList = (persons) => {
    return persons.filter(p => p.name.indexOf(filterName) > -1)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleChange={handleChange} setFilterName={setFilterName}></Filter>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} handleChange={handleChange}></PersonForm>
      <h3>Numbers</h3>
      {filterList(persons).map(p => <div key={p.name}>{p.name} {p.number}</div>)}
    </div>
  )
}

export default App
