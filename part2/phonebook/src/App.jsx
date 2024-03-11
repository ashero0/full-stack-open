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

const SuccessMsg = ({ msg }) => {
  if (!msg) return;
  return (
    <div className="success">
      <p>{msg}</p>
    </div>
  );
};

const ErrorMsg = ({ msg }) => {
  if (!msg) return;
  return (
    <div className="error">
      <p>{msg}</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    phonebook.getAll().then((response) => setPersons(response));
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const isNameInPhonebook = (name) => persons.map((p) => p.name).includes(name);

  const displaySuccessMsg = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 5000);
  };
  const displayErrorMsg = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 5000);
  };

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
    phonebook
      .create(newContact)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        displaySuccessMsg(`Successfully added ${response.name} to phonebook`);
      })
      .catch((error) => {
        console.log(error);
        const message = error.response.data.error ?? error.message;
        displayErrorMsg(
          `An error occurred while trying to add ${newName} to phonebook: ${message}`
        );
      });
  };

  const updateContact = (name, newNumber) => {
    const existingContact = persons.find((person) => person.name === name);
    if (!existingContact)
      displayErrorMsg(`${name} does not exist in phonebook`);
    const { id } = existingContact;
    if (existingContact.number !== newNumber) {
      const newContact = { ...existingContact, number: newNumber };
      phonebook
        .update(id, newContact)
        .then((response) => {
          setPersons(
            persons.filter((person) => person.id !== id).concat(response)
          );
          setNewName("");
          setNewNumber("");
          displaySuccessMsg(`Successfully updated number for ${name}`);
        })
        .catch((error) => {
          console.log(error);
          const message = error.response.data.error ?? error.message;
          displayErrorMsg(
            `An error occurred while trying to add ${newName} to phonebook: ${message}`
          );
        });
    }
  };

  const deleteContact = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!personToDelete)
      displayErrorMsg(`Person with id ${id} does not exist in phonebook`);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebook
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          displaySuccessMsg(
            `Successfully deleted contact info for ${personToDelete.name}`
          );
        })
        .catch((error) => {
          displayErrorMsg(
            `An error occurred while trying to delete contact info for ${personToDelete.name}: ${error.message}`
          );
        });
    }
  };

  const personsToDisplay = search
    ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessMsg msg={successMsg} />
      <ErrorMsg msg={errorMsg} />
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
