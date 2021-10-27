import React from "react";

const GroupFields = ({ groupFields, setGroupFields }) => {
  return (
    <div>
      <label htmlFor="role">Role:</label>
      <input
        type="text"
        id="role"
        required
        value={groupFields.role}
        onChange={(e) => {
          setGroupFields({ ...groupFields, role: e.target.value });
        }}
      />
    </div>
  );
};

export default GroupFields;
