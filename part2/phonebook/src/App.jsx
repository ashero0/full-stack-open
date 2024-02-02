import { useState, useEffect } from "react";
import phonebook from "./services/phonebook";

const Search = ({ search, handleSearchChange }) => {
  return (
    <form>
      search: <input value={search} onChange={handleSearchChange} />
    </form>
  );
};

const NewContact = (props) => {
  const { onSubmit, name, number, handleNameChange, handleNumberChange } =
    props;
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
  );
};

const Persons = ({ persons, onClickDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => onClickDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    phonebook.getAll().then((response) => setPersons(response));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const isNameInPhonebook = (name) => persons.map((p) => p.name).includes(name);

  const createContact = (event) => {
    event.preventDefault();

    if (isNameInPhonebook(newName)) {
      const message = `${newName} is already in your phonebook. Replace their old number with the new one?`;
      if (confirm(message)) {
        updateContact(newName, newNumber);
      }
      return;
    }

    const newContact = {
      name: newName,
      number: newNumber,
    };
    phonebook.create(newContact).then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
    });
  };

  const updateContact = (name, newNumber) => {
    const existingContact = persons.find((person) => person.name === name);
    const { id } = existingContact;
    if (existingContact.number !== newNumber) {
      const newContact = { ...existingContact, number: newNumber };
      phonebook.update(id, newContact).then((response) => {
        setPersons(
          persons.filter((person) => person.id !== id).concat(response)
        );
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteContact = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebook.deleteContact(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personsToDisplay = search
    ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} handleSearchChange={handleSearchChange} />

      <h2>New Contact</h2>
      <NewContact
        onSubmit={createContact}
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} onClickDelete={deleteContact} />
    </div>
  );
};

export default App;
