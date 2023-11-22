import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, value }) {
  return value ? children : <Navigate to="/" />;
}

export default PrivateRoute;