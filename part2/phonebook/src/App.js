import React, { useEffect, useState } from 'react'
import personsService from './services/persons'

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const Filter = ({filterName, handleChange, setFilterName}) => {
    return (<div>
        filter shown with <input value={filterName} onChange={handleChange(setFilterName)} />
    </div>)
}
const Person = ({person, handleDelete}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDelete(person)}>delete</button>
    </div>
  )
}
const PersonForm  = ({persons, setPersons, handleChange, setSuccessMsg, setErrMsg}) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault()
    const samePerson = findSameName(newName)
    const newPerson = {name: newName, number: newNum}
    if(!samePerson){
      personsService.create(newPerson).then(response => {
        const newData = response.data
        setPersons([...persons, newData])
        setNewName("")
        setNewNum("")
        setSuccessMsg(`Added ${newName}`)
        setTimeout(() => setSuccessMsg(""), 5000)
      })
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a name one`)){
        personsService.update(samePerson.id, newPerson).then(response => {
          const updatePerson = response.data
          setPersons(persons.map(person => person.id !== updatePerson.id? person : updatePerson))
        }).catch(error => {
          setErrMsg(`Information of ${newName} has already been removed from server`)
          setTimeout(() => setErrMsg(""), 5000)
          setPersons(persons.filter(person => person.id !== samePerson.id))
        }).finally(() => {
          setNewName("")
          setNewNum("")
        })
      }
    }
  }
  const findSameName = (val) => {
    return persons.find(p => p.name === val)
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
  const [successMsg, setSuccessMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    personsService.getAll()
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
  const handleDelete = (person) => () => {
    if(window.confirm(`Delete ${person.name}?`)){
      personsService.deletePerson(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMsg} type="success"></Notification>
      <Notification message={errMsg} type="error"></Notification>
      <Filter filterName={filterName} handleChange={handleChange} setFilterName={setFilterName}></Filter>
      <h3>add a new</h3>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        handleChange={handleChange} 
        setErrMsg={setErrMsg} 
        setSuccessMsg={setSuccessMsg}
      />
      <h3>Numbers</h3>
      {filterList(persons).map(p => <Person key={p.name} person={p} handleDelete={handleDelete} />)}
    </div>
  )
}

export default App
