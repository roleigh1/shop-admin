import React from "react"
import { Navigate }  from "react-router-dom"; 
import PropTypes from "prop-types";

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest}) => {
    return isAuthenticated  ? <Component {...rest} /> : <Navigate to="/" />; 

}
PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

}; 

export default PrivateRoute; 
