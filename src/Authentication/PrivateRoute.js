import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = useAuth();
    const { navigate } = useNavigation();
    console.log(user.email);
    if (loading) {
        return <ActivityIndicator size="large" />
    }
    if (user.email) {
        return children;
    }
    navigate('Signin')
};

export default PrivateRoute;