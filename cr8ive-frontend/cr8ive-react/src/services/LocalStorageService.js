function get() {
  return localStorage.getItem('accessToken');
}

function remove() {
  localStorage.removeItem('accessToken');
}

export default { get, remove };