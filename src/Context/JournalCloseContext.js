import React, { createContext, useState, useContext } from 'react';

const JournalCloseContext = createContext();

export function useCloseJournals() {
    return useContext(JournalCloseContext);
}

export const JournalCloseContextProvider = ({ children }) => {
    let [clos ,setClose]=useState(false)

    return (
        <JournalCloseContext.Provider value={{ clos, setClose }}>
            {children}
        </JournalCloseContext.Provider>
    );
};
