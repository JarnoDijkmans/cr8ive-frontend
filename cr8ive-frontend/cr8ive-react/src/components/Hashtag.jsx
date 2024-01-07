import React from 'react';

const hashtagIdToName = {
  1: "Photography",
  2: "Painting",
  3: "Writing",
  4: "Graphic Design/Illustration",
  5: "Graffiti",
  6: "Sculpting",
  7: "3D modeling", 
};

const Hashtag = ({ hashtagIds }) => {
  return (
    <div className="hashtags">
      {hashtagIds.map((hashtagId, index) => (
        <span key={index}>#{hashtagIdToName[hashtagId]} </span>
      ))}
    </div>
  );
};

export default Hashtag;