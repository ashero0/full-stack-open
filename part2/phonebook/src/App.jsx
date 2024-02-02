import { useState } from 'react'

const Search = ({search, handleSearchChange}) => {
  return (
    <form>
      search: <input value={search} onChange={handleSearchChange} />
    </form>
  )
}

const NewContact = (props) => {
  const {onSubmit, name, number, handleNameChange, handleNumberChange} = props
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.name}>{person.name}: {person.number}</li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if (isInPhonebook(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const isInPhonebook = (name) => persons.map(p => p.name).includes(name)

  const personsToDisplay = search ? persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearchChange={handleSearchChange} />

      <h2>New Contact</h2>
      <NewContact onSubmit={addPerson} name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} />
    </div>
  )
}

export default App