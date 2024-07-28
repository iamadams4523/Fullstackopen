const Person = ({ personToShow }) => {
  return (
    <>
      <ul>
        {personToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Person;
