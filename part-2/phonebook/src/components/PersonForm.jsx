const PersonForm = ({
  addName,
  newName,
  newNum,
  handleNumChange,
  handleOnChange,
}) => {
  return (
    <>
      <form onSubmit={addName}>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
          <div>
            number: <input value={newNum} onChange={handleNumChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
