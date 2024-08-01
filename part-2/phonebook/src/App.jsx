import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then((response) => {
          console.log('Request sent', response);
          setPersons(persons.concat(nameObject));
        });
    }
    setNewName('');
    setNewNum('');
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
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm
        addName={addName}
        newName={newName}
        newNum={newNum}
        handleNumChange={handleNumChange}
        handleOnChange={handleOnChange}
      />
      <h2>Numbers</h2>
      <Person personToShow={personToShow} />
    </div>
  );
};

export default App;
