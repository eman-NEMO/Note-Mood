import React, { createContext, useState, useContext } from 'react';

const JournalIdContext = createContext();

export function useIdJournal() {
    return useContext(JournalIdContext);
}

export const JournalIdContextProvider = ({ children }) => {
    let [id ,setId]=useState(null)

    return (
        <JournalIdContext.Provider value={{ id, setId }}>
            {children}
        </JournalIdContext.Provider>
    );
};
