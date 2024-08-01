import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import dataService from './server/data';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('effect');
    dataService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    const nameObject = {
      name: newName,
      number: newNum,
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        dataService
          .update(existingPerson.id, nameObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
          })
          .catch((error) => {
            console.error('Error updating person:', error);
          });
      }
    } else {
      dataService
        .create(nameObject)
        .then((response) => {
          setPersons([...persons, response.data]);
          setMessage(newName);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error('Error adding person:', error);
        });
    }
    setNewName('');
    setNewNum('');
  };

  const deleteName = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      dataService
        .Delete(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    }
  };

  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const regex = new RegExp(`${filter}`, 'i');
  const filteredPersons = persons.filter((person) => regex.test(person.name));

  const personToShow = showFilter ? filteredPersons : persons;

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (!value) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message ? <Notification message={message} /> : null}
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm
        addName={addName}
        newName={newName}
        newNum={newNum}
        handleNumChange={handleNumChange}
        handleOnChange={handleOnChange}
      />
      <h2>Numbers</h2>
      <Person personToShow={personToShow} deleteName={deleteName} />
    </div>
  );
};

export default App;
