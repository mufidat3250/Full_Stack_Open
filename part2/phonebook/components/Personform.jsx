import React from "react";

const Personform = ({newName, nameChange, numberChange, addPhone}) => {
  return (
    <div>
      <form onSubmit={addPhone}>
        <div>
          name:{" "}
          <input
            value={newName.name}
            onChange={(e) => nameChange({ ...newName, name: e.target.value })}
          />
          {/* <input
            value={newNote}
            onChange={(e) => nameChange(e.target.value)}
          /> */}
        </div>

        <div>
          number:{" "}
          <input
            value={newName.number}
            onChange={(e) => numberChange({ ...newName, number: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Personform;
