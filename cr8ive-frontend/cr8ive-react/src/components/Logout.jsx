import React from 'react';


function Logout() {
  function handleLogoutClick(event) {
    event.preventDefault();
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  }

  return (
    <button className="logout-button" onClick={handleLogoutClick}>
      Logout
    </button>
  );
}

export default Logout;