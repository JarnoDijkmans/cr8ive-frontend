import React from 'react';

const Message = ({ isSuccess, message }) => {
  const getMessageStyle = () => {
    let style = {
      padding: '10px',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      marginRight: 'auto',
      marginLeft: 'auto'
    };

    if (isSuccess) {
      style.color = 'green';
    } else {
      style.color = 'red';
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