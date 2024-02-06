// Checkbox.js

import React from "react";

const Checkbox = ({ id, name, checked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {name}
    </label>
  );
};

export default Checkbox;
