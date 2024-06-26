import React, { createContext, useState, useContext } from 'react';

const JournalCloseUpdate = createContext();

export function useCloseJournalsUpdate() {
    return useContext(JournalCloseUpdate);
}

export const JournalCloseUpdateProvider = ({ children }) => {
    let [closUpdate ,setCloseUpdate]=useState(false)

    return (
        <JournalCloseUpdate.Provider value={{ closUpdate, setCloseUpdate }}>
            {children}
        </JournalCloseUpdate.Provider>
    );
};
