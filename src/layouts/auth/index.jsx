import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'src/redux/features/auth/authSlice';

function AuthLayout({ children }) {
  const { currentUser } = useAuthState();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
