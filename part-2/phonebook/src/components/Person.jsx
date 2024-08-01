const Person = ({ personToShow, deleteName }) => {
  return (
    <>
      <ul>
        {personToShow.map((person) => (
          <div>
            <li key={person.id}>
              {person.name} {person.number}
            </li>
            <button
              onClick={() => {
                deleteName(person.name, person.id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </ul>
    </>
  );
};

export default Person;
