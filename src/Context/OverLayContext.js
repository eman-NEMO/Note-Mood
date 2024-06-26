// Create a file called MyProvider.js
import React, { useState } from 'react';
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState("Initial State");

    const updateState = newState => {
        setSharedState(newState);
    };

    return (
        <MyContext.Provider value={{ sharedState, updateState }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;
