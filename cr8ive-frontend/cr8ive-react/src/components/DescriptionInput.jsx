import React from 'react';

function DescriptionInput({ name, value, handleInputChange }) {
    return (
      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          name="description"
          value={value}
          onChange={(e) => handleInputChange(name, e.target.value)}
          required
        />
      </div>
    );
  }

  export default DescriptionInput;