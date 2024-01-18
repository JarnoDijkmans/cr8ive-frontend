import React, { useState } from 'react';
import Select from 'react-select';

function HashtagsInput({ name, value, handleInputChange }) {
  const allHashtags = [
    { value: 1, label: 'Photography' },
    { value: 2, label: 'Painting' },
    { value: 3, label: 'Writing' },
    { value: 4, label: 'Graphic Design/Illustration' },
    { value: 5, label: 'Graffiti' },
    { value: 6, label: 'Sculpting' },
    { value: 7, label: '3D Modeling' }
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