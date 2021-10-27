import React from "react";

const GroupFields = ({ memberFields, setMemberFields }) => {
  return (
    <div>
      <label htmlFor="numTeam">Number of Teammates:</label>
      <input
        type="text"
        id="numTeam"
        required
        value={memberFields.numTeam}
        onChange={(e) => {
          setMemberFields({ ...memberFields, numTeam: e.target.value });
        }}
      />
    </div>
  );
};

export default GroupFields;
