import React from 'react';


//authenticated user still needs to be passed down from the App component to interested parties. 
//the authenticated user has to be passed through all components until it reaches all the leaf components
const AuthUserContext = React.createContext(null);
export default AuthUserContext;