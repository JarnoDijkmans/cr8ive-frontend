import React, { useState } from 'react';
import Select from 'react-select';

function HashtagsInput({ name, value, handleInputChange }) {
  const allHashtags = [
    { value: 1, label: 'Sculpting' },
    { value: 2, label: 'Sketching' },
    { value: 3, label: 'Painting' }
  ];

  const [selectedHashtags, setSelectedHashtags] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedHashtags(selectedOptions);

    const selectedValues = selectedOptions.map((hashtag) => hashtag.value);
    handleInputChange(name, selectedValues);
  };

  return (
    <div>
      <label htmlFor="hashtagIds">Hashtags:</label>
      <Select
        id="hashtagIds"
        name="hashtagIds"
        value={selectedHashtags}
        onChange={handleChange}
        options={allHashtags}
        isMulti
      />
    </div>
  );
}

export default HashtagsInput;