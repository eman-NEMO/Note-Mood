import React, { createContext, useState, useContext } from 'react';

const IdContext = createContext();

export function useIdJournal() {
    return useContext(IdContext);
}

export const IdContextProvider = ({ children }) => {
    let [id ,setId]=useState(null)
    let  [specJournal, setSpecJournal] = useState(null);

    return (
        <IdContext.Provider value={{ id, setId,specJournal,setSpecJournal }}>
            {children}
        </IdContext.Provider>
    );
};
