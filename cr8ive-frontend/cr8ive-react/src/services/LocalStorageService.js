import { isExpired, decodeToken, useJwt } from 'react-jwt';


function AccessTokenisExpired(){
  if (isExpired(get())) {
    remove();
    window.location.href = '/';
    return Promise.reject(error);
    }
}

function DecodeAccessTokenReturnUserId() {
  const token = get();
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;
  return userId;
}

function DecodeAccessTokenReturnFistName() {
  const token = get();
  const decodedToken = decodeToken(token);
  const firstName = decodedToken.sub;
  return firstName;
}

function get() {
  return localStorage.getItem('accessToken');
}

function remove() {
  localStorage.removeItem('accessToken');
}

export default { get, remove, AccessTokenisExpired, DecodeAccessTokenReturnUserId, DecodeAccessTokenReturnFistName };