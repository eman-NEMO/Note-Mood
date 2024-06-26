import React, { createContext, useState, useContext } from 'react';

const JournalContext = createContext();

export function useJournals() {
    return useContext(JournalContext);
}

export const JournalProvider = ({ children }) => {
    const [journals, setJournals] = useState([]);
    const [zIndex, setZIndex] = useState(false);

    return (
        <JournalContext.Provider value={{ journals, setJournals,zIndex,setZIndex }}>
            {children}
        </JournalContext.Provider>
    );
};
