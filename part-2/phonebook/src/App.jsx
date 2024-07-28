import { useState } from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const addName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNum,
    };

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
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
