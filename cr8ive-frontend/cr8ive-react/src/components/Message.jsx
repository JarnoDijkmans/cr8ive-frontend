import React from 'react';

const Message = ({ isSuccess, message }) => {
  const getMessageStyle = () => {
    let style = {
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '10px',
      color: 'white',
      fontWeight: 'bold',
      width: 'fit-content',
    };

    if (isSuccess) {
      style.backgroundColor = 'green';
    } else {
      style.backgroundColor = 'red';
    }

    return style;
  };

  return (
    <div style={getMessageStyle()}>
      {message}
    </div>
  );
};

export default Message;