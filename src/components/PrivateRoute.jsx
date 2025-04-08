import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
	PrivateRoute.propTypes = {
		children: PropTypes.node.isRequired,
	};

	const { currentUser, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
